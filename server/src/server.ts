import express from "express";
import prisma from "../lib/db";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
});
