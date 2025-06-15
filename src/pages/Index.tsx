
import React from "react";
import NavBar from "../components/NavBar";
import { GradientBackground } from "../components/GradientBackground";
import { DemoGrid } from "../components/DemoGrid";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <GradientBackground variant={0}>
      <NavBar />
      <div className="px-2 pt-12 sm:pt-20 pb-2 max-w-4xl mx-auto flex flex-col items-center sm:px-[12px] py-[8px]">
        <h2 className="font-playfair text-4xl font-bold text-center mb-5 bg-gradient-to-r from-yellow-400 via-pink-300 to-blue-200 text-transparent bg-clip-text py-[8px] sm:text-5xl drop-shadow-lg">
          I need an image for...
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl text-center mb-7 font-medium leading-relaxed">
          Convey your feelings with a beautiful image and a perfect quote
        </p>
      </div>
      <DemoGrid />
      <div className="w-full flex justify-center mt-6 mb-10">
        <Link to="/workbench">
          <button
            className="font-playfair bg-gradient-to-r from-[#eecda3] to-[#ef629f] text-white text-base sm:text-lg px-7 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 hover:shadow-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#ef629f] focus:ring-offset-2 active:scale-95"
            type="button"
          >
            Try the workbench to design your own combination!
          </button>
        </Link>
      </div>
      <footer className="w-full border-t border-gray-200 bg-white/80 py-6 px-4 flex flex-col items-center gap-4 mt-auto text-gray-500">
        <nav className="flex gap-7 text-base font-medium">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/workbench" className="hover:text-primary transition">Workbench</Link>
          <Link to="/gallery" className="hover:text-primary transition">Gallery</Link>
          <Link to="/about" className="hover:text-primary transition">About</Link>
        </nav>
        <div className="text-xs text-center text-gray-400 font-mono">
          &copy; {new Date().getFullYear()} Emotivo &mdash; All rights reserved.
        </div>
      </footer>
    </GradientBackground>
  );
};
export default Index;
