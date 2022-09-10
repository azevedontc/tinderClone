import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
