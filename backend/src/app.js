import express from "express";
import cors from "cors";
import "dotenv/config";

// Route imports
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// ─────────────────────────────────────────────
//  Global Middleware
// ─────────────────────────────────────────────

// CORS — allow requests from the frontend dev server
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse incoming JSON bodies
app.use(express.json({ limit: "10mb" }));

// Parse URL-encoded bodies (e.g. form submissions)
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
//  Health Check
// ─────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DHISMAHUB API is running.",
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────
//  API Routes
// ─────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ─────────────────────────────────────────────
//  404 — Unknown Route Handler
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ─────────────────────────────────────────────
//  Global Error Handler
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

export default app;
