import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import authRouter from "./routes/auth.route";
import productsRouter from "./routes/products.route";

// app config
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    }),
);
connectDB();

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);

app.get("/health", (_req: any, res: any) => {
    res.json({ status: "ok" });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
