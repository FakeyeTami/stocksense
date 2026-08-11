// components/products/product-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import { CreatableSelect } from "@/components/ui/creatable-select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { createBrand } from "@/lib/api/brands";
import { createCategory } from "@/lib/api/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../ui/separator";

// ── Schema ─────────────────────────────────────────────────
const createProductSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().max(300).optional(),
    categoryId: z.string().min(1, "Category is required"),
    brandId: z.string().optional(),
    supplierId: z.string().optional(),
    sku: z.string().min(1, "SKU is required"),
    costPrice: z.coerce.number().positive("Required"),
    sellingPrice: z.coerce.number().positive("Required"),
    stock: z.coerce.number().int().min(0),
    lowStockAlert: z.coerce.number().int().min(0).default(10),
    available: z.boolean().default(true),
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

type CreateProductInput = z.infer<typeof createProductSchema>;

interface ProductFormProps {
    categories: { id: string; name: string }[];
    brands: { id: string; name: string }[];
    suppliers: { id: string; name: string }[];
}

// ── Component ───────────────────────────────────────────────
export function ProductForm({
    categories,
    brands,
    suppliers,
}: ProductFormProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<CreateProductInput>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            brandId: "",
            supplierId: "",
            sku: "",
            costPrice: 0,
            sellingPrice: 0,
            stock: 0,
            lowStockAlert: 10,
            available: true,
            taxRate: undefined,
            expiryDate: "",
            warranty: "",
            hsnCode: "",
            returnPolicy: undefined,
        },
    });

    const onSubmit = async (data: CreateProductInput) => {
        try {
            setError(null);
            await api.post("/api/v1/products", data);
            router.push("/dashboard/products");
            router.refresh();
        } catch (err: any) {
            setError(err.response?.data?.message ?? "Failed to create product");
        }
    };

    const isSubmitting = form.formState.isSubmitting;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-md">
                        {error}
                    </p>
                )}

                {/* ── Product Information ──────────────────── */}
                <section className="bg-white border rounded-lg p-5 space-y-4">
                    <h2 className="text-sm font-semibold">
                        Product Information
                    </h2>

                    <Separator />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter product name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Description
                                    <span className="text-muted-foreground font-normal ml-1">
                                        (optional)
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter product description"
                                        className="resize-none"
                                        rows={3}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <CreatableSelect
                                            options={categories}
                                            value={field.value ?? ""}
                                            onChange={field.onChange}
                                            placeholder="Select or create"
                                            onCreate={createCategory}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="brandId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Brand
                                        <span className="text-muted-foreground font-normal ml-1">
                                            (optional)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <CreatableSelect
                                            options={brands}
                                            value={field.value ?? ""}
                                            onChange={field.onChange}
                                            placeholder="Select or create"
                                            onCreate={createBrand}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </section>

                {/* ── Pricing & Stock ──────────────────────── */}
                <section className="bg-white border rounded-lg p-5 space-y-4">
                    <h2 className="text-sm font-semibold">Pricing & Stock</h2>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="sellingPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Selling Price</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                £
                                            </span>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder="0.00"
                                                className="pl-7"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="costPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cost Price</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                £
                                            </span>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder="0.00"
                                                className="pl-7"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lowStockAlert"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Low Stock Alert
                                        <span className="text-muted-foreground font-normal ml-1">
                                            (default 10)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="0"
                                            placeholder="10"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Available toggle */}
                    <FormField
                        control={form.control}
                        name="available"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-md border px-4 py-3">
                                <div>
                                    <FormLabel className="text-sm font-medium">
                                        Available for sale
                                    </FormLabel>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Product will be visible and purchasable
                                    </p>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </section>

                {/* ── Advanced Settings ────────────────────── */}
                <section className="bg-white border rounded-lg p-5 space-y-4">
                    <h2 className="text-sm font-semibold">Advanced Settings</h2>

                    <Separator />

                    <div className="grid grid-cols-4 gap-4">
                        <FormField
                            control={form.control}
                            name="sku"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>SKU</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="SKU"
                                            className="font-mono"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="taxRate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tax Rate (%)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="0.1"
                                            placeholder="18"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Expiry Date
                                        <span className="text-muted-foreground font-normal ml-1">
                                            (optional)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="warranty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Warranty
                                        <span className="text-muted-foreground font-normal ml-1">
                                            (optional)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. 1 year manufacturer"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="hsnCode"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>
                                        HSN Code
                                        <span className="text-muted-foreground font-normal ml-1">
                                            (optional)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter HSN code"
                                            className="font-mono"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="supplierId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Supplier
                                        <span className="text-muted-foreground font-normal ml-1">
                                            (optional)
                                        </span>
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select supplier" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {suppliers.map((s) => (
                                                <SelectItem
                                                    key={s.id}
                                                    value={s.id}
                                                >
                                                    {s.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="returnPolicy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Return Policy
                                        <span className="text-muted-foreground font-normal ml-1">
                                            (optional)
                                        </span>
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="NOT_RETURNABLE">
                                                Not returnable
                                            </SelectItem>
                                            <SelectItem value="7_DAYS">
                                                7 days return
                                            </SelectItem>
                                            <SelectItem value="10_DAYS">
                                                10 days return
                                            </SelectItem>
                                            <SelectItem value="REPLACEMENT_ONLY">
                                                Replacement only
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className=" flex flex-row-reverse jus items-center gap-3 pb-6">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create product"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    </div>
                </section>
            </form>
        </Form>
    );
}
