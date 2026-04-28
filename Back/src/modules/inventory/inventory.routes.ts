import { Router } from 'express';
import * as inventoryController from './inventory.controller.js';

/**
 * 🛰️ INVENTORY ROUTE CLUSTER - NIVEL L6
 * Endpoint: /api/v1/inventory
 */
const router = Router();

/**
 * @route   PATCH /api/v1/inventory/stock/:id
 * @desc    Actualización atómica de stock con disparo de Sockets y Ledger
 * @access  Private (Dashboard/Admin)
 */
router.patch('/stock/:id', inventoryController.updateStock);

/**
 * @route   GET /api/v1/inventory/history/:emeraldId
 * @desc    Consulta de trazabilidad inmutable del Ledger (Cluster Omega)
 * @access  Private (Audit/Admin)
 */
router.get('/history/:emeraldId', inventoryController.getInventoryHistory);

export default router;