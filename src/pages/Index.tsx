
// Cozy homepage demo for Hygge-style site with demo images and quotes

import React from "react";
import NavBar from "../components/NavBar";
import { GradientBackground } from "../components/GradientBackground";
import { DemoGrid } from "../components/DemoGrid";

const Index = () => {
  return (
    <GradientBackground variant={0}>
      <NavBar />
      <div className="px-2 pt-12 sm:pt-20 pb-2 max-w-4xl mx-auto flex flex-col items-center py-[24px] sm:px-[12px]">
        <h2 className="font-playfair text-4xl font-bold text-center mb-5 bg-gradient-to-r from-yellow-400 via-pink-300 to-blue-200 text-transparent bg-clip-text py-[8px] sm:text-5xl drop-shadow-lg">
          I need an image for...
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl text-center mb-7 font-medium leading-relaxed">
          Make your words memorable—pair your message with a beautiful image and the perfect quote.<br />
          Instantly convey warmth, comfort, or inspiration and delight someone with a thoughtful visual touch.
        </p>
      </div>
      <DemoGrid />
      <div className="text-center text-muted-foreground mt-6 mb-10 text-base">
        Try the <span className="font-semibold text-primary">workbench</span> to design your own combination!
      </div>
    </GradientBackground>
  );
};
export default Index;
