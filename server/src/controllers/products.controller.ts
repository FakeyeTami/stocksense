import { NextFunction, Request, Response } from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
} from "../services/products.service";

export const handleGetProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const products = await getProducts(req.user!.shopId);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const handleGetProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const product = await getProduct(req.params.id, req.user!.shopId);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const handleCreateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const product = await createProduct({
            ...req.body,
            shopId: req.user!.shopId,
        });
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

export const handleUpdateProduct = async () => {};

export const handleDeleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await deleteProduct(req.params.id, req.user!.shopId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
