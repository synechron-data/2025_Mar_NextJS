import { z } from 'zod';

export const loginUserSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'Password is required' }).min(1, { message: 'Password is required' })
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;