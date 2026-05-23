import { supabase } from "../config/supabase.js";

// ─────────────────────────────────────────────
//  POST /api/auth/register
// ─────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { email, password, full_name, phone } = req.body;

    if (!email || !password || !full_name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and full name are required.",
      });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name, phone },
      });

    if (authError) {
      return res.status(400).json({ success: false, message: authError.message });
    }

    // Insert profile row in public.users table
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      full_name,
      email,
      phone: phone || null,
      role: "customer",
    });

    if (profileError) {
      // Rollback: delete auth user if profile insertion fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      return res
        .status(500)
        .json({ success: false, message: "Failed to create user profile." });
    }

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: {
        id: authData.user.id,
        email: authData.user.email,
        full_name,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  POST /api/auth/login
// ─────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.user_metadata?.full_name,
        role: data.user.user_metadata?.role || "customer",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  POST /api/auth/logout
// ─────────────────────────────────────────────
export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ success: false, message: "No token provided." });
    }

    const { error } = await supabase.auth.admin.signOut(token);
    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  POST /api/auth/forgot-password
// ─────────────────────────────────────────────
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
    });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
