import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import Badge from "../common/Badge";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  const handleQuickView = () => {
    alert(
      `🔎 QUICK VIEW: ${product.name}\n\nCategory: ${product.category}\nPrice: $${product.price}\n\nDescription: ${product.description}\n\nSomalia's premium materials marketplace.`
    );
  };

  // Convert numeric rating to stars
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="product-card" id={`prod-${product.id}`}>
      {product.badge && (
        <Badge text={product.badge} type={product.badge.toLowerCase()} />
      )}
      
      <div className="product-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        <div className="product-overlay">
          <button className="overlay-btn" onClick={handleQuickView}>
            <i className="fas fa-eye"></i> Quick View
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">
          <i className={`fas ${product.icon || "fa-industry"}`}></i> {product.category}
        </span>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="review-count">({product.reviewsCount} reviews)</span>
        </div>

        <div className="product-price-row">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="product-old-price">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>

        <button
          className={`btn btn-add-cart ${added ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? (
            <>
              <i className="fas fa-check"></i> Added!
            </>
          ) : (
            <>
              <i className="fas fa-cart-plus"></i> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
