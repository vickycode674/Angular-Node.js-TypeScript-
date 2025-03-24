import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { getUserDetails } from "../controllers/user.controller";
import { getAllUsers, deleteUser } from "../controllers/admin.controller";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/user/:userId", authMiddleware(["General User", "Admin"]), getUserDetails);

// ✅ Admin Routes (Only Admins)
router.get("/admin/users", authMiddleware(["Admin"]), getAllUsers);
router.delete("/admin/delete/:userId", authMiddleware(["Admin"]), deleteUser);


export default router;
