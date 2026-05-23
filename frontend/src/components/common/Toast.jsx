import React from "react";

const Toast = ({ show, message, icon = "fa-check-circle" }) => {
  return (
    <div className={`cart-toast ${show ? "show" : ""}`} id="cartToast">
      <i className={`fas ${icon}`}></i>
      <span id="cartToastMsg">{message}</span>
    </div>
  );
};

export default Toast;
