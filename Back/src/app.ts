import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions.js';

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

// Root Endpoint
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