import { Router, Request, Response } from 'express';
import { login, register } from './auth.controller.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '../users/user.schema.js';

const router = Router();

/**
 * 🔒 OMEGA CLUSTER - IDENTITY & CLEARANCE PIPELINES
 * Control de acceso y flujos de autenticación de grado militar.
 */

// 🟢 IDENTITY PIPELINES (Entry Points)
// Protegidos en la frontera de la red por La Constrictor + Zod Shield.
router.post(
    '/register', 
    validate(registerSchema), 
    register
);

router.post(
    '/login', 
    validate(loginSchema), 
    login
);

// 📊 OMEGA TELEMETRY
router.get('/status', (req: Request, res: Response) => {
    res.status(200).json({
        node: 'Omega-Identity-Cluster',
        shield: 'Zod & Bcrypt Engine v1.0',
        engine: 'Software DT L6',
        status: 'Operational'
    });
});

export default router;