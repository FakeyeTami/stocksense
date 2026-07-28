import { Router, type Router as ExpressRouter } from "express";
import {
    handleCreateProduct,
    handleDeleteProduct,
    handleGetProduct,
    handleGetProducts,
    handleUpdateProduct,
} from "../controllers/products.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import {
    createProductSchema,
    updateProductSchema,
} from "../schema/product.schema";

const productsRouter: ExpressRouter = Router();

productsRouter.use(authenticate);

productsRouter.get("/", handleGetProducts);

productsRouter.get("/:id", handleGetProduct);

productsRouter.post(
    "/",
    validateRequest(createProductSchema),
    handleCreateProduct,
);

productsRouter.put(
    "/:id",
    validateRequest(updateProductSchema),
    handleUpdateProduct,
);

productsRouter.delete("/:id", handleDeleteProduct);

export default productsRouter;
