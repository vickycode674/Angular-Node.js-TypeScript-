"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const admin_controller_1 = require("../controllers/admin.controller");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.registerUser);
router.post("/login", auth_controller_1.loginUser);
router.get("/user/:userId", (0, auth_middleware_1.default)(["General User", "Admin"]), user_controller_1.getUserDetails);
// ✅ Admin Routes (Only Admins)
router.get("/admin/users", (0, auth_middleware_1.default)(["Admin"]), admin_controller_1.getAllUsers);
router.delete("/admin/delete/:userId", (0, auth_middleware_1.default)(["Admin"]), admin_controller_1.deleteUser);
exports.default = router;
