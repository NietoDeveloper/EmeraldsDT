import { Types } from 'mongoose';

/**
 * 💳 OMEGA FINANCIAL CONTRACTS - GRADO BANCARIO L6
 * Tipados estrictos para pasarelas de pago (Stripe / Wompi) y auditoría de transacciones.
 */

export type PaymentGatewayProvider = 'STRIPE' | 'WOMPI';
export type CurrencyCode = 'COP' | 'USD';
export type PaymentTransactionStatus = 'PENDING' | 'AUTHORIZED' | 'SUCCESSFUL' | 'DECLINED' | 'VOIDED_ERROR';

/**
 * 🔒 EMERALD TRANSACTION METADATA
 * Metadatos de seguridad cruzada empaquetados dentro del payload de la pasarela.
 * Impide fraudes de suplantación mapeando el hardware lógico y el comprador.
 */
export interface IPaymentMetadata {
    emeraldId: string;       // ID único de la gema en Cluster Alpha
    sku: string;             // SKU de especificación GIA/CDTEC
    buyerId: string;         // ID del usuario comprador en Cluster Omega
    operatorLocation?: string;// Punto de venta o IP de origen de la transacción
}

/**
 * 🛫 GATEWAY CHARGE REQUEST
 * Contrato de entrada para inicializar un flujo de cobro en el backend.
 */
export interface ICreatePaymentIntentInput {
    emeraldId: Types.ObjectId | string;
    gateway: PaymentGatewayProvider;
    currency: CurrencyCode;
    email: string;            // Correo del tarjetahabiente para alertas inmediatas
}

/**
 * 🛬 GATEWAY INTENT RESPONSE
 * Respuesta unificada del servidor hacia el frontend (Next.js) para renderizar los formularios seguros.
 */
export interface IPaymentIntentResponse {
    success: boolean;
    gateway: PaymentGatewayProvider;
    transactionId: string;    // ID único de la pasarela (ch_..., prc_...)
    clientSecret: string;     // Token temporal para rehidratar Stripe Elements o Wompi Widget
    amount: number;           // Monto total en centavos (Stripe) o unidad base
    currency: CurrencyCode;
    status: PaymentTransactionStatus;
}

/**
 * 🛰️ STRIPE WEBHOOK EVENT CONTRACT
 * Mapeo estricto del payload asíncrono crudo enviado por los servidores de Stripe.
 */
export interface IStripeWebhookEvent {
    id: string;
    type: 'payment_intent.succeeded' | 'payment_intent.payment_failed' | 'charge.refunded';
    data: {
        object: {
            id: string;
            amount: number;
            currency: string;
            status: string;
            metadata: {
                emeraldId: string;
                sku: string;
                buyerId: string;
                operatorLocation?: string;
            };
            last_payment_error: {
                message: string;
                code: string;
            } | null;
        };
    };
}

/**
 * 🛰️ WOMPI WEBHOOK EVENT CONTRACT
 * Mapeo del payload asíncrono firmado enviado por los servidores de Wompi (Bancolombia).
 */
export interface IWompiWebhookEvent {
    event: 'transaction.updated';
    data: {
        transaction: {
            id: string;
            amount_in_cents: number;
            reference: string; // Referencia interna de Emerald DT
            currency: CurrencyCode;
            status: 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';
            payment_method_type: 'CARD' | 'NEQUI' | 'PSE' | 'BANC_APP';
            signature: {
                properties: string[];
                checksum: string; // Hash SHA-256 de validación perimetral
            };
        };
    };
    sent_at: string;
}

/**
 * 📊 FINANCIAL LEDGER RECORD
 * Estructura de persistencia inmutable para el libro contable de ventas de esmeraldas.
 */
export interface IFinancialLedgerDocument {
    _id: Types.ObjectId;
    transactionId: string;
    emeraldId: Types.ObjectId;
    buyerId: Types.ObjectId;
    gateway: PaymentGatewayProvider;
    amount: number;
    currency: CurrencyCode;
    status: PaymentTransactionStatus;
    gatewayChecksum?: string; // Firma o hash de verificación de integridad del evento
    failureReason?: string;
    createdAt: Date;
    updatedAt: Date;
}