
import React from "react";

const gradients = [
  "hygge-gradient-1",
  "hygge-gradient-2",
  "hygge-gradient-3"
];

// cycles through 3 gentle gradients for different sections
export const GradientBackground: React.FC<{ variant?: 0|1|2; children: React.ReactNode }> = ({
  variant = 0,
  children
}) => (
  <div className={`${gradients[variant]} min-h-screen w-full transition-colors`}>
    {children}
  </div>
);
