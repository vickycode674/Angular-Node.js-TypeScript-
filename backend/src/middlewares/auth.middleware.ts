import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("Here is the user moving==============",req.header("Authorization"));
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("Here is the user moving==============",token);

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded;

      console.log("Decoded Token:", req.user); // Debugging step


      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Unauthorized Access" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  };
};

export default authMiddleware;
