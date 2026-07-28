// utils/generateAuthToken.ts
import { Role } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";

export interface TokenPayload {
    userId: string;
    shopId: string;
    role: Role;
}

export const generateAuthToken = (payload: TokenPayload): string => {
    const jwtSecretKey = process.env.JWT_SECRET as Secret;
    if (!jwtSecretKey) throw new Error("JWT_SECRET is not defined");

    return jwt.sign(payload, jwtSecretKey, { expiresIn: "7d" });
};
