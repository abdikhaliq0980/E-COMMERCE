import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Toast from "../components/common/Toast";
import { useCart } from "../context/CartContext";

const MainLayout = ({ children }) => {
  const { toast } = useCart();
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setBackToTopVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFooterLink = (e, target) => {
    e.preventDefault();
    alert(`Link to "${target}" coming soon! Thank you for using DHISMAHUB.`);
  };

  return (
    <div className="main-layout">
      {/* Dynamic sticky Navigation Bar */}
      <Navbar />

      {/* Main Page Content Outlet */}
      <main>{children}</main>

      {/* Global Shopping Cart Toast notification */}
      <Toast show={toast.show} message={toast.message} />

      {/* Smooth scroll-to-top floating button */}
      <button
        className={`back-to-top ${backToTopVisible ? "visible" : ""}`}
        id="backToTop"
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* ===== FOOTER ===== */}
      <footer className="footer" id="footer">
        <div className="footer-top">
          <div className="container footer-grid">
            {/* Brand column */}
            <div className="footer-col footer-brand">
              <a href="/" className="logo logo-footer">
                <span className="logo-icon"><i className="fas fa-hard-hat"></i></span>
                <span className="logo-text">
                  DHISMA<span className="logo-accent">HUB</span>
                </span>
              </a>
              <p>
                Somalia's leading online marketplace for premium construction
                materials. Building the future, one delivery at a time.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook" id="socialFb" onClick={(e) => handleFooterLink(e, "Facebook")}><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter" id="socialTw" onClick={(e) => handleFooterLink(e, "Twitter")}><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Instagram" id="socialIg" onClick={(e) => handleFooterLink(e, "Instagram")}><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="WhatsApp" id="socialWa" onClick={(e) => handleFooterLink(e, "WhatsApp")}><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>

            {/* Useful Links */}
            <div className="footer-col">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href="#" id="footerAbout" onClick={(e) => handleFooterLink(e, "About Us")}><i className="fas fa-chevron-right"></i> About Us</a>
                </li>
                <li>
                  <a href="#featured"><i className="fas fa-chevron-right"></i> Products</a>
                </li>
                <li>
                  <a href="#" id="footerDelivery" onClick={(e) => handleFooterLink(e, "Delivery Info")}><i className="fas fa-chevron-right"></i> Delivery Information</a>
                </li>
                <li>
                  <a href="#" id="footerBlog" onClick={(e) => handleFooterLink(e, "Blog")}><i className="fas fa-chevron-right"></i> Blog</a>
                </li>
                <li>
                  <a href="#" id="footerCareers" onClick={(e) => handleFooterLink(e, "Careers")}><i className="fas fa-chevron-right"></i> Careers</a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#" id="footerHelp" onClick={(e) => handleFooterLink(e, "Help Center")}><i className="fas fa-chevron-right"></i> Help Center</a>
                </li>
                <li>
                  <a href="#" id="footerFaq" onClick={(e) => handleFooterLink(e, "FAQs")}><i className="fas fa-chevron-right"></i> Frequently Asked Questions</a>
                </li>
                <li>
                  <a href="#" id="footerTerms" onClick={(e) => handleFooterLink(e, "Terms")}><i className="fas fa-chevron-right"></i> Terms & Conditions</a>
                </li>
                <li>
                  <a href="#" id="footerPrivacy" onClick={(e) => handleFooterLink(e, "Privacy")}><i className="fas fa-chevron-right"></i> Privacy Policy</a>
                </li>
                <li>
                  <a href="#" id="footerRefund" onClick={(e) => handleFooterLink(e, "Refund Policy")}><i className="fas fa-chevron-right"></i> Refund Policy</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul className="contact-list">
                <li>
                  <i className="fas fa-map-marker-alt"></i> Makka Al-Mukarama Rd,
                  Mogadishu, Somalia
                </li>
                <li>
                  <a href="tel:+252618440980"><i className="fas fa-phone-alt"></i> +252 61 844 0980</a>
                </li>
                <li>
                  <a href="mailto:info@dhismahub.so"><i className="fas fa-envelope"></i> info@dhismahub.so</a>
                </li>
                <li><i className="fas fa-clock"></i> Mon–Sat: 8:00 AM – 6:00 PM</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>&copy; {new Date().getFullYear()} DHISMAHUB. All rights reserved.</p>
            <div className="payment-icons">
              <span>We Accept:</span>
              <span className="pay-badge">EVC Plus</span>
              <span className="pay-badge">Edahab</span>
              <span className="pay-badge">Zaad</span>
              <span className="pay-badge">Cash</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
