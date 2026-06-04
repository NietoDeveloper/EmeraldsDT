import { z } from 'zod';

/**
 * 🛡️ USER AUTHENTICATION SCHEMAS - INDUSTRIAL GRADE (L6)
 * Strict validation filters wrapped for Express validation middleware execution.
 */

export const registerSchema = z.object({
  body: z.object({
    name: z.string()
      .min(2, "Name must be at least 2 characters long")
      .max(70, "Name exceeds maximum length limit")
      .trim(),
      
    email: z.string()
      .email("Invalid industrial email address format")
      .lowercase()
      .trim(),
      
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
      
    role: z.enum(['SUPER_ADMIN', 'EMPLOYEE', 'CLIENT'])
      .default('CLIENT')
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string()
      .email("Invalid corporate email address format")
      .lowercase()
      .trim(),
      
    password: z.string()
      .min(1, "Password verification field is mandatory")
  })
});

/**
 * ⚡ TYPE INFERENCE (L6)
 */
export type RegisterInput = z.infer<typeof registerSchema.shape.body>;
export type LoginInput = z.infer<typeof loginSchema.shape.body>;