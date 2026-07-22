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

    return products.map(({ costPrice, ...product }) => product);
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
            ...data,
            constPrice: data.costPrice,
            sellingPrice: data.sellingPrice,
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
