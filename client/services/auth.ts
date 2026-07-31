import { LoginFormSchema, RegisterFormSchema } from "@/app/(auth)/schema";
import api from "@/lib/api";

export async function registerUser(data: RegisterFormSchema) {
    const response = await api.post("/api/v1/auth/register", data);
    return response.data;
}

export async function loginUser(data: LoginFormSchema) {
    const response = await api.post("/api/v1/auth/login", data);
    return response.data;
}
