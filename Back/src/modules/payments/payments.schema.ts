import { z } from 'zod';

/**
 * 🛡️ FINANCIAL VALIDATION SHEMAS - LEVEL L6
 * Escudos Zod para blindar intenciones de pago y asegurar el ingreso atómico de Webhooks.
 */

/**
 * 🛫 INTENT CREATION SHIELD (createPaymentIntentSchema)
 * Sanea y valida el payload inicial cuando el carrito del E-commerce solicita un checkout.
 */
export const createPaymentIntentSchema = z.object({
    body: z.object({
        emeraldId: z.string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Asset ID architecture (Must be Mongoose ObjectId format)')
            .trim(),
        
        gateway: z.enum(['STRIPE', 'WOMPI'], {
            errorMap: () => ({ message: 'Financial provider must be strictly STRIPE or WOMPI' })
        }),
        
        currency: z.enum(['COP', 'USD'], {
            errorMap: () => ({ message: 'Currency must be strictly aligned: COP (Local) or USD (International)' })
        }),
        
        email: z.string()
            .email('Invalid cardholder billing email contact')
            .lowercase()
            .trim()
    })
});

/**
 * 🛰️ STRIPE WEBHOOK SHIELD (stripeWebhookHeadersSchema)
 * Captura y valida la existencia de la firma perimetral obligatoria de Stripe.
 */
export const stripeWebhookHeadersSchema = z.object({
    headers: z.object({
        'stripe-signature': z.string({
            required_error: 'Critical Security Mismatch: Missing [stripe-signature] header protocol'
        }).min(10)
    }).passthrough() // Permite el flujo del resto de headers HTTP estándar sin mutarlos
});

/**
 * 🛰️ WOMPI WEBHOOK SHIELD (wompiWebhookPayloadSchema)
 * Sanea la estructura firmada por Bancolombia para el procesamiento asíncronico local.
 */
export const wompiWebhookPayloadSchema = z.object({
    body: z.object({
        event: z.literal('transaction.updated', {
            errorMap: () => ({ message: 'Unsupported Wompi event pipeline targeted' })
        }),
        data: z.object({
            transaction: z.object({
                id: z.string().trim(),
                amount_in_cents: z.number().int().positive(),
                reference: z.string().trim(),
                currency: z.enum(['COP', 'USD']),
                status: z.enum(['APPROVED', 'DECLINED', 'VOIDED', 'ERROR']),
                payment_method_type: z.enum(['CARD', 'NEQUI', 'PSE', 'BANC_APP']),
                signature: z.object({
                    properties: z.array(z.string()),
                    checksum: z.string().trim() // Hash SHA-256 de verificación perimetral
                })
            })
        }),
        sent_at: z.string().datetime({ message: 'Invalid ISO 8601 telemetry timestamp standard' })
    })
});

/**
 * ⚡ TYPE INFERENCE (L6)
 * Contratos de tipado estricto inferidos automáticamente de los esquemas de validación de dinero.
 */
export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema.shape.body>;
export type WompiWebhookPayloadInput = z.infer<typeof wompiWebhookPayloadSchema.shape.body>;