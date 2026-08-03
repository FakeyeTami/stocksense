import { NextFunction, Request, Response } from "express";
import { createCategory, getCategories } from "../services/category.service";

export const handleGetCategories = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const categories = await getCategories(req.user!.shopId);
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

export const handleCreateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const category = await createCategory(req.user!.shopId, req.body.name);
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};
