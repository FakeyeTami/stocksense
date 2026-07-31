import api from "@/lib/api";

export const createCategory = async (name: string) => {
    const res = await api.post("/api/v1/categories", { name });
    return res.data;
};
