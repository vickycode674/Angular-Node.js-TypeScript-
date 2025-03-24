const express = require("express");
const cors = require("cors");
const dotenvs = require("dotenv");
const connectDBs = require("./utils/db"); // No `.js` extension needed
import authRoutes from "./routes/auth.routes"; // Import auth routes


dotenvs.config();
connectDBs();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // Add authentication routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
