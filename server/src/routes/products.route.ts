import { Router, type Router as ExpressRouter } from "express";
import { getProducts } from "../controllers/products.controller";

const productsRouter: ExpressRouter = Router();

productsRouter.get("/", getProducts);

export default productsRouter;
