import { z } from 'zod';
ar peticiones basura.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required // Correequerido' })
    .email({ message: 'Invalid email address // Correo inválido' })
    .toLowerCase(),
  password: z

    .min(6, { message: 'Password must be at least 6 characters // Mínimo 6 caracteres' })
});

export type LoginInput = z.infer<typeof loginSchema>;