import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

//generate jwt token

const generateToken = (userId: string, role: string) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, {
        expiresIn: "2h",
    });
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { userId, password, role } = req.body;

        //existing
        const existingUser = await User.findOne({ userId });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        //hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ userId, password: hashedPassword, role });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }

};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { userId, password } = req.body;

        // Find user in DB
        const user = await User.findOne({ userId });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT Token
        const token = generateToken(user.userId, user.role);

        res.status(200).json({ token, user: { userId: user.userId, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};