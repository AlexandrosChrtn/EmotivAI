
import React from "react";
import NavBar from "../components/NavBar";
import { GradientBackground } from "../components/GradientBackground";
import { Workbench as WorkbenchComponent } from "../components/Workbench";
import Footer from "../components/Footer";

const Workbench = () => (
  <GradientBackground variant={1}>
    <NavBar />
    <WorkbenchComponent />
    <Footer />
  </GradientBackground>
);

export default Workbench;
