import { Router, Request, Response, NextFunction } from 'express';
import { 
    createEmerald, 
    getAllEmeralds, 
    getEmeraldBySlug, 
    updateEmerald,
    deleteEmerald // Asumimos implementación en controlador para limpieza
} from './emerald.controller.js';

/**
 * 🐍 LA CONSTRICTOR - SECURITY LAYER
 * Protocolo de validación estricta para activos de alto valor.
 * Este middleware actúa como la primera barrera física antes de la DB.
 */
const constrictorGuard = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sku, name, specifications, financials } = req.body;

        // 1. Integridad de Identificación
        if (!sku || sku.length < 5) {
            throw new Error('EM-GUARD-01: SKU_INVALID_OR_MISSING');
        }

        // 2. Integridad Técnica (Peso y Origen)
        if (!specifications?.weight || specifications.weight <= 0) {
            throw new Error('EM-GUARD-02: SPECIFICATIONS_WEIGHT_ERROR');
        }

        const validOrigins = ['Muzo', 'Chivor', 'Coscuez', 'Gachalá', 'Other'];
        if (!validOrigins.includes(specifications.origin)) {
            throw new Error('EM-GUARD-03: ORIGIN_UNRECOGNIZED');
        }

        // 3. Integridad Financiera (No se permiten valores negativos)
        if (!financials?.price || financials.price < 0) {
            throw new Error('EM-GUARD-04: FINANCIAL_PRICE_ERROR');
        }

        // Sanitización Proactiva
        req.body.sku = sku.toUpperCase().trim();
        req.body.name = name.trim();

        next();
    } catch (error: any) {
        return res.status(403).json({
            status: 'BLOCKED_BY_CONSTRICTOR',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
};

/**
 * 🛠️ ASYNC WRAPPER
 * Evita que el servidor colapse ante errores no capturados en el controlador.
 */
const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const router = Router();

/**
 * 💎 EMERALD DT - SECURE ASSET PIPELINES
 * -----------------------------------------------------------------
 * Estos endpoints gestionan el ciclo de vida del inventario en Bogotá.
 */

// 🟢 PUBLIC PIPELINES (Read Only)
// Acceso para e-commerce principal y clientes
router.get(
    '/', 
    catchAsync(getAllEmeralds)
);

router.get(
    '/detail/:slug', 
    catchAsync(getEmeraldBySlug)
);

// 🔴 PRIVATE PIPELINES (Write/Audit)
// Acceso exclusivo para el Dashboard de Software DT
// NOTA: El middleware de JWT se inyectará aquí en el siguiente despliegue.

router.post(
    '/register', 
    constrictorGuard, 
    catchAsync(createEmerald)
);

router.put(
    '/update/:id', 
    constrictorGuard, 



export default router;