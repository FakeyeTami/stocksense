// lib/api/categories.ts
import api from "@/lib/api";

export const createBrand = async (name: string) => {
    const res = await api.post("/api/v1/brands", { name });
    return res.data;
};
