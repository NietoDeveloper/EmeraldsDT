import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions.js';

const app: Application = express();

// Security & Logging
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Root Endpoint
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ 
    message: "Emerald DT API - Security Cluster Active",
    version: "1.0.0"
  });
});

export default app;