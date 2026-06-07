import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Emerald } from '../emeralds/emerald.model.js';
import { User } from '../users/user.model.js';
import { socketService } from '../../shared/services/socket.service.js';
import { LedgerService } from '../inventory/inventory.ledger.js';
import { AuthenticatedRequest } from '../auth/auth.interfaces.js';
import { CreatePaymentIntentInput } from './payments.schema.js';

// Inicialización perezosa de Stripe (Evita fugas en entornos locales sin llaves cargadas)
import Stripe from 'stripe';
const stripe = process.env.STRIPE_SECRET_KEY 
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-01-27' as any }) 
    : null;

/**
 * 💳 OMEGA FINANCIAL ENGINE - LEVEL L6
 * Orquestador transaccional de cobros y procesamiento criptográfico de webhooks.
 */

/**
 * 🛰️ PIPELINE - CREATE PAYMENT INTENT
 * Bloquea el precio del activo, emite los tokens de sesión y prepara la pasarela.
 */
export const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const { emeraldId, gateway, currency } = req.body as CreatePaymentIntentInput;
        const buyerId = authReq.user?.uid;

        if (!buyerId) {
            const error: any = new Error('Security context missing customer clearance credentials');
            error.statusCode = 401;
            throw error;
        }

        // 1. Localizar el activo de alto valor en Cluster Alpha de forma aislada (lean)
        const emerald = await Emerald.findById(emeraldId).lean();
        if (!emerald) {
            const error: any = new Error('The target emerald asset does not exist in our datacenters');
            error.statusCode = 404;
            throw error;
        }

        // Verificar disponibilidad física e inmediata del activo
        if (emerald.inventory.stock < 1 || emerald.inventory.status === 'SOLD') {
            const error: any = new Error('Asset availability lock: This unique gem has already been commercialized');
            error.statusCode = 400;
            throw error;
        }

        // 2. Cálculo estricto de montos en centavos para mitigar pérdidas de punto flotante
        // Ejemplo: Si el precio es 5000.00 USD, convertimos de inmediato a 500000 centavos
        const rawPrice = emerald.price; 
        const amountInCentavos = Math.round(rawPrice * 100);

        let clientSecret = '';
        let transactionId = '';

        // 3. Bifurcación polimórfica de la infraestructura de pasarelas
        if (gateway === 'STRIPE') {
            if (!stripe) {
                const error: any = new Error('Stripe infrastructure provider not initialized on this node');
                error.statusCode = 503;
                throw error;
            }

            // Inyección atómica de metadatos criptográficos directamente en los servidores de la pasarela
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amountInCentavos,
                currency: currency.toLowerCase(),
                payment_method_types: ['card'],
                metadata: {
                    emeraldId: emerald._id.toString(),
                    sku: emerald.specifications.sku,
                    buyerId: buyerId
                }
            });

            clientSecret = paymentIntent.client_secret || '';
            transactionId = paymentIntent.id;
        } else if (gateway === 'WOMPI') {
            /**
             * 🇨🇴 PROTOCOLO DE CONEXIÓN LOCAL - WOMPI (Bancolombia)
             * Generación de la referencia única e íntegra para el Widget del Frontend.
             */
            transactionId = `EMP-${Date.now()}-${emerald.specifications.sku}`;
            clientSecret = process.env.WOMPI_PUBLIC_KEY || 'pub_wompi_test_key';
        }

        res.status(201).json({
            status: 'SUCCESS',
            gateway,
            transactionId,
            clientSecret,
            amount: amountInCentavos,
            currency,
            statusPipeline: 'PENDING_CUSTOMER_FUNDS'
        });

    } catch (error: any) {
        next(error);
    }
};

/**
 * 🛰️ PIPELINE - STRIPE ASYNCHRONOUS WEBHOOK
 * Escucha las señales seguras emitidas directamente por los servidores globales de Stripe.
 */
export const handleStripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
    if (!stripe) return res.status(503).send('Stripe uninitialized');
    
    const sig = req.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    let event: Stripe.Event;

    try {
        // Validación perimetral de la firma criptográfica del webhook
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
        console.error(`\x1b[31m🛡️ [CATASTROPHIC WEBHOOK FRAUD]: Validation signature failed: ${err.message}\x1b[0m`);
        return res.status(400).send(`Webhook Error Signature: ${err.message}`);
    }

    // Aislamiento ACID para consolidar la venta de forma irreversible
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            const { emeraldId, sku, buyerId } = paymentIntent.metadata;

            // 1. Bloqueo de consistencia y mutación atómica en Cluster Alpha
            const emerald = await Emerald.findById(emeraldId).session(session);
            if (emerald && emerald.inventory.status !== 'SOLD') {
                
                const previousStock = emerald.inventory.stock;
                emerald.inventory.stock = 0; // Gemas únicas de colección
                emerald.inventory.status = 'SOLD';
                emerald.inventory.lastStockUpdate = new Date();
                await emerald.save({ session });

                // 2. Registro histórico inmutable en el Ledger del Datacenter Omega
                await LedgerService.record({
                    emeraldId: emerald._id,
                    action: 'SALE',
                    quantity: previousStock,
                    previousStock,
                    currentStock: 0,
                    reason: `Automated Liquidation: Stripe Intent Verified Successfully [ID: ${paymentIntent.id}]`,
                    performedBy: buyerId,
                    metadata: { location: 'E-Commerce Checkout Pipeline', ipAddress: req.ip || '0.0.0.0' }
                }, session);

                // 3. Confirmación definitiva de la transacción financiera distribuida
                await session.commitTransaction();

                // 4. ⚡ BROADCAST EN TIEMPO REAL - LA CONSTRICTOR
                socketService.emitInventoryUpdate({
                    sku,
                    stock: 0,
                    status: 'SOLD'
                });

                console.log(`\x1b[32m💎 [FINANCIAL INTEGRITY]: Asset ${sku} fully consolidated via Stripe [${paymentIntent.id}]\x1b[0m`);
            } else {
                await session.abortTransaction();
            }
        } else {
            // Ignorar otros eventos sin romper el canal de comunicación del servidor externo
            await session.abortTransaction();
        }

        res.status(200).json({ received: true });
    } catch (error: any) {
        await session.abortTransaction();
        console.error(`\x1b[31m💥 [WEBHOOK CONTROLLER FAULT]: ${error.message}\x1b[0m`);
        res.status(500).json({ error: 'Internal pipeline synchronization collapse' });
    } finally {
        session.endSession();
    }
};