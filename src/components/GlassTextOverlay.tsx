
import React from "react";

// Used for quote overlays on images: glassmorphic, gentle card
interface GlassTextOverlayProps {
  quote: string;
  theme?: "morning" | "love" | "motivation" | "knowledge" | "night";
  fontClass?: string; // NEW for font selection
}
const themeGradients: Record<GlassTextOverlayProps["theme"], string> = {
  morning: "bg-gradient-to-r from-yellow-300/10 via-rose-200/5 to-white/2.5",
  love: "bg-gradient-to-r from-pink-400/5 via-red-200/6 to-white/2.5",
  motivation: "bg-gradient-to-r from-teal-200/5 via-blue-200/5 to-white/2.5",
  knowledge: "bg-gradient-to-r from-indigo-200/5 via-violet-200/5 to-white/2.5",
  night: "bg-gradient-to-r from-blue-900/6 via-indigo-800/3 to-gray-300/2",
};

export const GlassTextOverlay: React.FC<GlassTextOverlayProps> = ({
  quote,
  theme = "morning",
  fontClass = "font-playfair",
}) => (
  <div
    className={`demo-glass-overlay ${themeGradients[theme]} animate-fade-in`}
    style={{
      boxShadow: "0 8px 32px 0 rgba(31,38,135,0.08)",
      backdropFilter: "blur(13px)",
      WebkitBackdropFilter: "blur(13px)",
      border: "1.5px solid rgba(255,255,255,0.08)", // lowered from 0.12
      background: "rgba(255,255,255,0.04)", // lowered from 0.08
      borderRadius: "2rem",
      outline: "1.5px solid rgba(120,120,120,0.02)", // lowered from 0.03
    }}
  >
    <span className={`${fontClass} block text-white text-lg sm:text-2xl text-center font-semibold tracking-tight leading-snug select-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]`}>
      {quote}
    </span>
  </div>
);
