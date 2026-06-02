import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, IJWTPayload } from './auth.interfaces.js';

// Guardián A: Autenticidad del Token
export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'UNAUTHORIZED', message: 'Missing or malformed token' });
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'ALPHA_CLUSTER_SECRET_KEY';

        const decoded = jwt.verify(token, secret) as IJWTPayload;
        req.user = decoded; // Inyección de la identidad en el flujo
        next();
    } catch (error: any) {
        return res.status(401).json({ status: 'UNAUTHORIZED', message: 'Token has expired or is corrupt' });
    }
};

// Guardián B: Control de Accesos Basado en Roles (RBAC)
export const restrictTo = (...allowedRoles: ('SUPER_ADMIN' | 'EMPLOYEE' | 'CLIENT')[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ status: 'UNAUTHORIZED', message: 'Session data not initialized' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                status: 'FORBIDDEN', 
                message: 'Your clearance level is insufficient for this operation' 
            });
        }
        next();
    };
};