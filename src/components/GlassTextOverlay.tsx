
import React from "react";

// Used for quote overlays on images: glassmorphic, gentle card
interface GlassTextOverlayProps {
  quote: string;
  theme?: "morning" | "love" | "motivation" | "knowledge" | "night";
}
const themeGradients: Record<GlassTextOverlayProps["theme"], string> = {
  morning: "bg-gradient-to-r from-yellow-300/30 via-rose-200/20 to-white/10",
  love: "bg-gradient-to-r from-pink-400/20 via-red-200/20 to-white/10",
  motivation: "bg-gradient-to-r from-teal-200/20 via-blue-200/20 to-white/10",
  knowledge: "bg-gradient-to-r from-indigo-200/20 via-violet-200/20 to-white/10",
  night: "bg-gradient-to-r from-blue-900/20 via-indigo-800/20 to-gray-300/10",
};

export const GlassTextOverlay: React.FC<GlassTextOverlayProps> = ({
  quote,
  theme = "morning"
}) => (
  <div
    className={
      `demo-glass-overlay ${themeGradients[theme]} animate-fade-in`
    }
    style={{
      boxShadow: "0 8px 32px 0 rgba(31,38,135,.12)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      border: "1.5px solid rgba(255,255,255,0.19)",
      background: "rgba(255,255,255,0.19)",
      borderRadius: "2rem",
    }}
  >
    <span className="block text-white text-lg sm:text-2xl font-playfair text-center drop-shadow font-semibold tracking-tight leading-snug select-none">
      {quote}
    </span>
  </div>
);

