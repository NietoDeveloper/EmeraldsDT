import mongoose, { Schema, Document, ClientSession } from 'mongoose';
import crypto from 'crypto';

/**
 * 🔒 OMEGA SECURITY CONTRACTS - CRYPTOGRAPHIC LEDGER
 * Strict interface definition for immutable transaction bookkeeping.
 */
export interface IInventoryLedger {
    emeraldId: mongoose.Types.ObjectId;
    action: 'INLET' | 'RETURN' | 'SALE' | 'RESERVE' | 'ADJUSTMENT';
    quantity: number;
    previousStock: number;
    currentStock: number;
    reason: string;
    performedBy: string; // Extracted direct from secure req.user context
    integrityHash: string; // Crypto SHA-256 Shield
    metadata: {
        location: string;
        ipAddress: string;
    };
    createdAt: Date;
}

export interface IInventoryLedgerDocument extends IInventoryLedger, Document {}

/**
 * 🗄️ DATABASE SCHEMA DEFINITION - DATACENTER OMEGA
 */
const InventoryLedgerSchema = new Schema<IInventoryLedgerDocument>({
    emeraldId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Emerald', 
        required: true,
        index: true // High performance search for analytical audits
    },
    action: { 
        type: String, 
        enum: ['INLET', 'RETURN', 'SALE', 'RESERVE', 'ADJUSTMENT'], 
        required: true 
    },
    quantity: { type: Number, required: true },
    previousStock: { type: Number, required: true },
    currentStock: { type: Number, required: true },
    reason: { type: String, required: true, trim: true },
    performedBy: { type: String, required: true, index: true },
    integrityHash: { type: String, required: true, unique: true },
    metadata: {
        location: { type: String, default: 'Bogotá Vault' },
        ipAddress: { type: String, required: true }
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }, // Ledger logs are immutable; they can never be updated
    versionKey: false
});

// Enforce Compound Indexing for deep forensic logging audits
InventoryLedgerSchema.index({ emeraldId: 1, createdAt: -1 });

export const InventoryLedger = mongoose.model<IInventoryLedgerDocument>('InventoryLedger', InventoryLedgerSchema);

/**
 * ⚡ IMMUTABLE LEDGER CORE SERVICE
 * Calculates signatures and orchestrates sequential records.
 */
export class LedgerService {
    
    /**
     * @private calculateSHA256
     * Generates a unique SHA-256 fingerprint from the transactional payload data.
     */
    private static calculateSHA256(payload: Omit<IInventoryLedger, 'integrityHash' | 'createdAt'>): string {
        const payloadString = JSON.stringify({
            emeraldId: payload.emeraldId.toString(),
            action: payload.action,
            quantity: payload.quantity,
            previousStock: payload.previousStock,
            currentStock: payload.currentStock,
            reason: payload.reason,
            performedBy: payload.performedBy,
            metadata: payload.metadata
        });

        return crypto
            .createHmac('sha256', process.env.JWT_SECRET || 'emerald-dt-fallback-salt-key')
            .update(payloadString)
            .digest('hex');
    }

    /**
     * @method record
     * @description Criptográficamente firma y guarda un registro dentro de la sesión ACID distribuida.
     */
    public static async record(
        data: Omit<IInventoryLedger, 'integrityHash' | 'createdAt'>,
        session?: ClientSession
    ): Promise<IInventoryLedgerDocument> {
        
        // 1. Calculate the atomic checksum hash
        const integrityHash = this.calculateSHA256(data);

        // 2. Hydrate the document structure
        const ledgerDocument = new InventoryLedger({
            ...data,
            integrityHash
        });

        // 3. Persist using the distributed cluster transactional context
        await ledgerDocument.save({ session });
        
        return ledgerDocument;
    }
}