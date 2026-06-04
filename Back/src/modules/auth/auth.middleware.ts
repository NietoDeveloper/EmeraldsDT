import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, IJWTPayload } from './auth.interfaces.js';

/**
 * 🛡️ OMEGA SECURITY FIREWALLS - LEVEL L6
 * Interceptores de red para el control de identidad y privilegios jerárquicos.
 */

/**
 * 🛰️ GUARDIÁN A: AUTHENTICITY LAYER (requireAuth)
 * Intercepta, desempaqueta y valida la firma criptográfica del token portador (Bearer Token).
 */
export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                status: 'UNAUTHORIZED', 
                message: 'Missing or malformed authorization credentials' 
            });
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'ALPHA_CLUSTER_SECRET_KEY';

        // Verificación criptográfica atómica
        const decoded = jwt.verify(token, secret) as IJWTPayload;
        
        // Inyección de la identidad y nivel de clearance en el flujo de la petición
        req.user = decoded; 
        next();
    } catch (error: any) {
        // 🔍 Telemetría detallada de errores para el ciclo de vida de la sesión en el Front-End
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                status: 'TOKEN_EXPIRED', 
                message: 'Your authentication token has expired. Re-authentication required' 
            });
        }
        
        return res.status(401).json({ 
            status: 'UNAUTHORIZED', 
            message: 'Authentication token is corrupt, malformed or signatures do not match' 
        });
    }
};

/**
 * 🛰️ GUARDIÁN B: ACCESS CLEARANCE CONTROL (restrictTo)
 * Fábrica de middlewares para restringir el acceso a los recursos según la jerarquía del rol.
 */
export const restrictTo = (...allowedRoles: ('SUPER_ADMIN' | 'EMPLOYEE' | 'CLIENT')[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ 
                status: 'UNAUTHORIZED', 
                message: 'Security Context Infrastructure not initialized' 
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                status: 'FORBIDDEN', 
                message: 'Access Denied: Your clearance level is insufficient for this operation' 
            });
        }
        
        next();
    };
};