"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { AxiosError } from "axios";
import Link from "next/link";

const RegisterFormSchema = z
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

type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormSchema>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterFormSchema) => {
        try {
            const response = await api.post("/api/v1/auth/register", data);
            toast("Registered successfully", {
                description: `Welcome ${data.firstName}!`,
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;

            toast("Registration failed", {
                description:
                    axiosError.response?.data?.message ||
                    "Something went wrong",
            });
        }
    };

    return (
        <main className="max-w-lg mx-auto py-10">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="font-bold text-lg">
                        Create a new account
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                        Manage your business with ease
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <FieldGroup>
                            <div className="grid grid-cols-2 gap-3">
                                <Field data-invalid={!!errors.firstName}>
                                    <FieldLabel htmlFor="firstName">
                                        First Name
                                    </FieldLabel>
                                    <Input
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        autoComplete="given-name"
                                        disabled={isSubmitting}
                                        {...register("firstName")}
                                    />
                                    {errors.firstName && (
                                        <FieldError
                                            errors={[errors.firstName]}
                                        />
                                    )}
                                </Field>

                                <Field data-invalid={!!errors.lastName}>
                                    <FieldLabel htmlFor="lastName">
                                        Last Name
                                    </FieldLabel>
                                    <Input
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        autoComplete="family-name"
                                        disabled={isSubmitting}
                                        {...register("lastName")}
                                    />
                                    {errors.lastName && (
                                        <FieldError
                                            errors={[errors.lastName]}
                                        />
                                    )}
                                </Field>
                            </div>

                            <Field data-invalid={!!errors.email}>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    disabled={isSubmitting}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <FieldError errors={[errors.email]} />
                                )}
                            </Field>

                            <Field data-invalid={!!errors.password}>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    autoComplete="password"
                                    disabled={isSubmitting}
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <FieldError errors={[errors.password]} />
                                )}
                            </Field>

                            <Field data-invalid={!!errors.confirmPassword}>
                                <FieldLabel htmlFor="confirmPassword">
                                    Confirm Password
                                </FieldLabel>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    autoComplete="password"
                                    disabled={isSubmitting}
                                    {...register("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <FieldError
                                        errors={[errors.confirmPassword]}
                                    />
                                )}
                            </Field>
                        </FieldGroup>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-5 mt-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating account..." : "Sign Up"}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="underling hover:text-primary"
                            >
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </main>
    );
}
