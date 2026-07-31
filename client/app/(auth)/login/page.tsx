"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { loginUser } from "@/services/auth";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { LoginFormSchema, loginFormSchema } from "../schema";

export default function Login() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormSchema) => {
        try {
            await loginUser(data);
            toast("Login successful");

            router.push("/dashboard");
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;

            toast("Login failed", {
                description:
                    axiosError.response?.data?.message ||
                    "Something went wrong",
            });
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="font-bold text-lg">
                        Welcome to StockSense
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                        Sign in to access your business dashboard
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <FieldGroup className="space-y-1.5">
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
                        </FieldGroup>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-5 mt-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="underline hover:text-primary"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </main>
    );
}
