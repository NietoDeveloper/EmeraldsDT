import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions.js';
import { dbManager } from './config/database.js';

// 🛰️ Inyección de Rutas de Dominio (Cluster Alpha & Omega)
import authRoutes from './modules/auth/auth.routes.js'; 
import emeraldRoutes from './modules/emeralds/emerald.routes.js';
import inventoryRoutes from './modules/inventory/inventory.routes.js';
import { AuthenticatedRequest } from './modules/auth/auth.interfaces.js'; // 🔑 Importación de la interfaz extendida

const app: Application = express();

// 1. 🛡️ Security & Monitoring Layer
// CSP desactivado para permitir renderizado de assets locales en dashboards
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 2. 🗄️ Data Parsing & Static Assets
app.use(express.json({ limit: '20mb' })); // S+ Rank: Soporte para buffers de alta resolución
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(cookieParser()); // Activo para la gestión segura de Refresh Tokens vía httpOnly cookies

/**
 * 🐍 STATIC ASSET DELIVERY
 * Punto de acceso para fotos de esmeraldas y certificados GIA/CDTEC
 */
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 3. 🛣️ API Routes Pipeline
app.use('/api/v1/auth', authRoutes); // 🔑 Canal de Autenticación montado en el pipeline central
app.use('/api/v1/emeralds', emeraldRoutes);
app.use('/api/v1/inventory', inventoryRoutes);

/**
 * 🛠️ HEALTH CHECK (Nivel S+)
 * Monitoreo de latencia y estado de doble cluster en tiempo real
 */
app.get('/api/health', (req: Request, res: Response) => {
    try {
        const { public: publicDB, secure: secureDB } = dbManager.getConnections();
        
        res.status(200).json({ 
            status: 'ONLINE', 
            timestamp: new Date().toISOString(),
            node: 'Emerald DT Core',
            uptime: process.uptime(),
            db_alpha: publicDB.readyState === 1 ? 'CONNECTED' : 'CONNECTING',
            db_omega: secureDB.readyState === 1 ? 'CONNECTED' : 'CONNECTING'
        });
    } catch (error) {
        res.status(503).json({ 
            status: 'DEGRADED', 
            message: 'Database Manager not initialized' 
        });
    }
});

/**
 * 🚀 ROOT ENDPOINT - SOFTWARE DT STANDARD
 * Mantiene la identidad técnica del Security Cluster
 */
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'Operational', 
    service: 'Emerald DT Security Cluster',
    mode: 'Atomic-Proof/Standalone',
    engineer: 'Software DT',
    version: "1.0.0"
  });
});

/**
 * 💥 GLOBAL ERROR HANDLER (L6 Practice)
 * Captura fallos en el pipeline, audita accesos comprometidos y evita fugas de información.
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const authReq = req as AuthenticatedRequest; // Casteo seguro al flujo de identidad
    
    // Log avanzado con auditoría de procedencia del error
    const userContext = authReq.user ? `[User ID: ${authReq.user.uid} | Role: ${authReq.user.role}]` : '[Unauthenticated Request]';
    console.error(`\x1b[31m[Critical Error] ${userContext}: ${err.message}\x1b[0m`);
    
    res.status(statusCode).json({
        status: 'CRITICAL_ERROR',
        message: err.message || 'Internal Server Fault',
        stack: process.env.NODE_ENV === 'production' ? '🛡️' : err.stack
    });
});

export default app;