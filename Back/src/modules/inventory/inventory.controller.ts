import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Emerald } from '../emeralds/emerald.model.js';
import { LedgerService } from './inventory.ledger.js';
import { socketService } from '../../shared/services/socket.service.js';
import { AuthenticatedRequest } from '../auth/auth.interfaces.js';

/**
 * 🛠️ INVENTORY CONTROL CENTER - LEVEL L6
 * Gestión de stock atómica y auditoría cruzada con transacciones ACID distribuidas.
 */

/**
 * 🛰️ PIPELINE - UPDATE STOCK
 * Ejecuta mutaciones controladas de inventario y genera un registro inmutable en el Ledger.
 */
export const updateStock = async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params; // ID de la Esmeralda
        const { action, quantity, reason, metadata } = req.body;
        
        // 🔒 Extraemos el operador real verificado por el Firewall RBAC
        const operatorId = authReq.user?.uid;
        if (!operatorId) {
            const error: any = new Error('Security context missing context identification');
            error.statusCode = 401;
            throw error;
        }

        // 1. Bloqueo de consistencia: Buscar producto en Cluster Alpha con la sesión activa
        const emerald = await Emerald.findById(id).session(session);
        if (!emerald) {
            const error: any = new Error('Asset blueprint not found in Alpha Datacenter');
            error.statusCode = 404;
            throw error;
        }

        const previousStock = emerald.inventory.stock;
        let newStock = previousStock;

        // 2. Lógica matemática de cálculo de inventario
        if (action === 'INLET' || action === 'RETURN') {
            newStock += quantity;
        } else if (action === 'SALE' || action === 'RESERVE' || action === 'ADJUSTMENT') {
            if (previousStock < quantity) {
                const error: any = new Error(`Operation aborted: Insufficient stock units. Available: ${previousStock}`);
                error.statusCode = 400;
                throw error;
            }
            newStock -= quantity;
        } else {
            const error: any = new Error(`Operation aborted: Invalid inventory action [${action}]`);
            error.statusCode = 400;
            throw error;
        }

        // 3. Actualización Atómica en Cluster Alpha (Público)
        emerald.inventory.stock = newStock;
        
        // Si el stock llega a 0, mutamos automáticamente el estatus de la gema a SOLD (Vendida)
        if (newStock === 0) {
            emerald.inventory.status = 'SOLD';
        }
        
        emerald.inventory.lastStockUpdate = new Date();
        await emerald.save({ session });

        /**
         * 4. REGISTRO INMUTABLE EN EL LEDGER (Cluster Omega - Seguro)
         * Genera la huella criptográfica de auditoría para el Dashboard sin scroll de Isabella.
         */
        const ledgerEntry = await LedgerService.record({
            emeraldId: emerald._id,
            action,
            quantity,
            previousStock,
            currentStock: newStock,
            reason,
            performedBy: operatorId,
            metadata: {
                location: metadata?.location || 'Bogotá Vault',
                ipAddress: req.ip || '0.0.0.0'
            }
        }, session);

        // 5. Commit de la transacción distribuida: Éxito total en ambos extremos
        await session.commitTransaction();

        /**
         * 6. ⚡ TELEMETRÍA EN TIEMPO REAL (L6 Protocol)
         * Despachamos la actualización vía WebSockets mediante La Constrictor Realtime
         * para refrescar las interfaces visuales de forma reactiva.
         */
        socketService.emitInventoryUpdate({
            sku: emerald.specifications.sku,
            stock: newStock,
            status: emerald.inventory.status
        });

        res.status(200).json({
            status: 'SUCCESS',
            message: 'Inventory synchronised and verified across data clusters',
            data: {
                newStock,
                transactionId: ledgerEntry.integrityHash
            }
        });

    } catch (error: any) {
        // 🚨 Ante cualquier fallo operativo, revertimos los cambios en caliente en ambos datacenters
        await session.abortTransaction();
        next(error); 
    } finally {
        session.endSession();
    }
};

/**
 * 🛰️ PIPELINE - GET INVENTORY HISTORY
 * Consulta rápida de auditoría analítica para trazabilidad física del activo.
 */
export const getInventoryHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { emeraldId } = req.params;
        
        // Búsqueda fluida y de solo lectura utilizando lean() para optimizar consumo en memoria
        const history = await mongoose.model('InventoryLedger')
            .find({ emeraldId })
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            status: 'SUCCESS',
            data: history
        });
    } catch (error: any) {
        next(error);
    }
};