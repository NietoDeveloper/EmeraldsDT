import { z } from 'zod';

/**
 * 🛡️ FRONT-END VALIDATION SHIELD (LEVEL L5)
 * Réplica exacta de las restricciones del Back-End para mitigar peticiones basura.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required // Correo requerido' })
    .email({ message: 'Invalid email address // Correo inválido' })
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters // Mínimo 6 caracteres' })
});

export type LoginInput = z.infer<typeof loginSchema>;