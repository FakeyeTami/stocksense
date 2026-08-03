import { NextFunction, Request, Response } from "express";
import { createBrand, getBrands } from "../services/brands.service";

export const handleGetBrands = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const brands = await getBrands(req.user!.shopId);
        res.status(200).json(brands);
    } catch (error) {
        next(error);
    }
};

export const handleCreateBrand = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const brand = await createBrand(req.user!.shopId, req.body.name);
        res.status(201).json(brand);
    } catch (error) {
        next(error);
    }
};
