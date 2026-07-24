import { Router, type Router as ExpressRouter } from "express";
import {
    handleLogin,
    handleLogout,
    handleRegister,
} from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../schema/auth.schema";

const authRouter: ExpressRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), handleRegister);

authRouter.post("/login", validateRequest(loginSchema), handleLogin);

authRouter.post("/logout", handleLogout);

export default authRouter;
