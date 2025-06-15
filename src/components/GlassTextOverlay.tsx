
import React from "react";

// Used for quote overlays on images: glassmorphic, gentle card
interface GlassTextOverlayProps {
  quote: string;
  theme?: "morning" | "love" | "motivation" | "knowledge" | "night";
}
const themeGradients: Record<GlassTextOverlayProps["theme"], string> = {
  morning: "bg-gradient-to-r from-yellow-200/40 via-rose-100/40 to-white/30",
  love: "bg-gradient-to-r from-pink-200/40 via-red-100/40 to-white/30",
  motivation: "bg-gradient-to-r from-teal-100/50 via-blue-100/40 to-white/30",
  knowledge: "bg-gradient-to-r from-indigo-200/40 via-violet-100/40 to-white/30",
  night: "bg-gradient-to-r from-blue-950/40 via-indigo-900/40 to-white/25",
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
      boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
      backdropFilter: "blur(22px) saturate(1.2)",
      WebkitBackdropFilter: "blur(22px) saturate(1.2)",
      border: "2px solid rgba(255,255,255,0.22)",
      background: "rgba(255, 255, 255, 0.58)", // Much higher opacity!
      borderRadius: "2rem",
      // Optionally: add another inset shadow for a deeper effect
      // boxShadow: "0 8px 32px 0 rgba(31,38,135,0.16), 0 1.5px 14px 0 rgba(255,255,255,0.21) inset",
    }}
  >
    <span className="block text-black/90 text-lg sm:text-2xl font-playfair text-center drop-shadow font-semibold tracking-tight leading-snug select-none">
      {quote}
    </span>
  </div>
);

