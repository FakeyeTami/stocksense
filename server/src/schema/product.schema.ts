import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().max(300).optional(),
    model: z.string().max(16).optional(),

    categoryId: z.string("Invalid category"),
    supplierId: z.string("Invalid supplier").optional(),
    brandId: z.string("Invalid brand").optional(),

    costPrice: z.coerce.number().positive("Cost price required"),
    sellingPrice: z.coerce.number().positive("Selling price required"),

    stock: z.coerce.number().int().min(0).max(99999),
    lowStockAlert: z.coerce.number().int().min(0).default(10),
    available: z.boolean().default(true),

    sku: z.string().min(1, "SKU is required"),
    taxRate: z.coerce.number().min(0).max(100).optional(),
    expiryDate: z.string().optional(),
    warranty: z.string().max(100).optional(),
    hsnCode: z.string().max(20).optional(),
    returnPolicy: z
        .enum([
            "NOT_RETURNABLE",
            "7_DAYS",
            "10_DAYS",
            "30_DAYS",
            "REPLACEMENT_ONLY",
        ])
        .optional(),
});

export const updateProductSchema = createProductSchema.partial();
