import { Router } from 'express';
import * as inventoryController from './inventory.controller.js';
import { requireAuth, restrictTo } from '../auth/auth.middleware.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
import { updateStockSchema } from './inventory.schema.js'; // 🛡️ Escudo de validación atómica

/**
 * 🛰️ INVENTORY ROUTE CLUSTER - LEVEL L6
 * Endpoint Base: /api/v1/inventory
 * Canales de sincronización simétrica entre el Dashboard de control y el E-commerce.
 */
const router = Router();

/**
 * @route   PATCH /api/v1/inventory/stock/:id
 * @desc    Actualización atómica de stock con disparo de Sockets y Ledger inmutable.
 * @access  Private [SUPER_ADMIN, EMPLOYEE]
 */
router.patch(
    '/stock/:id', 
    requireAuth, 
    restrictTo('SUPER_ADMIN', 'EMPLOYEE'),
    validate(updateStockSchema),
    inventoryController.updateStock
);

/**
 * @route   GET /api/v1/inventory/history/:emeraldId
 * @desc    Consulta de trazabilidad inmutable del Ledger (Cluster Omega Target)
 * @access  Private [SUPER_ADMIN]
 */
router.get(
    '/history/:emeraldId', 
    requireAuth, 
    restrictTo('SUPER_ADMIN'),
    inventoryController.getInventoryHistory
);

export default router;