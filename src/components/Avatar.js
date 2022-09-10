import React from "react";

export default function Avatar({ img, size }) {
  const sizeDefinition = {
    small: 150,
    medium: 250,
    large: 350,
  };
  return (
    <div
      className="avatar"
      style={{
        width: `${sizeDefinition[size]}px`,
        height: `${sizeDefinition[size]}px`,
        backgroundImage: `url("${img}")`,
      }}
    ></div>
  );
}
