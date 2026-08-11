import slugify from "slugify";
import { db } from "../config/db";

export const getProducts = async (shopId: string) => {
    const products = await db.product.findMany({
        where: { shopId },
        include: {
            category: true,
            brand: true,
            supplier: true,
            images: true,
        },
    });

    if (!products) throw new Error("You have no Products, Please create one");

    return products.map(({ ...product }) => product);
};

export const getProduct = async (id: string, shopId: string) => {
    const product = await db.product.findFirst({
        where: {
            id,
            shopId,
        },
        include: {
            category: true,
            brand: true,
            supplier: true,
            images: true,
        },
    });

    if (!product) throw new Error("Product not found");

    return product;
};

export const createProduct = async (data: any & { shopId: string }) => {
    const existing = await db.product.findFirst({
        where: { sku: data.sku, shopId: data.shopId },
    });

    if (existing) {
        throw new Error("A product with this SKU already exists");
    }

    const product = await db.product.create({
        data: {
            name: data.name,
            slug: slugify(data.name, { lower: true, strict: true }), // ← add this
            description: data.description || undefined,
            categoryId: data.categoryId,
            supplierId: data.supplierId || undefined,
            brandId: data.brandId || undefined,
            costPrice: data.costPrice, // ← not constPrice
            sellingPrice: data.sellingPrice,
            stock: data.stock,
            lowStockAlert: data.lowStockAlert,
            available: data.available,
            sku: data.sku,
            taxRate: data.taxRate || undefined,
            expiryDate: data.expiryDate || undefined,
            warranty: data.warranty || undefined,
            hsnCode: data.hsnCode || undefined,
            returnPolicy: data.returnPolicy || undefined,
            shopId: data.shopId,
        },
        include: {
            category: true,
            brand: true,
            supplier: true,
        },
    });

    return product;
};

export const updateProduct = async (id: string, shopId: string, data: any) => {
    const product = await db.product.findFirst({ where: { id, shopId } });
    if (!product) return null;

    return db.product.update({
        where: { id },
        data,
        include: {
            category: true,
            brand: true,
            supplier: true,
            images: true,
        },
    });
};

export const deleteProduct = async (id: string, shopId: string) => {
    const product = await db.product.findFirst({ where: { id, shopId } });

    if (!product) throw new Error("Product not found");

    await db.product.delete({ where: { id } });
};
