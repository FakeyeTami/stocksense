import { Router, type Router as ExpressRouter } from "express";
import {
    handleCreateProduct,
    handleDeleteProducts,
    handleGetProduct,
    handleGetProducts,
    handleUpdateProduct,
} from "../controllers/products.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import {
    createProductSchema,
    updateProductSchema,
} from "../schema/product.schema";

const productsRouter: ExpressRouter = Router();

productsRouter.use();

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

productsRouter.delete("/:id", handleDeleteProducts);

export default productsRouter;
