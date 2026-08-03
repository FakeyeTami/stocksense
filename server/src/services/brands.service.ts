import slugify from "slugify";
import { db } from "../config/db";

export const getBrands = async (shopId: string) => {
    const brands = await db.brand.findMany({
        where: { shopId },
        select: { id: true, name: true },
    });

    return brands.map(({ ...brands }) => brands);
};

export const createBrand = async (shopId: string, name: string) => {
    const existing = await db.brand.findFirst({ where: { shopId, name } });
    if (existing) throw new Error("Brand already exists");

    return db.brand.create({
        data: {
            name,
            slug: slugify(name, { lower: true, strict: true }),
            shopId,
        },
        select: { id: true, name: true },
    });
};
