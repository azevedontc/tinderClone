import React from "react";
import { Link as LinkRouter } from "react-router-dom";

export default function Link({ to, children, variant = "primary" }) {
  const variants = {
    primary: {
      color: "#505050",
    },
    secondary: {
      color: "#F53D76",
    },
  };

  return (
    <LinkRouter to={to} style={{ ...variants[variant] }}>
      {children}
    </LinkRouter>
  );
}
