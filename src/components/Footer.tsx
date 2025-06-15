
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="w-full border-t border-gray-200 bg-white/80 py-6 px-4 flex flex-col items-center gap-4 mt-auto text-gray-500">
    <nav className="flex gap-7 text-base font-medium">
      <Link to="/" className="hover:text-primary transition">Home</Link>
      <Link to="/workbench" className="hover:text-primary transition">Workbench</Link>
      <Link to="/gallery" className="hover:text-primary transition">Gallery</Link>
      <Link to="/about" className="hover:text-primary transition">About</Link>
    </nav>
    <div className="text-xs text-center text-gray-400 font-mono">
      &copy; {new Date().getFullYear()} EmotivAI &mdash; All rights reserved.
    </div>
  </footer>
);

export default Footer;

