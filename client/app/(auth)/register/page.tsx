"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
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
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";

const RegisterFormSchema = z
    .object({
        firstName: z.string().min(3).max(16),
        lastName: z.string().min(3).max(16),
        email: z.string().email("Please enter a valid email."),
        phoneNo: z.string().min(10, "Please enter a valid phone number."),
        password: z.string().min(8, "Password must be at least 8 characters."),
        confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;

export default function Register() {
    const form = useForm<RegisterFormSchema>({
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
        } catch (error: any) {
            toast("Login failed", {
                description:
                    error.response?.data?.message || "Something went wrong",
            });
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-4xl min-h-[480px] flex flex-row justify-center items-center overflow-hidden">
                {/* Left Side */}
                <div className="flex-1 flex flex-col justify-center space-y-10">
                    <CardHeader>
                        <CardTitle className="text-3xl font-semibold">
                            Sign Up
                        </CardTitle>
                        <CardDescription className="text-base">
                            Create your Stocksense account.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            id="sign-up-form"
                            className="space-y-2"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FieldGroup className="grid grid-cols-2 gap-6">
                                <Field
                                    data-invalid={
                                        !!form.formState.errors.firstName
                                    }
                                >
                                    <Input
                                        id="firstName"
                                        placeholder="First name"
                                        aria-label="First name"
                                        aria-invalid={
                                            !!form.formState.errors.firstName
                                        }
                                        {...form.register("firstName")}
                                    />
                                    {form.formState.errors.firstName && (
                                        <FieldError
                                            errors={[
                                                form.formState.errors.firstName,
                                            ]}
                                        />
                                    )}
                                </Field>

                                <Field
                                    data-invalid={
                                        !!form.formState.errors.lastName
                                    }
                                >
                                    <Input
                                        id="lastName"
                                        placeholder="Last name"
                                        aria-label="Last name"
                                        aria-invalid={
                                            !!form.formState.errors.lastName
                                        }
                                        {...form.register("lastName")}
                                    />
                                    {form.formState.errors.lastName && (
                                        <FieldError
                                            errors={[
                                                form.formState.errors.lastName,
                                            ]}
                                        />
                                    )}
                                </Field>

                                <Field
                                    data-invalid={!!form.formState.errors.email}
                                >
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        aria-label="Email"
                                        autoComplete="email"
                                        aria-invalid={
                                            !!form.formState.errors.email
                                        }
                                        {...form.register("email")}
                                    />
                                    {form.formState.errors.email && (
                                        <FieldError
                                            errors={[
                                                form.formState.errors.email,
                                            ]}
                                        />
                                    )}
                                </Field>

                                <Field
                                    data-invalid={
                                        !!form.formState.errors.phoneNo
                                    }
                                >
                                    <Input
                                        id="phoneNo"
                                        type="tel"
                                        placeholder="Phone number"
                                        aria-label="Phone number"
                                        autoComplete="tel"
                                        aria-invalid={
                                            !!form.formState.errors.phoneNo
                                        }
                                        {...form.register("phoneNo")}
                                    />
                                    {form.formState.errors.phoneNo && (
                                        <FieldError
                                            errors={[
                                                form.formState.errors.phoneNo,
                                            ]}
                                        />
                                    )}
                                </Field>

                                <Field
                                    data-invalid={
                                        !!form.formState.errors.password
                                    }
                                >
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        autoComplete="new-password"
                                        aria-invalid={
                                            !!form.formState.errors.password
                                        }
                                        {...form.register("password")}
                                    />
                                    {form.formState.errors.password && (
                                        <FieldError
                                            errors={[
                                                form.formState.errors.password,
                                            ]}
                                        />
                                    )}
                                </Field>

                                <Field
                                    data-invalid={
                                        !!form.formState.errors.confirmPassword
                                    }
                                >
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm password"
                                        aria-label="Confirm password"
                                        autoComplete="new-password"
                                        aria-invalid={
                                            !!form.formState.errors
                                                .confirmPassword
                                        }
                                        {...form.register("confirmPassword")}
                                    />
                                    {form.formState.errors.confirmPassword && (
                                        <FieldError
                                            errors={[
                                                form.formState.errors
                                                    .confirmPassword,
                                            ]}
                                        />
                                    )}
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>

                    <CardFooter className="flex-col space-y-4">
                        <Button
                            type="submit"
                            form="sign-up-form"
                            className="w-full"
                        >
                            Sign Up
                        </Button>
                        <div className="flex flex-row justify-between items-center">
                            <span>
                                Already have an account?{" "}
                                <Link href="../login" className="text-blue-400">
                                    Sign In
                                </Link>
                            </span>
                        </div>
                    </CardFooter>
                </div>

                {/* Right Side Image */}
                <div className="hidden md:flex flex-1 items-center justify-center">
                    <Image
                        src="/assets/images/login.png"
                        width={318}
                        height={344}
                        className="object-contain"
                        alt="Login Image"
                    />
                </div>
            </Card>
        </main>
    );
}
