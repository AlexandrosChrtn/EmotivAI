
import React from "react";
import NavBar from "../components/NavBar";
import { GradientBackground } from "../components/GradientBackground";
import { Gallery as GalleryComponent } from "../components/Gallery";
import Footer from "../components/Footer";

const Gallery = () => (
  <GradientBackground variant={2}>
    <NavBar />
    <GalleryComponent />
    <Footer />
  </GradientBackground>
);

export default Gallery;
