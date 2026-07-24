import { Router, type Router as ExpressRouter } from "express";
import { validateRequest } from "../middlewares/validate.middleware";

const productsRouter: ExpressRouter = Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:id", getProducts);

productsRouter.post("/", validateRequest(), createProduct);

productsRouter.put("/:id", validateRequest(), updateProduct);

productsRouter.delete("/:id", validateRequest(), deleteProduct);

export default productsRouter;
