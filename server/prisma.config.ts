import * as dotenv from "dotenv";
import type { PrismaConfig } from "prisma";

dotenv.config();

export default {
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: "postgresql://postgres:tamicodes@localhost:5432/stocksense",
    },
} satisfies PrismaConfig;
