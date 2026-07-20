import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(3),
    description: z.string().max(300),
    brand: z.string().max(16),
    model: z.string().max(16),
    category: z.string(),
    costPrice: z.number(),
    sellingPrice: z.number(),
});
