// Cozy homepage demo for Hygge-style site with demo images and quotes

import React from "react";
import NavBar from "../components/NavBar";
import { GradientBackground } from "../components/GradientBackground";
import { DemoGrid } from "../components/DemoGrid";
const Index = () => {
  return <GradientBackground variant={0}>
      <NavBar />
      <div className="px-2 sm:px-4 pt-12 sm:pt-20 pb-2 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="font-playfair text-4xl font-bold text-center mb-5 bg-gradient-to-r from-yellow-400 via-pink-300 to-blue-200 text-transparent bg-clip-text sm:text-5xl py-[8px]">
          Cozy Quotes on Beautiful Images
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl text-center mb-7">
          Welcome to your hygge corner on the web.<br />
          Combine warm images and uplifting messages to brighten your day, or visit the workbench to create your own!
        </p>
      </div>
      <DemoGrid />
      <div className="text-center text-muted-foreground mt-6 mb-10 text-base">
        Try the <span className="font-semibold text-primary">workbench</span> to design your own combination!
      </div>
    </GradientBackground>;
};
export default Index;