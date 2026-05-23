import { supabase } from "../config/supabase.js";

// ─────────────────────────────────────────────
//  Protect routes — verifies Supabase JWT
// ─────────────────────────────────────────────
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify the JWT token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Invalid or expired token.",
      });
    }

    // Fetch the user's role from the public.users table
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id, full_name, email, role")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User profile not found.",
      });
    }

    // Attach user to request object for downstream controllers
    req.user = profile;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  Restrict routes to specific roles
//  Usage: restrictTo("admin"), restrictTo("admin", "employee")
// ─────────────────────────────────────────────
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of: ${roles.join(", ")}.`,
      });
    }
    next();
  };
};
