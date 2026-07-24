"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { AxiosError } from "axios";

const loginFormSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function Login() {
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
            const response = await api.post("/api/v1/auth/login", data);
            toast("Login successfully", {
                description: `Welcome Back ${response.data.firstName}!`,
            });
            return response.data;
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
        <main className="max-w-lg mx-auto py-10">
            <Card>
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
                        <FieldGroup>
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
                                className="underling hover:text-primary"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </main>
        // <main className="min-h-screen flex items-center justify-center bg-gray-50">
        //     <Card className="w-full max-w-4xl min-h-[480px] flex flex-row justify-center items-center overflow-hidden">
        //         {/* Left Side */}
        //         <div className="flex-1 flex flex-col justify-center space-y-8">
        //             <CardHeader>
        //                 <CardTitle className="text-3xl font-semibold">
        //                     Sign In
        //                 </CardTitle>
        //                 <CardDescription className="text-base">
        //                     Login to stay connected
        //                 </CardDescription>
        //             </CardHeader>

        //             <CardContent>
        //                 <form
        //                     id="sign-in-form"
        //                     className="space-y-4"
        //                     onSubmit={form.handleSubmit(onSubmit)}
        //                 >
        //                     <FieldGroup className="flex flex-col space-y-0.5">
        //                         {/* Email */}
        //                         <Field>
        //                             <Input
        //                                 id="email"
        //                                 type="email"
        //                                 placeholder="Email"
        //                                 aria-label="Email"
        //                                 autoComplete="email"
        //                                 aria-invalid={
        //                                     !!form.formState.errors.email
        //                                 }
        //                                 {...form.register("email")}
        //                             />
        //                             {form.formState.errors.email && (
        //                                 <FieldError
        //                                     errors={[
        //                                         form.formState.errors.email,
        //                                     ]}
        //                                 />
        //                             )}
        //                         </Field>

        //                         <Field>
        //                             <Input
        //                                 id="password"
        //                                 type="password"
        //                                 placeholder="Password"
        //                                 aria-label="Password"
        //                                 autoComplete="current-password"
        //                                 aria-invalid={
        //                                     !!form.formState.errors.password
        //                                 }
        //                                 {...form.register("password")}
        //                             />
        //                             {form.formState.errors.password && (
        //                                 <FieldError
        //                                     errors={[
        //                                         form.formState.errors.password,
        //                                     ]}
        //                                 />
        //                             )}
        //                         </Field>
        //                     </FieldGroup>
        //                 </form>
        //             </CardContent>

        //             <CardFooter className="flex-col space-y-4">
        //                 <Button
        //                     type="submit"
        //                     form="sign-in-form"
        //                     className="w-full"
        //                 >
        //                     Sign In
        //                 </Button>
        //                 <div className="flex flex-row justify-between items-center w-full">
        //                     <Link href="./page.tsx" className="text-blue-400">
        //                         Forgot Password?
        //                     </Link>
        //                     <span>
        //                         Don&apos;t have an Account?{" "}
        //                         <Link
        //                             href="../register"
        //                             className="text-blue-400"
        //                         >
        //                             Sign Up
        //                         </Link>
        //                     </span>
        //                 </div>
        //             </CardFooter>
        //         </div>

        //         {/* Right Side Image */}
        //         <div className="hidden md:flex flex-1 items-center justify-center">
        //             <Image
        //                 src="/assets/images/login.png"
        //                 width={318}
        //                 height={344}
        //                 className="object-contain"
        //                 alt="Login Image"
        //             />
        //         </div>
        //     </Card>
        // </main>
    );
}
