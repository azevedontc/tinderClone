import React from "react";

export default function Container({
  children,
  flexDirection = "column",
  justifyContent = "flex-start",
  alignItens = "flex-start",
  textAlign = "left",
  ...props
}) {
  return (
    <section
      {...props}
      className="container"
      style={{
        ...props.style,
        flexDirection,
        justifyContent,
        alignItens,
        textAlign,
      }}
    >
      {children}
    </section>
  );
}
