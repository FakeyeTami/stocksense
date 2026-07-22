import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().max(300).optional(),
    model: z.string().max(16).optional(),

    categoryId: z.string().cuid("Invalid category"),
    supplierId: z.string().cuid("Invalid supplier").optional(),
    brandId: z.string().cuid("Invalid brand").optional(),

    costPrice: z.number().positive("Cost price required"),
    sellingPrice: z.number().positive("Selling price required"),

    stock: z.number().int().min(0).max(99999),
    lowStockAlert: z.number().int().min(0).default(10),
    available: z.boolean().default(true),

    sku: z.string().min(1, "SKU is required"),
    taxRate: z.number().min(0).max(100).optional(),
    expiryDate: z.string().datetime().optional(),
    warranty: z.string().max(100).optional(),
    hsnCode: z.string().max(20).optional(),
    returnPolicy: z.string().max(500).optional(),
});

export const updateProductSchema = createProductSchema.partial();
