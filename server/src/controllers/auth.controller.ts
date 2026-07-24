import { NextFunction, Request, Response } from "express";
import { authenticateUser, registerNewUser } from "../services/auth.service";

export const handleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const data = req.body;
        const { token, user } = await authenticateUser(data);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.status(200).json({ message: "Login Successful", user });
    } catch (error) {
        next(error);
    }
};

export const handleRegister = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const data = req.body;
        const { token } = await registerNewUser(data);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.status(200).json({ message: "Registered Successfully" });
    } catch (error) {
        next(error);
    }
};

export const handleLogout = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};
