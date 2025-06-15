
import React from "react";
import { demoImages } from "../data/demo";

export const Gallery: React.FC = () => (
  <main className="w-full max-w-6xl mx-auto py-12">
    <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text">
      Gallery
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 pb-8">
      {demoImages.map((img, i) => (
        <div
          key={img.id}
          className="overflow-hidden rounded-2xl bg-white/60 shadow-md hover:shadow-xl transition-all"
        >
          <img
            src={img.url}
            alt={img.alt}
            className="gallery-img object-cover h-80 w-full"
            draggable={false}
          />
        </div>
      ))}
    </div>
    <div className="text-center text-muted-foreground mt-4">
      All images are Unsplash &ndash; feel free to get inspired!
    </div>
  </main>
);
