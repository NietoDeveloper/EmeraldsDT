import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions.js';
import { dbManager } from './config/database.js';

// 🛰️ Inyección de Rutas de Dominio (Cluster Alpha & Omega Target)
import authRoutes from './modules/auth/auth.routes.js'; 
import emeraldRoutes from './modules/emeralds/emerald.routes.js';
import inventoryRoutes from './modules/inventory/inventory.routes.js';
import paymentRoutes from './modules/payments/payments.routes.js'; // 💳 Nuevo canal financiero
import { AuthenticatedRequest } from './modules/auth/auth.interfaces.js';

const app: Application = express();

// 1. 🛡️ SECURITY & MONITORING LAYER (Frontera de Red Unificada)
app.use(helmet({ contentSecurityPolicy: false })); // CSP Desactivado para rendering fluido de canvas y uploads locales
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cookieParser()); // Gestión inalterable de Refresh Tokens en HTTPOnly Cookies

/**
 * ⚡ CRITICAL L6 PRIORITY ROUTING RULE: FINANCIAL WEBHOOK ISOLATION
 * Inyectamos el enrutador de pagos ANTES de los parsers de JSON globales.
 * Esto preserva el stream binario de bytes crudos requeridos por Stripe para verificar firmas.
 */
app.use('/api/v1/payments', paymentRoutes);

// 2. 🗄️ GLOBAL DATA PARSING (Para el resto de módulos tradicionales del monorepo)
app.use(express.json({ limit: '20mb' })); // S+ Rank: Soporte extendido para buffers de alta resolución
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

/**
 * 🐍 STATIC ASSET DELIVERY
 * Punto de distribución perimetral para fotos de gemas y PDFs de laboratorios CDTEC/GIA.
 */
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 3. 🛣️ APIS DOMAIN PIPELINE
app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/emeralds', emeraldRoutes);
app.use('/api/v1/inventory', inventoryRoutes); // Cruce de datos de inventario Dashboard ➔ E-commerce

/**
 * 🛠️ HEALTH CHECK (Nivel S+)
 * Telemetría en vivo del estado de conectividad de los dos clústeres de datos.
 */
app.get('/api/health', (req: Request, res: Response) => {
    try {
        const { public: publicDB, secure: secureDB } = dbManager.getConnections();
        
        res.status(200).json({ 
            status: 'ONLINE', 
            timestamp: new Date().toISOString(),
            node: 'Emerald DT Core Node',
            uptime: process.uptime(),
            db_alpha: publicDB.readyState === 1 ? 'CONNECTED' : 'CONNECTING',
            db_omega: secureDB.readyState === 1 ? 'CONNECTED' : 'CONNECTING'
        });
    } catch (error) {
        res.status(503).json({ 
            status: 'DEGRADED', 
            message: 'Database Engine Orchestrator failure' 
        });
    }
});

/**
 * 🚀 ROOT ENDPOINT - SOFTWARE DT STANDARD
 */
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'Operational', 
    service: 'Emerald DT Security Cluster API',
    mode: 'Atomic-Proof/Standalone',
    engineer: 'Software DT',
    version: "1.0.0"
  });
});

/**
 * 💥 GLOBAL ERROR HANDLER (L6 Standard Practice)
 * Interceptor centralizado de excepciones. Bloquea fugas de memoria y oculta el stack-trace en la nube.
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const authReq = req as AuthenticatedRequest; 
    
    // Log analítico con procedencia del contexto del operador
    const userContext = authReq.user ? `[UID: ${authReq.user.uid} | Role: ${authReq.user.role}]` : '[Guest Network Request]';
    console.error(`\x1b[31m💥 [Pipeline Fault] ${userContext}: ${err.message}\x1b[0m`);
    
    res.status(statusCode).json({
        status: 'CRITICAL_ERROR',
        message: err.message || 'Internal Datacenter Server Fault',
        stack: process.env.NODE_ENV === 'production' ? '🛡️ [Data Protected]' : err.stack
    });
});

export default app;