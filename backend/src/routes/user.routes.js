import { Router } from "express";
import {
  getMe,
  updateMe,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/user.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = Router();

// All user routes require authentication
router.use(protect);

// Current user — any authenticated role
router.get("/me", getMe);
router.put("/me", updateMe);

// Admin-only routes
router.get("/", restrictTo("admin"), getAllUsers);
router.get("/:id", restrictTo("admin"), getUserById);
router.delete("/:id", restrictTo("admin"), deleteUser);

export default router;
