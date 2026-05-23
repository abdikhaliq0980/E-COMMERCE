import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/public/Home/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes nested in MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Fallback Catch-All route redirection */}
        <Route
          path="*"
          element={
            <MainLayout>
              <div className="container section-pad" style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "3rem", color: "var(--blue)" }}>404</h1>
                <p style={{ margin: "20px 0", color: "var(--gray-500)" }}>
                  The page you are looking for does not exist.
                </p>
                <a href="/" className="btn btn-primary">
                  Go Back Home
                </a>
              </div>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
