import React from "react";

const Badge = ({ text, type = "hot", className = "" }) => {
  if (!text) return null;

  const getBadgeClass = () => {
    switch (type.toLowerCase()) {
      case "hot":
        return "badge-hot";
      case "new":
        return "badge-new";
      case "sale":
        return "badge-sale";
      default:
        return "badge-hot";
    }
  };

  return (
    <span className={`product-badge ${getBadgeClass()} ${className}`}>
      {text}
    </span>
  );
};

export default Badge;
