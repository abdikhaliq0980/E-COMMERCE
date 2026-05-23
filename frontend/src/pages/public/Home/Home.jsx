import React, { useState, useEffect } from "react";
import { products } from "../../../data/products";
import { categories } from "../../../data/categories";
import ProductGrid from "../../../components/products/ProductGrid";

const Home = () => {
  // Floating hero particles state
  const [particles, setParticles] = useState([]);
  
  // Newsletter subscription states
  const [subName, setSubName] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Generate 18 particles with random sizing and delay
    const list = [];
    for (let i = 0; i < 18; i++) {
      const size = Math.random() * 10 + 4;
      list.push({
        id: i,
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 12 + 8}s`,
        animationDelay: `${Math.random() * 8}s`
      });
    }
    setParticles(list);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subName.trim() && subEmail.trim()) {
      setSubscribed(true);
    }
  };

  const handleCategoryClick = (categoryName) => {
    alert(`Filtering for "${categoryName}" – complete inventory catalog coming soon! 🏗️`);
  };

  return (
    <div className="home-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="hero">
        <div className="hero-overlay"></div>
        <div className="hero-particles" id="heroParticles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                width: p.width,
                height: p.height,
                left: p.left,
                top: p.top,
                animationDuration: p.animationDuration,
                animationDelay: p.animationDelay
              }}
            />
          ))}
        </div>
        
        <div className="container hero-content">
          <div className="hero-badge">
            <i className="fas fa-star"></i> Somalia's #1 Construction Marketplace
          </div>
          <h1 className="hero-title">
            Dhismahaagu Waa<br />
            <span className="hero-highlight">Gacantayada</span>
          </h1>
          <p className="hero-desc">
            Hel qalabka dhismaha ee tayo sarraysa, qiimaha tartan, gaadhsiinta
            degdeg ah laga bilaabo 24 saac gudahood. Dhismaha aad rabtid — waa xaq
            inaad gacantaada ku gaadho.
          </p>
          <div className="hero-buttons">
            <a href="#featured" className="btn btn-hero-primary">
              <i className="fas fa-shopping-bag"></i> Shop Now
            </a>
            <a href="#how-it-works" className="btn btn-hero-outline">
              <i className="fas fa-play-circle"></i> Learn More
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">5,000+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">12,000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">18</span>
              <span className="stat-label">Districts</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll Down</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-it-works section-pad" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Simple Process</span>
            <h2 className="section-title">
              How It <span className="accent">Works</span>
            </h2>
            <p className="section-sub">
              Order your materials in 4 easy steps and get them delivered to your
              door.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card" data-step="1">
              <div className="step-number">01</div>
              <div className="step-icon-wrap">
                <i className="fas fa-search"></i>
              </div>
              <h3>Search Products</h3>
              <p>
                Browse thousands of construction materials. Filter by category,
                brand, or location for the best match.
              </p>
              <div className="step-arrow"><i className="fas fa-arrow-right"></i></div>
            </div>

            <div className="step-card" data-step="2">
              <div className="step-number">02</div>
              <div className="step-icon-wrap">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Choose Location</h3>
              <p>
                Select your district and neighborhood for accurate delivery
                pricing and estimated time.
              </p>
              <div className="step-arrow"><i className="fas fa-arrow-right"></i></div>
            </div>

            <div className="step-card" data-step="3">
              <div className="step-number">03</div>
              <div className="step-icon-wrap">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Make Payment</h3>
              <p>
                Pay securely using EVC Plus, Zaad, or cash on delivery. Fast,
                flexible, and safe for everyone.
              </p>
              <div className="step-arrow"><i className="fas fa-arrow-right"></i></div>
            </div>

            <div className="step-card" data-step="4">
              <div className="step-number">04</div>
              <div className="step-icon-wrap">
                <i className="fas fa-truck"></i>
              </div>
              <h3>Fast Delivery</h3>
              <p>
                Receive your materials quickly. Our logistics team delivers from
                warehouse to your site with care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="categories section-pad bg-light" id="categories">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Browse by Type</span>
            <h2 className="section-title">
              Product <span className="accent">Categories</span>
            </h2>
            <p className="section-sub">
              Everything you need to build, repair, or renovate — all in one
              platform.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                id={`cat-${cat.id}`}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className={`cat-icon-wrap ${cat.themeClass}`}>
                  <i className={`fas ${cat.icon}`}></i>
                </div>
                <h4>{cat.name}</h4>
                <p>{cat.countText}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="featured section-pad" id="featured">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Top Picks</span>
            <h2 className="section-title">
              Featured <span className="accent">Products</span>
            </h2>
            <p className="section-sub">
              High-quality materials handpicked by our team for best value and
              reliability.
            </p>
          </div>

          <ProductGrid products={products} />

          <div className="view-all-wrap">
            <a
              href="#"
              className="btn btn-primary btn-lg"
              id="viewAllBtn"
              onClick={(e) => {
                e.preventDefault();
                alert("Loading full marketplace inventory... 🏗️");
              }}
            >
              View All Products <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ===== TRUST BANNER ===== */}
      <section className="trust-banner">
        <div className="container trust-grid">
          <div className="trust-item">
            <i className="fas fa-shield-alt"></i>
            <div>
              <strong>100% Authentic</strong>
              <span>Verified suppliers only</span>
            </div>
          </div>
          <div className="trust-item">
            <i className="fas fa-undo-alt"></i>
            <div>
              <strong>Easy Returns</strong>
              <span>7-day return policy</span>
            </div>
          </div>
          <div className="trust-item">
            <i className="fas fa-headset"></i>
            <div>
              <strong>24/7 Support</strong>
              <span>Always here to help</span>
            </div>
          </div>
          <div className="trust-item">
            <i className="fas fa-lock"></i>
            <div>
              <strong>Secure Payment</strong>
              <span>EVC, Zaad, Edahab & Cash</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter section-pad" id="newsletter">
        <div className="container newsletter-inner">
          <div className="newsletter-text">
            <span className="section-tag light-tag">Stay Updated</span>
            <h2>Want <span className="accent-light">Special Discounts?</span></h2>
            <p>
              Subscribe to our newsletter and be the first to know about exclusive
              deals, new arrivals, and flash sales on construction materials.
            </p>
            <ul className="newsletter-perks">
              <li><i className="fas fa-check-circle"></i> Weekly discount coupons</li>
              <li><i className="fas fa-check-circle"></i> New product alerts</li>
              <li>
                <i className="fas fa-check-circle"></i> Construction tips & guides
              </li>
            </ul>
          </div>

          <div className="newsletter-form-wrap">
            {!subscribed ? (
              <form className="newsletter-form" id="newsletterForm" onSubmit={handleSubscribe}>
                <div className="form-group">
                  <label htmlFor="subName">Your Name</label>
                  <input
                    type="text"
                    id="subName"
                    placeholder="e.g. Abdikhaliq Ahmed"
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subEmail">Email Address</label>
                  <input
                    type="email"
                    id="subEmail"
                    placeholder="you@example.com"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-hero-primary btn-full" id="subscribeBtn">
                  <i className="fas fa-envelope"></i> Subscribe Now
                </button>
                <p className="form-note">
                  <i className="fas fa-lock"></i> No spam. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="subscribe-success" id="subscribeSuccess">
                <div className="success-icon"><i className="fas fa-check-circle"></i></div>
                <h3>You're Subscribed!</h3>
                <p>Thank you, {subName}! Check your email for your first exclusive deal.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
