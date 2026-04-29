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
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // Formateamos los errores para que sean legibles por el Front/Dashboard
                const errorDetails = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));

                return res.status(400).json({
                    status: 'VALIDATION_FAILED',
                    origin: 'ZOD_SHIELD',
                    errors: errorDetails
                });
            }

            // Error inesperado
            return res.status(500).json({
                status: 'INTERNAL_VALIDATION_ERROR',
                message: 'Ocurrió un fallo inesperado en el proceso de validación.'
            });
        }
    };