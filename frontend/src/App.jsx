import { useEffect } from "react";
import { supabase } from "./services/supabase";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    // Background validation of Supabase integration
    async function testSupabase() {
      try {
        const { data, error } = await supabase.from("instruments").select();
        if (error) {
          console.warn("Supabase connection check warning:", error.message);
          return;
        }
        console.log("Supabase connection success! Found instruments:", data);
      } catch (err) {
        console.warn("Supabase integration check failed:", err.message);
      }
    }
    testSupabase();
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;