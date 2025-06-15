
import React from "react";
import { demoImages, demoQuotes } from "../data/demo";
import { GlassTextOverlay } from "./GlassTextOverlay";

// simple local state demo: select image, select quote, see preview

export const Workbench: React.FC = () => {
  const [img, setImg] = React.useState(demoImages[0]);
  const [qIdx, setQIdx] = React.useState(0);

  const quote = demoQuotes[qIdx];

  return (
    <main className="w-full max-w-5xl mx-auto py-8">
      <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-6 text-center text-primary">
        Your Cozy Creation
      </h2>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Image selector */}
        <div className="space-y-3 w-full md:w-[220px]">
          <h3 className="text-lg font-semibold text-muted-foreground mb-1">Choose an image:</h3>
          <div className="grid grid-cols-3 gap-4">
            {demoImages.map((di) => (
              <button
                className={`focus:outline-none transition-[transform,box-shadow] border-2 rounded-xl p-0.5 ${
                  img.id === di.id
                    ? "border-primary scale-105 ring-2 ring-primary/30"
                    : "border-transparent"
                }`}
                onClick={() => setImg(di)}
                key={di.id}
              >
                <img
                  src={di.url}
                  alt={di.alt}
                  className="object-cover w-full h-20 rounded-lg"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
        {/* Quote selector */}
        <div className="space-y-3 w-full md:w-[350px]">
          <h3 className="text-lg font-semibold text-muted-foreground mb-1">Choose a positive message:</h3>
          <div className="max-h-64 overflow-auto grid grid-cols-1 gap-2">
            {demoQuotes.map((q, idx) => (
              <button
                className={`text-left bg-white/70 px-4 py-2 rounded-lg border w-full shadow transition-all ${
                  qIdx === idx
                    ? "bg-gradient-to-r from-rose-100 via-slate-50 to-yellow-100 border-primary text-primary font-bold"
                    : "border-transparent hover:bg-gradient-to-r hover:from-yellow-50 hover:to-rose-50"
                }`}
                onClick={() => setQIdx(idx)}
                key={idx}
              >
                <span className="block text-base font-playfair">{q.text}</span>
                <span className="block text-xs text-muted-foreground">{q.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Preview */}
        <div className="w-full max-w-sm min-w-[270px] flex items-center justify-center">
          <div className="relative rounded-2xl shadow-xl overflow-hidden transition-all min-h-[350px] min-w-[260px]">
            <img
              src={img.url}
              alt={img.alt}
              className="object-cover w-full h-80 brightness-97"
              draggable={false}
            />
            <GlassTextOverlay quote={quote.text} theme={quote.label as any} />
          </div>
        </div>
      </div>
      <div className="text-center text-muted-foreground mt-8 text-sm">
        (Combine images and quotes to create your own cozy, hygge-inspired message!)
      </div>
    </main>
  );
};

