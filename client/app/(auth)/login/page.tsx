"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";

const loginFormSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login() {
    const { setUser } = useAuthStore();
    const router = useRouter();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await api.post("/api/v1/auth/login", data);
            setUser(response.data.user);
            toast("Login successful", {
                description: `Welcome back ${response.data.user.firstName}!`,
            });
            router.push("../../dashboard");
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
                <div className="flex-1 flex flex-col justify-center space-y-8">
                    <CardHeader>
                        <CardTitle className="text-3xl font-semibold">
                            Sign In
                        </CardTitle>
                        <CardDescription className="text-base">
                            Login to stay connected
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            id="sign-in-form"
                            className="space-y-4"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FieldGroup className="flex flex-col space-y-0.5">
                                {/* Email */}
                                <Field>
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

                                <Field>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        autoComplete="current-password"
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
                            </FieldGroup>
                        </form>
                    </CardContent>

                    <CardFooter className="flex-col space-y-4">
                        <Button
                            type="submit"
                            form="sign-in-form"
                            className="w-full"
                        >
                            Sign In
                        </Button>
                        <div className="flex flex-row justify-between items-center w-full">
                            <Link href="./page.tsx" className="text-blue-400">
                                Forgot Password?
                            </Link>
                            <span>
                                Don&apos;t have an Account?{" "}
                                <Link
                                    href="../register"
                                    className="text-blue-400"
                                >
                                    Sign Up
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
