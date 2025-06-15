
import React from "react";
import NavBar from "../components/NavBar";
import { GradientBackground } from "../components/GradientBackground";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const About: React.FC = () => (
  <GradientBackground>
    <NavBar />
    <section className="flex flex-col items-center justify-center min-h-[65vh] px-4">
      <div className="glass max-w-xl w-full mx-auto px-8 py-10 text-center animate-fade-in">
        <h2 className="font-playfair text-3xl mb-4 bg-gradient-to-r from-[#eecda3] to-[#ef629f] text-transparent bg-clip-text font-bold">
          About
        </h2>
        <p className="font-playfair text-xl text-foreground mb-8">
          Made by Alexandros Chariton for Lovable&apos;s neat competition. Was fun.
        </p>
        <Link to="/workbench">
          <Button size="lg" className="font-playfair text-lg px-8">
            Create images
          </Button>
        </Link>
      </div>
    </section>
  </GradientBackground>
);

export default About;
