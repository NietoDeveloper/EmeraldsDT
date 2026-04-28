import { Schema, model, Document, Types, ClientSession } from 'mongoose';
import crypto from 'crypto';

/**
 * 🛠️ INVENTORY LEDGER - INDUSTRIAL GRADE (L6)
 * Inmutable Transaction Log for Emerald DT
 */

export interface IInventoryLedger extends Document {
    emeraldId: Types.ObjectId;
    action: 'INLET' | 'RESERVE' | 'SALE' | 'ADJUSTMENT' | 'RETURN';
    quantity: number;
    previousStock: number;
    currentStock: number;
    reason: string;
    referenceId?: Types.ObjectId; 
    performedBy: Types.ObjectId;
    integrityHash: string; // Hash SHA-256 para auditoría forense
    metadata: {
        location: string;
        ipAddress?: string;
        deviceInfo?: string;
    };
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
        required: true,
        uppercase: true
    },
    quantity: { type: Number, required: true, default: 1 },
    previousStock: { type: Number, required: true },
    currentStock: { type: Number, required: true },
    reason: { type: String, required: true, trim: true },
    referenceId: { type: Schema.Types.ObjectId, index: true },
    performedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        index: true
    },
    integrityHash: { type: String, unique: true },
    metadata: {
        location: { type: String, default: 'Bogotá Vault' },
        ipAddress: { type: String },
        deviceInfo: { type: String }
    }
}, { 
    timestamps: true, 
    versionKey: false,
    collection: 'inventory_ledger' // Forzado para consistencia en el Cluster Omega
});

// Índices de alta velocidad para reportes de Dashboard
InventoryLedgerSchema.index({ createdAt: -1 });
InventoryLedgerSchema.index({ emeraldId: 1, action: 1 });

/**
 * 🔒 INTEGRITY PROTOCOL (L6)
 * Genera un sello digital antes de insertar el registro.
 */
InventoryLedgerSchema.pre('save', function(next) {
    if (this.isNew) {
        const payload = `${this.emeraldId}|${this.action}|${this.currentStock}|${this.performedBy}|${this.createdAt}`;
        this.integrityHash = crypto
            .createHmac('sha256', process.env.JWT_SECRET || 'internal_secret')
            .update(payload)
            .digest('hex');
    }
    next();
});

/**
 * ⚡ ATOMIC LEDGER ENGINE
 */
export class LedgerService {
    /**
     * Registra un movimiento garantizando la persistencia en la sesión transaccional.
     */
    static async record(data: Partial<IInventoryLedger>, session: ClientSession) {
        const [entry] = await InventoryLedger.create([data], { session });
        return entry;
    }

    /**
     * Verifica si un registro ha sido manipulado manualmente en la base de datos.
     */
    static async verifyIntegrity(ledgerId: string): Promise<boolean> {
        const entry = await InventoryLedger.findById(ledgerId);
        if (!entry) return false;
        
        const payload = `${entry.emeraldId}|${entry.action}|${entry.currentStock}|${entry.performedBy}|${entry.createdAt}`;
        const checkHash = crypto
            .createHmac('sha256', process.env.JWT_SECRET || 'internal_secret')
            .update(payload)
            .digest('hex');
            
        return entry.integrityHash === checkHash;
    }
}

export const InventoryLedger = model<IInventoryLedger>('InventoryLedger', InventoryLedgerSchema);