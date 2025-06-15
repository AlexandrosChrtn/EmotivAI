
import { Link, useLocation } from "react-router-dom";
import React from "react";

const links = [
  { name: "Home", to: "/" },
  { name: "Workbench", to: "/workbench" },
  { name: "Gallery", to: "/gallery" },
];

const NavBar: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <header className="w-full px-12 pt-8 flex items-center justify-between z-20">
      <h1 className="text-2xl font-playfair font-bold tracking-tight bg-gradient-to-r from-[#eecda3] to-[#ef629f] text-transparent bg-clip-text">
        Hygge Gallery
      </h1>
      <nav className="flex gap-7 text-lg font-medium">
        {links.map(({ name, to }) => (
          <Link
            key={name}
            to={to}
            className={`nav-link-underline transition-colors pb-1 ${
              pathname === to ? "text-primary" : "text-foreground/90"
            }`}
            aria-current={pathname === to ? "page" : undefined}
          >
            {name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default NavBar;
