
import React from "react";

// Used for quote overlays on images: glassmorphic, gentle card
interface GlassTextOverlayProps {
  quote: string;
  theme?: "morning" | "love" | "motivation" | "knowledge" | "night";
}
const themeGradients: Record<GlassTextOverlayProps["theme"], string> = {
  morning: "bg-gradient-to-r from-yellow-300/60 via-rose-200/50 to-white/40",
  love: "bg-gradient-to-r from-pink-400/60 via-red-200/40 to-white/40",
  motivation: "bg-gradient-to-r from-teal-200/60 via-blue-200/50 to-white/40",
  knowledge: "bg-gradient-to-r from-indigo-200/60 via-violet-200/50 to-white/40",
  night: "bg-gradient-to-r from-blue-900/30 via-indigo-800/40 to-gray-300/40",
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
      boxShadow:
        "0 8px 32px 0 rgba(31, 38, 135, 0.13)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    }}
  >
    <span className="block text-white text-lg sm:text-2xl font-playfair text-center drop-shadow font-semibold tracking-tight leading-snug select-none">
      {quote}
    </span>
  </div>
);
