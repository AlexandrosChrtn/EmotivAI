
import React from "react";

// Used for quote overlays on images: glassmorphic, gentle card
interface GlassTextOverlayProps {
  quote: string;
  theme?: "morning" | "love" | "motivation" | "knowledge" | "night";
}
const themeGradients: Record<GlassTextOverlayProps["theme"], string> = {
  morning: "bg-gradient-to-r from-yellow-300/20 via-rose-200/10 to-white/5",
  love: "bg-gradient-to-r from-pink-400/10 via-red-200/12 to-white/5",
  motivation: "bg-gradient-to-r from-teal-200/10 via-blue-200/10 to-white/5",
  knowledge: "bg-gradient-to-r from-indigo-200/10 via-violet-200/10 to-white/5",
  night: "bg-gradient-to-r from-blue-900/12 via-indigo-800/6 to-gray-300/4",
};

export const GlassTextOverlay: React.FC<GlassTextOverlayProps> = ({
  quote,
  theme = "morning"
}) => (
  <div
    className={`demo-glass-overlay ${themeGradients[theme]} animate-fade-in`}
    style={{
      boxShadow: "0 8px 32px 0 rgba(31,38,135,0.08)",
      backdropFilter: "blur(13px)",
      WebkitBackdropFilter: "blur(13px)",
      border: "1.5px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.08)",
      borderRadius: "2rem",
      outline: "1.5px solid rgba(120,120,120,0.03)",
    }}
  >
    <span className="block text-white text-lg sm:text-2xl font-playfair text-center font-semibold tracking-tight leading-snug select-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
      {quote}
    </span>
  </div>
);

