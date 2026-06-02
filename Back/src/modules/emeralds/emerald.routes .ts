import { Router, Request, Response, NextFunction } from 'express';
import { 
    createEmerald, 
    getAllEmeralds, 
    getEmeraldBySlug, 
    updateEmerald,
    deleteEmerald 
} from './emerald.controller.js';
import { validate } from '../../shared/middlewares/val
};
