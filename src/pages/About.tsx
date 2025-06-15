
import React from "react";
import { GradientBackground } from "@/components/GradientBackground";

const About: React.FC = () => (
  <GradientBackground>
    <section className="flex flex-col items-center justify-center min-h-[65vh]">
      <div className="glass max-w-xl mx-auto px-8 py-10 text-center animate-fade-in">
        <h2 className="font-playfair text-3xl mb-4 bg-gradient-to-r from-[#eecda3] to-[#ef629f] text-transparent bg-clip-text font-bold">
          About
        </h2>
        <p className="font-playfair text-xl text-foreground">
          Made by Alexandros Chariton for Lovable&apos;s neat competition. Was fun.
        </p>
      </div>
    </section>
  </GradientBackground>
);

export default About;
