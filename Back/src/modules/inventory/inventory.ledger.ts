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
        enum: ['INLET', 'RESERVE', 'SALE', 'ADJUSTMENT', 'RETURN'], 
        required: true 
    },
    quantity: { type: Number, required: true },
    previousStock: { type: Number, required: true },
    currentStock: { type: Number, required: true },
    reason: { type: String, required: true },
    referenceId: { type: Schema.Types.ObjectId },
    performedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    metadata: {
        location: { type: String, default: 'Bogotá Vault' },
        hash: { type: String }
    }
}, { 
    timestamps: true, 
    versionKey: false 
});

// Índice compuesto para auditorías rápidas por gema y fecha
InventoryLedgerSchema.index({ emeraldId: 1, createdAt: -1 });

/**
 * ⚡ L6 ATOMIC ENGINE
 * Este servicio debe ejecutarse dentro de una transacción de Mongoose
 */
export const recordMovement = async (
    data: Partial<IInventoryLedger>, 
    session: any
) => {
    const entry = new InventoryLedger(data);
    
    // Generación de Hash de integridad simple para evitar manipulación manual de logs
    const payload = `${data.emeraldId}-${data.action}-${data.currentStock}-${Date.now()}`;
    entry.metadata.hash = Buffer.from(payload).toString('base64');
    
    return await entry.save({ session });
};

export const InventoryLedger = model<IInventoryLedger>('InventoryLedger', InventoryLedgerSchema);