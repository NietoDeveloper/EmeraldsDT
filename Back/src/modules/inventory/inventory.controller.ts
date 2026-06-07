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
        if (action === 'INLET' || action === 'RETURN
            action,
            quantity,