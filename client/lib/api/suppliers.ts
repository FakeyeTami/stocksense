import api from "@/lib/api";

export const createSupplier = async (name: string) => {
    const res = await api.post("/api/v1/suppliers", { name });
    return res.data;
};
