import { z } from 'zod';

/**
 * 🛡️ IDENTITY VALIDATION SCHEMAS - OMEGA CLUSTER
 * Escudos Zod para la verificación y sanitización de credenciales en la frontera de red.
 */

export const registerSchema = z.object({
    body: z.object({
        name: z.string()
            .min(2, 'Name must be at least 2 characters long')
            .max(70, 'Name exceeds safe data length')
            .trim(),
        
        email: z.string()
            .email('Invalid corporate or personal email address')
            .lowercase()
            .trim(),
        
        password: z.string()
            .min(8, 'Password must be at least 8 characters long')
            .max(100, 'Password exceeds secure buffering limits'),
        
        role: z.enum(['SUPER_ADMIN', 'EMPLOYEE', 'CLIENT'])
            .optional()
            .default('CLIENT')
    })
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string()
            .email('Invalid credential format')
            .lowercase()
            .trim(),
        
        password: z.string()
            .min(1, 'Password identification is required')
    })
});

/**
 * ⚡ TYPE INFERENCE (L6)
 * Exportación de contratos de tipado estricto inferidos directamente desde la forma del Body.
 */
export type RegisterInput = z.infer<typeof registerSchema.shape.body>;
export type LoginInput = z.infer<typeof loginSchema.shape.body>;