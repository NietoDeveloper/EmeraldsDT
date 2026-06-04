import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2, 'Name must be at least 2 characters long'),

        password: z.string().min(8, 'Password must b
    })
});

export const loginSchema = z.object({



    })
});