import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const server = app.listen(PORT, () => {
  console.log("─────────────────────────────────────────");
  console.log(`  🏗️  DHISMAHUB API Server`);
  console.log(`  🌍  Environment : ${NODE_ENV}`);
  console.log(`  🚀  Running on  : http://localhost:${PORT}`);
  console.log(`  ❤️  Health check: http://localhost:${PORT}/api/health`);
  console.log("─────────────────────────────────────────");
});

// ─────────────────────────────────────────────
//  Graceful Shutdown — handle SIGTERM / SIGINT
// ─────────────────────────────────────────────
const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log("Server closed. Goodbye!");
    process.exit(0);
  });

  // Force exit if server hasn't closed in 10 seconds
  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10_000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Catch unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
});
