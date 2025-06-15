
import React from "react";
import { demoImages, demoQuotes } from "../data/demo";
import { GlassTextOverlay } from "./GlassTextOverlay";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";

// Font choices for selection
const fontOptions = [
  { label: "Playfair Display", value: "font-playfair" },
  { label: "Inter", value: "font-sans" },
  { label: "Arial", value: "font-arial" },
  { label: "Courier New", value: "font-courier" },
];

// Font-face utility
const fontClassFromValue = (fontValue: string) => {
  switch (fontValue) {
    case "font-playfair":
      return "font-playfair";
    case "font-sans":
      return "font-sans";
    case "font-arial":
      return "font-[Arial,sans-serif]";
    case "font-courier":
      return "font-[Courier_New,monospace]";
    default:
      return "font-sans";
  }
};

export const Workbench: React.FC = () => {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [img, setImg] = React.useState(demoImages[0]);
  const [font, setFont] = React.useState("font-playfair");
  const [quote, setQuote] = React.useState(demoQuotes[0]);

  // When image changes, reset to step 2 and default quote/font
  const handleSelectImage = (image: (typeof demoImages)[number]) => {
    setImg(image);
    setStep(2);
    setQuote(demoQuotes[0]);
    setFont("font-playfair");
  };

  // Step 1: Select image
  // Step 2: Select quote & font

  return (
    <main className="w-full max-w-3xl mx-auto py-8">
      <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-6 text-center text-primary">
        Your Cozy Creation
      </h2>
      <div className="flex flex-col gap-8 items-center justify-center">
        {/* Step 1: Select image */}
        {step === 1 && (
          <div className="space-y-5 w-full max-w-xl">
            <h3 className="text-lg font-semibold text-muted-foreground mb-1 text-center">
              Step 1: Choose a base image
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {demoImages.map((di) => (
                <button
                  className={`focus:outline-none transition-[transform,box-shadow] border-2 rounded-2xl p-0.5 w-full ${
                    img.id === di.id
                      ? "border-primary scale-105 ring-2 ring-primary/20"
                      : "border-transparent"
                  }`}
                  onClick={() => handleSelectImage(di)}
                  key={di.id}
                  aria-label={di.alt}
                >
                  <img
                    src={di.url}
                    alt={di.alt}
                    className="object-cover w-full h-60 max-h-[320px] rounded-xl"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
            <div className="w-full flex justify-center">
              <span className="text-center text-muted-foreground text-sm pt-2">
                Click an image to continue
              </span>
            </div>
          </div>
        )}

        {/* Step 2: Select quote & font (only after image selection) */}
        {step === 2 && (
          <div className="flex flex-col sm:flex-row gap-8 w-full items-center justify-center">
            {/* Preview */}
            <div className="w-full max-w-md flex items-center justify-center">
              <div className="relative rounded-2xl shadow-xl overflow-hidden transition-all min-h-[380px] min-w-[320px]">
                <img
                  src={img.url}
                  alt={img.alt}
                  className="object-cover w-full h-72 sm:h-80 brightness-97"
                  draggable={false}
                />
                {/* GlassTextOverlay: add font class */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-6 text-center pointer-events-none">
                  <GlassTextOverlay
                    quote={quote.text}
                    theme={quote.label as any}
                    fontClass={fontClassFromValue(font)}
                  />
                </div>
              </div>
            </div>
            {/* Controls */}
            <div className="flex-1 flex flex-col gap-6 w-full max-w-xs">
              {/* Quote Select */}
              <div>
                <label className="block text-base font-medium mb-1 text-muted-foreground">
                  Step 2: Choose a quote
                </label>
                <Select
                  value={quote.text}
                  onValueChange={(val) => {
                    const found = demoQuotes.find((q) => q.text === val);
                    if (found) setQuote(found);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a quote" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoQuotes.map((q, idx) => (
                      <SelectItem value={q.text} key={`${q.text}-${idx}`}>
                        <span className="block text-base font-playfair">{q.text}</span>
                        <span className="block text-xs text-muted-foreground">{q.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Font select */}
              <div>
                <label className="block text-base font-medium mb-1 text-muted-foreground">
                  Choose font
                </label>
                <Select
                  value={font}
                  onValueChange={setFont}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((f) => (
                      <SelectItem value={f.value} key={f.value}>
                        <span className={fontClassFromValue(f.value) + " text-base"}>
                          {f.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Go back button */}
              <button
                className="mt-4 text-xs underline text-muted-foreground"
                onClick={() => setStep(1)}
              >
                &larr; Go back to image selection
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="text-center text-muted-foreground mt-8 text-sm">
        (Select an image, then customize your cozy quote and font!)
      </div>
    </main>
  );
};
