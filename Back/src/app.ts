import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions.js';
import { dbManager } from './config/database'; 

// 🛰️ Inyección de Rutas de Dominio (Cluster Alpha & Omega)
import emeraldRoutes from './modules/emeralds/emerald.routes';
import inventoryRoutes from './modules/inventory/inventory.routes';

const app: Application = express();

// 1. 🛡️ Security & Monitoring Layer
// CSP desactivado para permitir renderizado de assets locales en dashboards
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 2. 🗄️ Data Parsing & Static Assets
app.use(express.json({ limit: '20mb' })); // S+ Rank: Soporte para buffers de alta resolución
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(cookieParser());

/**
 * 🐍 STATIC ASSET DELIVERY
 * Punto de acceso para fotos de esme