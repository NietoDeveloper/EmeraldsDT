import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 4000;

// Security & Logging
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(morgan('dev')); 
app.use(cors()); 

// Base Middlewares
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Root Endpoint
app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({ 
        status: 'Operational', 
        service: 'Emerald DT Security Cluster',
        mode: 'Atomic-Proof/Standalone',
        engineer: 'Nieto Code'
    });
});

// Emergency Start System
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log('----------------------------------------------------');
            console.log(`🚀 EMERALD DT OPERATIONAL ON PORT: ${PORT}`);
            console.log(`📈 STATUS: Atomic-Proof Start | BOGOTÁ, COLOMBIA`);
            console.log('----------------------------------------------------');
        });
    } catch (err: any) {
        console.error('💥 SYSTEM FAILURE:', err.message);
    }
};

startServer();