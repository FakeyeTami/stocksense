import slugify from "slugify";
import z from "zod";
import { db } from "../config/db";
import { authenticate } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";

// routes/category.route.ts
categoriesRouter.use(authenticate);
categoriesRouter.get("/", handleGetCategories);
categoriesRouter.post(
    "/",
    validateRequest(createCategorySchema),
    handleCreateCategory,
);

// schema
export const createCategorySchema = z.object({
    name: z.string().min(1, "Name is required").max(50),
});

// service
export const createCategory = async (shopId: string, name: string) => {
    const existing = await db.category.findFirst({ where: { shopId, name } });
    if (existing) throw new ConflictError("Category already exists");

    return db.category.create({
        data: {
            name,
            slug: slugify(name, { lower: true, strict: true }),
            shopId,
        },
        select: { id: true, name: true }, // only return what the form needs
    });
};
