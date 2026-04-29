import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

/**
 * 🛡️ VALIDATION MIDDLEWARE - NIVEL L5
 * Interceptor genérico de esquemas para el pipeline de Emerald DT.
 */
export const validate = (schema: AnyZodObject) => 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validamos body, query y params según el esquema
            await schema.parseAsync(req.body);


            // Error inesperado
            return res.status(500).json({
                status: 'INTERNAL_VALIDATION_ERROR',
                message: 'Ocurrió un fallo inesperado en el proceso de validación.'
            });
        }
    };