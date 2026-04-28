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
    currentStock: number;
    reason: string;
    referenceId?: Types.ObjectId; // ID de la Venta o Ticket de Soporte
    performedBy: Types.ObjectId;   // ID del Empleado (Isabella / Manuel)
    metadata: {
        location: string;
        hash?: string; // Para integridad criptográfica de la transacción
    };
    timestamp: Date;
}

const InventoryLedgerSchema = new Schema<IInventoryLedger>({
    emeraldId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Emerald', 
        required: true, 
        index: true 
    },
    action: { 
        type: String, 
        enum: Schema.Tydger>('InventoryLedger', InventoryLedgerSchema);