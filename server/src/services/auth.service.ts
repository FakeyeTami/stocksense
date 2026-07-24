// services/auth.service.ts
import * as bcrypt from "bcrypt";
import slugify from "slugify";
import { db } from "../config/db";
import { LoginInput, RegisterInput } from "../schema/auth.schema";
import { generateAuthToken } from "../utils/generateAuthToken";

export const authenticateUser = async (data: LoginInput) => {
    const user = await db.user.findUnique({
        where: { email: data.email },
        include: { ownedShops: true },
    });
    if (!user) throw new Error("Invalid credentials");

    if (!user.hashedPassword) throw new Error("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(
        data.password,
        user.hashedPassword,
    );
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const shop = user.ownedShops[0];
    if (!shop) throw new Error("No shop found for this account");

    const token = generateAuthToken({
        userId: user.id,
        shopId: shop.id,
        role: user.role,
    });

    const { hashedPassword: _, ...safeUser } = user;

    return { token, user: safeUser, shop };
};

export const registerNewUser = async (data: RegisterInput) => {
    const existingUser = await db.user.findUnique({
        where: { email: data.email },
    });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    // transaction now returns user and shop
    const { user, shop } = await db.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                hashedPassword,
                role: "OWNER",
            },
        });

        const shop = await tx.shop.create({
            data: {
                name: "My Shop",
                slug: slugify(`shop-${user.id}`, {
                    lower: true,
                    strict: true,
                }),
                adminId: user.id,
            },
        });

        return { user, shop };
    });

    const token = generateAuthToken({
        userId: user.id,
        shopId: shop.id,
        role: user.role,
    });

    const { hashedPassword: _, ...safeUser } = user;

    return { token, user: safeUser, shop };
};
