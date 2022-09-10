import React from "react";

export default function Textarea({ label, ...props }) {
  return (
    <span className="input-container">
      <label>{label}:</label>
      <textarea {...props}></textarea>
    </span>
  );
}
