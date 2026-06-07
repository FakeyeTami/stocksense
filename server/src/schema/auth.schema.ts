import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(3).max(16),
    lastName: z.string().min(3).max(16),
    email: z.string().email("Please enter a valid email."),
    phoneNo: z.string().min(10, "Please enter a valid phone number."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8),
});

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

// free TypeScript types from your schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
