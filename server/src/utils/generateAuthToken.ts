import jwt, { Secret } from "jsonwebtoken";

export const generateAuthToken = (userId: string) => {
    const jwtSecretKey = process.env.JWT_SECRET as Secret;

    if (!jwtSecretKey) {
        throw new Error("jwtSecretKey is not defined");
    }

    return jwt.sign({ userId }, jwtSecretKey, {
        expiresIn: "7d",
    });
};
