import { Router, Request, Response, NextFunction } from 'express';
import { 
    createEmerald, 
    getAllEmeralds, 
    getEmeraldBySlug, 
    updateEmerald,
    deleteEmerald 
} from './emerald.controller.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
import { requireAuth, restrictTo } from '../auth/auth.middleware.js';
import { emeraldSchema, updateEmeraldSchema } from './emerald.schema.js';

/**
 * 🛠️ ASYNC WRAPPER - SOFTWARE DT STANDARD
 * Asegura que los errores de los controladores lleguen al Global Error Handler.
 */
const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * 🐍 LA CONSTRICTOR - SECURITY & SANITIZATION LAYER (L6)
 * Realiza limpieza de datos crítica antes de la validación de esquema.
 */
const constrictorSanitizer = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.specifications?.sku) {
        req.body.specifications.sku = req.body.specifications.sku.toUpperCase().trim();
    }
    if (req.body.name) {
        req.body.name = req.body.name.trim();
    }
    next();
};

const router = Router();

/**
 * 💎 EMERALD DT - SECURE ASSET PIPELINES
 * Operaciones de activos de alto valor - Bogotá Node
 */

// 🟢 PUBLIC PIPELINES (Read Optimized)
// Accesibles de forma abierta por el E-commerce público y motores SEO.
router.get(
    '/', 
    catchAsync(getAllEmeralds)
);

router.get(
    '/detail/:slug', 
    catchAsync(getEmeraldBySlug)
);

// 🔴 PRIVATE PIPELINES (Write/Audit/Decommission)
// Puertos protegidos con autenticación obligatoria en cascada.
router.use(requireAuth);

/**
 * REGISTRO DE ACTIVOS
 * Permiso: SUPER_ADMIN (Manuel) y EMPLOYEE (Isabella / Asesores)
 */
router.post(
    '/register', 
    restrictTo('SUPER_ADMIN', 'EMPLOYEE'),
    constrictorSanitizer,
    validate(emeraldSchema), 
    catchAsync(createEmerald)
);

/**
 * ⚠️ UPDATE PROTOCOL
 * Permiso: SUPER_ADMIN y EMPLOYEE para cambios de precio o stock en el Dashboard.
 */
router.put(
    '/update/:id', 
    restrictTo('SUPER_ADMIN', 'EMPLOYEE'),
    constrictorSanitizer,
    validate(updateEmeraldSchema), 
    catchAsync(updateEmerald)
);

/**
 * 🛡️ DECOMMISSION PROTOCOL (Safe Mode / Purga Destructiva)
 * Operación crítica de inventario. Restringido estrictamente al nivel del Arquitecto.
 */
router.delete(
    '/decommission/:id', 
    restrictTo('SUPER_ADMIN'),
    catchAsync(deleteEmerald)
);

// 📊 PIPELINE TELEMETRY
router.get('/pipeline/status', (req: Request, res: Response) => {
    res.status(200).json({
        node: 'Emerald-DT-Pipeline',
        shield: 'La Constrictor v2.1 (RBAC & Zod Shield Integrated)',
        engine: 'Software DT L6',
        status: 'Operational'
    });
});

export default router;