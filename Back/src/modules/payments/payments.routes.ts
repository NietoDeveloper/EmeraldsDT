import { Router } from 'express';
import express from 'express';
import * as paymentsController from './payments.controller.js';
import { requireAuth } from '../auth/auth.middleware.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
import { createPaymentIntentSchema } from './payments.schema.js';

/**
 * 🛰️ OMEGA FINANCIAL ROUTE CLUSTER - LEVEL L6
 * Endpoint Base: /api/v1/payments
 * Controladores perimetrales para pasarelas de pago y escucha de Webhooks de alta fidelidad.
 */
const router = Router();

/**
 * @route   POST /api/v1/payments/checkout
 * @desc    Inicializa intenciones de cobro bloqueando el precio del activo (Stripe/Wompi)
 * @access  Private [SUPER_ADMIN, EMPLOYEE, CLIENT]
 */
router.post(
    '/checkout',
    requireAuth,
    validate(createPaymentIntentSchema),
    paymentsController.createPaymentIntent
);

/**
 * @route   POST /api/v1/payments/webhook/stripe
 * @desc    Escucha de eventos de servidor a servidor (Server-to-Server) firmados por Stripe
 * @access  Public (Protegido por verificación criptográfica asimétrica interna)
 */
router.post(
    '/webhook/stripe',
    // 🛡️ CRITICAL RAWBITE: Se intercepta el body como stream binario crudo (Raw Buffer)
    // Requisito mandatorio para que stripe.webhooks.constructEvent calcule el checksum
    express.raw({ type: 'application/json' }),
    paymentsController.handleStripeWebhook
);

export default router;