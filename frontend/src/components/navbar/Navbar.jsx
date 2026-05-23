import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Searching for: "${searchTerm}" in category "${selectedCategory}" – marketplace coming soon! 🔍`);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleCartClick = () => {
    alert(`You have ${cartCount} items in your cart. Direct checkout coming soon! 🛒`);
  };

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <span><i className="fas fa-phone-alt"></i> +252 61 844 0980</span>
          <span><i className="fas fa-envelope"></i> info@dhismahub.so</span>
          <span><i className="fas fa-truck"></i> Free delivery on orders over $500</span>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="container nav-inner">
          {/* Logo */}
          <a href="/" className="logo">
            <span className="logo-icon"><i className="fas fa-hard-hat"></i></span>
            <span className="logo-text">
              DHISMA<span className="logo-accent">HUB</span>
            </span>
          </a>

          {/* Search Bar */}
          <div className="search-bar">
            <select
              className="search-category"
              id="searchCategory"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Insulation</option>
              <option>Plasterboard & Drylining</option>
              <option>Timber & Sheet</option>
              <option>Building Materials</option>
              <option>Doors & Joinery</option>
              <option>Garden & Landscaping</option>
              <option>Roofing</option>
              <option>Screws & Fixings</option>
              <option>Adhesives & Sealants</option>
              <option>Tools & Workwear</option>
              <option>Bulk Deals</option>
            </select>
            <input
              type="text"
              id="searchInput"
              placeholder="Search construction materials…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button className="search-btn" id="searchBtn" onClick={handleSearchSubmit}>
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Nav Actions */}
          <div className="nav-actions">
            <button className="cart-btn" id="cartBtn" aria-label="Shopping Cart" onClick={handleCartClick}>
              <i className="fas fa-shopping-cart"></i>
              {cartCount > 0 && (
                <span className="cart-badge" id="cartBadge">{cartCount}</span>
              )}
            </button>
            <a href="/login" className="btn btn-outline" id="loginBtn" onClick={(e) => { e.preventDefault(); alert("Auth features coming soon!"); }}>Login</a>
            <a href="/signup" className="btn btn-primary" id="signupBtn" onClick={(e) => { e.preventDefault(); alert("Auth features coming soon!"); }}>Sign Up</a>
            <button className="hamburger" id="hamburger" aria-label="Menu" onClick={toggleMobileMenu}>
              <i className={`fas ${mobileOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} id="mobileMenu">
          <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#categories" onClick={() => setMobileOpen(false)}>Categories</a>
          <a href="#featured" onClick={() => setMobileOpen(false)}>Featured Products</a>
          <a href="#newsletter" onClick={() => setMobileOpen(false)}>Deals</a>
          <hr />
          <a href="/login" className="btn btn-outline" style={{ display: "flex", justifyContent: "center" }} onClick={(e) => { e.preventDefault(); alert("Auth features coming soon!"); }}>Login</a>
          <a href="/signup" className="btn btn-primary" style={{ display: "flex", justifyContent: "center" }} onClick={(e) => { e.preventDefault(); alert("Auth features coming soon!"); }}>Sign Up</a>
        </div>
      </header>
    </>
  );
};

export default Navbar;
