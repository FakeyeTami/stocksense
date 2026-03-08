import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
export const db = new PrismaClient({ adapter });

export const connectDB = async (): Promise<void> => {
    try {
        await db.$connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};
