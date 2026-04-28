import { Schema, model, Document, Types } from 'mongoose';

/**
 * 🛠️ INVENTORY LEDGER - INDUSTRIAL GRADE (L6)
 * Propósito: Registro inmutable de movimientos de activos.
 * Vincula el flujo de stock con la auditoría del Cluster Omega.
 */

export interface IInventoryLedger extends Document {
    emeraldId: Types.ObjectId;
    action: 'INLET' | 'RESERVE' | 'SALE' | 'ADJUSTMENT' | 'RETURN';
    quantity: number; // Para gemas únicas suele ser 1, pero el sistema escala a lotes
    previousStock: number;
    currentStotId;   // ID del Empleado (Isabella / Manuel)
    metadata: {
