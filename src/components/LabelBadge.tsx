
import React from "react";
import { labelColors } from "../data/demo";

interface LabelBadgeProps {
  label: keyof typeof labelColors;
  className?: string;
}

export const LabelBadge: React.FC<LabelBadgeProps> = ({ label, className }) => (
  <span
    className={`
      inline-block px-3 py-1 rounded-lg border font-semibold text-xs 
      ${labelColors[label] || "bg-gray-200 text-gray-700 border-gray-300"}
      ${className || ""}
    `}
    style={{ minWidth: 72, textAlign: "center", letterSpacing: "0.06em" }}
  >
    {label.charAt(0).toUpperCase() + label.slice(1)}
  </span>
);
