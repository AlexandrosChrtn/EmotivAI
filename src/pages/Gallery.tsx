
import React from "react";
import NavBar from "../components/NavBar";
import { GradientBackground } from "../components/GradientBackground";
import { Gallery as GalleryComponent } from "../components/Gallery";

const Gallery = () => (
  <GradientBackground variant={2}>
    <NavBar />
    <GalleryComponent />
  </GradientBackground>
);

export default Gallery;
