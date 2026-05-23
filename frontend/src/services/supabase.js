import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

let supabaseInstance;
try {
  // Validate basic format before initializing to prevent fatal runtime crash
  if (!supabaseUrl || !supabaseUrl.startsWith("http")) {
    throw new Error("Supabase URL must be a valid HTTP/HTTPS endpoint.");
  }
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.warn("Supabase initialization bypassed:", error.message);
  // Create a mock fallback object with a select method to prevent catalog/login crashes
  supabaseInstance = {
    from: () => ({
      select: async () => ({ data: [], error: { message: "Supabase offline fallback" } }),
      insert: async () => ({ data: [], error: { message: "Supabase offline fallback" } })
    })
  };
}

export const supabase = supabaseInstance;

