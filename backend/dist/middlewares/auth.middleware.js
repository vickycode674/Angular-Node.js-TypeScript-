"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to protect routes
const authMiddleware = (roles) => {
    return (req, res, next) => {
        var _a;
        console.log("Here is the user moving==============", req.header("Authorization"));
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log("Here is the user moving==============", token);
        if (!token)
            return res.status(401).json({ message: "Access Denied" });
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            console.log("Decoded Token:", req.user); // Debugging step
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Unauthorized Access" });
            }
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Invalid Token" });
        }
    };
};
exports.default = authMiddleware;
