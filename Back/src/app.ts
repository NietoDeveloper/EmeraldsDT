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
