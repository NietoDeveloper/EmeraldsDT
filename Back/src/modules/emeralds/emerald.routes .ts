import { Router, Request, Response, NextFunction } from 'express';
import { 
    createEmerald, 
    getAllEmeralds, 
    getEmeraldBySlug, 
    updateEmerald,
    deleteEmerald // Asumimos implementación en controlador para limpieza
} from './emerald.controller.js';

/**
 * 🐍 LA CONSTRICTOR - SECURITY LAYER
 * Protocolo de validación estricta para activos de alto valor.
 * Este middleware actúa como la primera barrera física antes de la DB.
