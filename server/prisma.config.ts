import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import type { PrismaConfig } from "prisma";

export default {
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: process.env.DATABASE_URL!,
    },
} satisfies PrismaConfig;
