import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, IJWTPayload } from './auth.interfaces.js';

/**
 * 🛡️ CRYPTOGRAPHIC FIREWALL - CLUSTER OMEGA (L6)
 * Intercepts requests, decodes signatures, and handles Role-Based Access Control (RBAC).
 */

/**
 * GUARDIÁN A: VERIFICACIÓN DE AUTENTICIDAD (AUTHENTICATION)
 * Inspecciona la cabecera HTTP, valida la firma simétrica del JWT e inyecta la identidad.
 */
export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    // Control de formato: Validamos la existencia y el prefijo Bearer estándar de la industria
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'UNAUTHORIZED',
        origin: 'OMEGA_FIREWALL',
        message: 'Missing or malformed authorization token.'
      });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'ALPHA_CLUSTER_SECRET_KEY';

    // Desempaquetado y verificación de firma criptográfica
    const decoded = jwt.verify(token, secret) as IJWTPayload;
    
    // Inyección atómica de la identidad dentro del ciclo de vida de Express
    req.user = decoded;
    
    return next();
  } catch (error: any) {
    const gold = '\x1b[33m';
    const reset = '\x1b[0m';
    console.warn(`${gold}[Firewall Alert]:${reset} Intento de acceso denegado por token inválido o expirado.`);

    return res.status(401).json({
      status: 'UNAUTHORIZED',
      origin: 'OMEGA_FIREWALL',
      message: 'Session has expired or token signature is corrupt.'
    });
  }
};

/**
 * GUARDIÁN B: AUTORIZACIÓN JERÁRQUICA POR ROLES (AUTHORIZATION - RBAC)
 * Evalúa los niveles de clearance inyectados por el Guardián A antes de permitir mutaciones.
 */
export const restrictTo = (...allowedRoles: ('SUPER_ADMIN' | 'EMPLOYEE' | 'CLIENT')[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Salvaguarda estructural en caso de orden incorrecto de middlewares en la ruta
    if (!req.user) {
      return res.status(500).json({
        status: 'INTERNAL_SECURITY_ERROR',
        message: 'Security context was not initialized properly. Authentication required first.'
      });
    }

    // Validación de nivel de acceso (Clearance Level)
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'FORBIDDEN',
        origin: 'OMEGA_AUTHORIZER',
        message: 'Your clearance level is insufficient to perform this operation.'
      });
    }

    return next();
  };
};