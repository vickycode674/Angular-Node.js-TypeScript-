import { Request, Response } from "express";
import User from "../models/user.model";

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
