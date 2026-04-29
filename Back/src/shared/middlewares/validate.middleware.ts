import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

/**
 * 🛡️ VALIDATION SHIELD - INDUSTRIAL GRADE (L6)
 * Multi-layer interceptor for Body, Query, and Params.
 * Powered by Software DT Security Standards.
 */
export const validate = (schema: AnyZodObject) => 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            /**
             * ATOMIC VALIDATION & STRIPPING
             * parseAsync no solo valida, sino que retorna el objeto limpio 
             * eliminando campos no definidos en el esquema (Seguridad L6).
             */
            const validatedData = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            // Reinyectamos la data purificada en el request
            req.body = validatedData.body;
            req.query = validatedData.query;
            req.params = validatedData.params;

            return next();
        } catch (error) {
            // Manejo de errores específicos de Zod
            if (error instanceof ZodError) {
                const errorDetails = error.errors.map(err => ({
                    location: err.path[0], // Indica si falló body, query o params
                    field: err.path.slice(1).join('.'),
                    message: err.message,
                    code: err.code.toUpperCase()
                }));

                const gold = '\x1b[33m';
                const reset = '\x1b[0m';
                console.warn(`${gold}[Zod Shield]:${reset} Intento de escritura bloqueado por integridad de datos.`);

                return res.status(400).json({
                    status: 'VALIDATION_FAILED',
                    origin: 'LA_CONSTRICTOR_SHIELD',
                    timestamp: new Date().toISOString(),
                    errors: errorDetails
                });
            }

            /**
             * ⚠️ CRITICAL FAILURE 
             * Error inesperado en el motor de validación.
             */
            console.error('\x1b[31m[Critical Validation Fault]:\x1b[0m', error);
            return res.status(500).json({
                status: 'INTERNAL_VALIDATION_ERROR',
                message: 'Internal infrastructure fault during data integrity check.'
            });
        }
    };