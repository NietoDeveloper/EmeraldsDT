import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions.js';
import { dbManager } from './config/database'; 

// Inyección de rutas de dominio
import emeraldRoutes from './modules/emeralds/emerald.routes';

const app: Application = express();

// Security & Logging
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
app.use('/api/v1/emeralds', emeraldRoutes);

/**
 * 🛠️ HEALTH CHECK (Nivel S+)
 * Monitoreo en tiempo real de la infraestructura Core
 */
app.get('/api/health', (req: Request, res: Response) => {
    try {
        const { public: publicDB, secure: secureDB } = dbManager.getConnections();
        
        res.status(200).json({ 
