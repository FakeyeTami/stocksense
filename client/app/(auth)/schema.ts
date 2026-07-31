import * as z from "zod";

export const RegisterFormSchema = z
    .object({
        firstName: z.string().min(3).max(16),
        lastName: z.string().min(3).max(16),
        email: z.string().email("Please enter a valid email."),
        password: z.string().min(8, "Password must be at least 8 characters."),
        confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;

export const loginFormSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
