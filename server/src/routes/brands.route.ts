import { Router, type Router as ExpressRouter } from "express";
import {
    handleCreateBrand,
    handleGetBrands,
} from "../controllers/brands.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { createCategorySchema } from "../schema/category.schema";

const brandsRouter: ExpressRouter = Router();

brandsRouter.use(authenticate);
brandsRouter.get("/", handleGetBrands);
brandsRouter.post(
    "/",
    validateRequest(createCategorySchema),
    handleCreateBrand,
);

export default brandsRouter;
