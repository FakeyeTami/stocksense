import * as dotenv from "dotenv";
import * as express from "express";
import * as cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.route";

dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.get("/api/health", (_req: any, res: any) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
