"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dotenvs = require("dotenv");
const connectDBs = require("./utils/db"); // No `.js` extension needed
const auth_routes_1 = __importDefault(require("./routes/auth.routes")); // Import auth routes
dotenvs.config();
connectDBs();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", auth_routes_1.default); // Add authentication routes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
