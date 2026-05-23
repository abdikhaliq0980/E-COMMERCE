import { Router } from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes — no authentication required
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

// Protected routes — valid JWT required
router.post("/logout", protect, logout);

export default router;
