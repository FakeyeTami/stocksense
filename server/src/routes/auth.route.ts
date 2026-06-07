import { Router } from "express";
import { validateRequest } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../schema/auth.schema";
import {
    handleLogin,
    handleRegister,
    handleLogout,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), handleRegister);

authRouter.post("/login", validateRequest(loginSchema), handleLogin);

authRouter.post("/logout", handleLogout);

export default authRouter;
