import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
                /*
                example error:
                { email: ["Invalid email"], password: ["Must be 8 chars"] }
                */
            });
        }

        req.body = result.data; // clean, typed data
        next();
    };
};
