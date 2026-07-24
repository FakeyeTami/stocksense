import { Request, Response, NextFunction } from "express"
import { Jwt } from "jsonwebtoken";

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) return res.status(401).json({message: "Unauthorized - No token"})

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({})
        }
    }
}
