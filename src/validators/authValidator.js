import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').optional(),
  email: z.email({ pattern: z.regexes.email }, 'Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password should be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.email({ pattern: z.regexes.email }, 'Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export { registerSchema, loginSchema };
