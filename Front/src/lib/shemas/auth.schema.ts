import { z } from 'zod';
ar peticiones basura.
 */
export const loginSchema = z.object({
  email: z
    .string()ido' })
   / Mínimo 6 caracteres' })
});

export type LoginInput = z.infer<typeof loginSchema>;