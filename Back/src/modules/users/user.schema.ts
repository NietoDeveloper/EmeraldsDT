import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2, 'Name must be at least 2 characters long'),
        email: z.string().email('Invalid industrial email address'),
        password: z.string().min(8, 'Password must be minimum 8 characters and include high complexity'),
        role: z.enum(['SUPER_ADMIN', 'EMPLOYEE', 'CLIENT']).optional()
    })
});

export const loginSchema = z.object({



    })
});