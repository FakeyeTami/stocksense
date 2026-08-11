import slugify from "slugify";
import { db } from "../config/db";

export const getCategories = async (shopId: string) => {
    const categories = await db.category.findMany({
        where: { shopId },
        select: { id: true, name: true },
    });

    return categories.map(({ ...category }) => category);
};

export const createCategory = async (shopId: string, name: string) => {
    const existing = await db.category.findFirst({ where: { shopId, name } });
    if (existing) throw new Error("Category already exists");

    return db.category.create({
        data: {
            name,
            slug: slugify(name, { lower: true, strict: true }),
            shopId,
        },
        select: { id: true, name: true },
    });
};
