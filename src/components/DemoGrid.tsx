
import React from "react";
import { demoImages, demoQuotes } from "../data/demo";
import { GlassTextOverlay } from "./GlassTextOverlay";
import { AspectRatio } from "./ui/aspect-ratio";

// Demo: pairs images with one quote each (cycle through both arrays)
export const DemoGrid: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {demoImages.map((img, i) => {
        const quote = demoQuotes[i % demoQuotes.length];
        return (
          <div key={img.id} className="relative group overflow-hidden rounded-2xl shadow-xl bg-white/10 animate-fade-in transition-all">
            <AspectRatio ratio={4/3}>
              <img
                src={img.url}
                alt={img.alt}
                className="gallery-img object-cover w-full h-full"
                draggable={false}
              />
              <GlassTextOverlay quote={quote.text} theme={quote.label as any} />
            </AspectRatio>
          </div>
        );
      })}
    </section>
  );
};
