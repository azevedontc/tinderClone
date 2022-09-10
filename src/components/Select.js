import React from "react";

export default function Select({ label, options = [], ...props }) {
  return (
    <span className="input-container">
      <label>{label}:</label>
      <select {...props}>
        <option hidden>Selecione</option>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    </span>
  );
}
