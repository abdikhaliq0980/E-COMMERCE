import { supabase } from "../config/supabase.js";

// ─────────────────────────────────────────────
//  GET /api/users/me
//  Returns the authenticated user's profile
// ─────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("users")
      .select("id, full_name, email, phone, role, avatar_url, created_at")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, user: data });
  } catch (error) {
    console.error("getMe error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  PUT /api/users/me
//  Update the authenticated user's profile
// ─────────────────────────────────────────────
export const updateMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, phone, avatar_url } = req.body;

    const updates = {};
    if (full_name !== undefined) updates.full_name = full_name;
    if (phone !== undefined) updates.phone = phone;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields provided to update." });
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select("id, full_name, email, phone, role, avatar_url, updated_at")
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: data,
    });
  } catch (error) {
    console.error("updateMe error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  GET /api/users  (Admin only)
//  Returns all users in the system
// ─────────────────────────────────────────────
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const from = (page - 1) * limit;
    const to = from + parseInt(limit) - 1;

    let query = supabase
      .from("users")
      .select("id, full_name, email, phone, role, avatar_url, created_at", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (role) query = query.eq("role", role);
    if (search) query = query.ilike("full_name", `%${search}%`);

    const { data, error, count } = await query;

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      users: data,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("getAllUsers error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  GET /api/users/:id  (Admin only)
//  Returns a specific user by ID
// ─────────────────────────────────────────────
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("users")
      .select("id, full_name, email, phone, role, avatar_url, created_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, user: data });
  } catch (error) {
    console.error("getUserById error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─────────────────────────────────────────────
//  DELETE /api/users/:id  (Admin only)
//  Permanently deletes a user from auth + profile
// ─────────────────────────────────────────────
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Remove user profile from public.users table
    const { error: profileError } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (profileError) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete user profile." });
    }

    // Remove user from Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(id);

    if (authError) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete auth user." });
    }

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("deleteUser error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
