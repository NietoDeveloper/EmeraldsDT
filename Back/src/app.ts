import express, { Application, Request, Response } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions.js';
import { dbManager } from './config/database'; 

// Inyección de rutas de dominio
import emeraldRoutes from './modules/emeralds/emerald.routes';

const app: Application = express();

// 1. Security & Logging
// Nota: CSP desactivado para permitir carga de imágenes locales en el Dashboard
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 2. Parsers & Active Storage Access
app.use(express.json({ limit: '20mb' })); // Incrementado para assets de alta calidad
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * 🐍 LA CONSTRICTOR - STATIC ASSET DELIVERY
 * Expone la carpeta de archivos para que las esmeraldas y certificados 
 * sean visibles vía URL en el Laboratory y en el Dashboard.
 */
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 3. Domain API Routes
app.use('/api/v1/emeralds', emeraldRoutes);

/**
 * 🛠️ HEALTH CHECK (Nivel S+)
 * Monitoreo en tiempo real de la infraestructura Core
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
 * Mantiene la identidad técnica del Security Cluster.
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

export default app;