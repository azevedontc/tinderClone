import React from "react";

export default function Input({ type, label, ...props }) {
  return (
    <span className="input-container">
      <label>{label}:</label>
      <input type={type} {...props} />
    </span>
  );
}
