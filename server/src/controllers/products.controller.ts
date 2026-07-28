import { NextFunction, Request, Response } from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from "../services/products.service";

export const handleGetProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const products = await getProducts(req.user!.shopId);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const handleGetProduct = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const product = await getProduct(req.params.id, req.user!.shopId);
        res.status(200).json(product);
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

export const handleUpdateProduct = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const product = await updateProduct(
            req.params.id,
            req.user!.shopId,
            req.body,
        );
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

export const handleDeleteProduct = async (
    req: Request<{ id: string }>,
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
