
import React from "react";
import NavBar from "../components/NavBar";
import { GradientBackground } from "../components/GradientBackground";
import { Workbench as WorkbenchComponent } from "../components/Workbench";

const Workbench = () => (
  <GradientBackground variant={1}>
    <NavBar />
    <WorkbenchComponent />
  </GradientBackground>
);

export default Workbench;
