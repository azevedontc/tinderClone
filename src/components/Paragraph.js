import React from "react";

export default function Paragraph({ children, ...props }) {
  return <p {...props}>{children}</p>;
}
