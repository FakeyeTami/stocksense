// middlewares/auth.middleware.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../utils/generateAuthToken";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!,
        ) as TokenPayload;
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
