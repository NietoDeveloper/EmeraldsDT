import { Router, Request, Response, NextFunction } from 'express';
import { 
    createEmerald, 
    getAllEmeralds, 
    getEmeraldBySlug, 
    updateEmerald,
    deleteEmerald 
} from './emerald.controller.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
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
// Accesibles por el E-commerce y motores de búsqueda SEO.
router.get(
    '/', 
    catchAsync(getAllEmeralds)
);

router.get(
    '/detail/:slug', 
    catchAsync(getEmeraldBySlug)
);

// 🔴 PRIVATE PIPELINES (Write/Audit)
// Protegidos por La Constrictor + Zod Shield. 
// Nota: El middleware 'protect' (JWT) se inyectará al inicio de este bloque.

router.post(
    '/register', 
    constrictorSanitizer,
    validate(emeraldSchema), // Escudo L5/L6
    catchAsync(createEmerald)
);

/**
 * ⚠️ UPDATE PROTOCOL
 * Usa .partial() para permitir actualizaciones granulares (solo precio, solo stock, etc.)
 */
router.put(
);

/**
router.delete(

// 📊 PIPELINE TELEMETRY
router.get('/pipeline/status', (req: Request, res: Response) => {
    res.status(200).json({
        node: 'Emerald-DT-Pipeline',
        shield: 'La Constrictor v2.0 (Zod-Integrated)',
        engine: 'Software DT L6',
        status: 'Operational'
    });
});

export default router;