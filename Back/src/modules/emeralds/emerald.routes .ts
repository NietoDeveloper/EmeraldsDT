import { Router, Request, Response, NextFunction } from 'express';
import { 
    createEmerald, 
    getAllEmeralds, 
    getEmeraldBySlug, 
    updateEmerald,
    deleteEmerald 
} from './emerald.controller.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
import { emeraldSchema, updateEmeraldSchema } from './emerald.schema.js';

/**
 * 🛠️ ASYNC WRAPPER - SOFTWARE DT STANDARD
 * Asegura que los errores de los controladores lleguen al Global Error Handler.
 */
const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
