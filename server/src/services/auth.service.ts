import * as bcrypt from "bcrypt";
import { db } from "../config/db";
import { generateAuthToken } from "../utils/generateAuthToken";

export const authenticateUser = async (email: string, password: string) => {
    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (!existingUser || !existingUser.hashedPassword)
        throw new Error("User does not exist");

    const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.hashedPassword,
    );

    if (!isPasswordValid) {
        throw new Error("Email and or Password is Incorrect");
    }

    const token = generateAuthToken(existingUser.id);

    const { hashedPassword: _removed, ...sanitizedUser } = existingUser;

    return {
        message: "Login successfully",
        token,
        user: sanitizedUser,
    };
};

export const registerNewUser = async (
    firstName: string,
    lastName: string,
    phoneNo: string,
    email: string,
    password: string,
) => {
    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.user.create({
        data: {
            firstName,
            lastName,
            email,
            phoneNo,
            hashedPassword,
        },
    });

    const token = generateAuthToken(user.id);

    return {
        message: "Registered successfully",
        token,
    };
};
