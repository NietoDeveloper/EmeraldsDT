import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Emerald } from '../emeralds/emerald.model.js';
import { LedgerService } from './inventory.ledger.js';
import { socketService } from '../../shared/services/socket.service.js';

/**
 * 🛠️ INVENTORY CONTROL CENTER - NIVEL L6
 * Gestión de stock en tiempo real y auditoría cruzada
 */

export const updateStock = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params; // ID de la Esmeralda
        const { action, quantity, reason, adminId, metadata } = req.body;

        // 1. Bloqueo de consistencia: Buscar producto en Cluster Alpha
        const emerald = await Emerald.findById(id).session(session);
        if (!emerald) {
            throw new Error('ASSET_NOT_FOUND');
        }

        const previousStock = emerald.inventory.stock;
        let newStock = previousStock;

        // 2. Lógica de cálculo de inventario
        if (action === 'INLET' || action === 'RETURN') {
            newStock += quantity;
        } else if (action === 'SALE' || action === 'RESERVE' || action === 'ADJUSTMENT') {
            if (previousStock < quantity) throw new Error('INSUFFICIENT_STOCK');
            newStock -= quantity;
        }

        // 3. Actualización Atómica en Cluster Alpha (Público)
        emerald.inventory.stock = newStock;
        emerald.inventory.status = newStock === 0 ? 'SOLD' : emerald.inventory.status;
        emerald.inventory.lastStockUpdate = new Date();
        await emerald.save({ session });

        // 4. Registro inmutable en el Ledger (Cluster Omega - Seguro)
        const ledgerEntry = await LedgerService.record({
            emeraldId: emerald._id,
            action,
            quantity,
            previousStock,
            currentStock: newStock,
            reason,
            performedBy: adminId,
            metadata: {
                location: metadata?.location || 'Bogotá Vault',
                ipAddress: req.ip
            }
        }, session);

        // 5. Commit de la transacción
        await session.commitTransaction();

        // 6. ⚡ TELEMETRÍA EN TIEMPO REAL (L6)
        // Notificamos a todos los clientes conectados que el inventario cambió
        socketService.emitInventoryUpdate({
            sku: emerald.specifications.sku,
            stock: newStock,
            status: emerald.inventory.status
        });

        res.status(200).json({
            status: 'SUCCESS',
            messa
            }
};