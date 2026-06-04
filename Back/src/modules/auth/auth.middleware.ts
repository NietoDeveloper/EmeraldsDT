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

        next();
    } catch (error: any) 
};
T')[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
 
     
                message: 'Your clearance level is insufficient for this operation' 
            });
        }
        next();
    };
};