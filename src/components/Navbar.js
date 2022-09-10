import React from "react";
import Brand from "./Brand";
import Link from "./Link";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const redirects = {
    "/": "/match",
    "/config": "/",
    "/match": "/config",
  };

  return (
    <nav>
      <Link
        to={`${
          redirects?.[location.pathname] ? redirects[location.pathname] : "/"
        }`}
      >
        <Brand />
      </Link>
    </nav>
  );
}
