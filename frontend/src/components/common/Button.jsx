import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return "btn-primary";
      case "outline":
        return "btn-outline";
      case "hero-primary":
        return "btn-hero-primary";
      case "hero-outline":
        return "btn-hero-outline";
      case "add-cart":
        return "btn-add-cart";
      default:
        return "btn-primary";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${getVariantClass()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
