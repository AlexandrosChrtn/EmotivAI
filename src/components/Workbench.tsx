import React from "react";
import { demoImages, demoQuotes, aiLabels, aiImages, aiQuotes } from "../data/demo";
import { GlassTextOverlay } from "./GlassTextOverlay";
import { LabelBadge } from "./LabelBadge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type WorkbenchMode = "manual" | "ai";

// simple local state demo: select image, select quote, see preview

export const Workbench: React.FC = () => {
  const [mode, setMode] = React.useState<"manual" | "ai">("ai");

  // AI Mode state
  const [selectedLabel, setSelectedLabel] = React.useState(aiLabels[0].value);
  const activeImage =
    aiImages.find((img) => img.label === selectedLabel) || aiImages[0];
  const relatedQuotes = aiQuotes[selectedLabel as keyof typeof aiQuotes];
  const [selectedQuote, setSelectedQuote] = React.useState(
    relatedQuotes[0] || ""
  );

  React.useEffect(() => {
    // Change quote when label changes
    setSelectedQuote(relatedQuotes[0]);
  }, [selectedLabel]);

  const [img, setImg] = React.useState(demoImages[0]);
  const [qIdx, setQIdx] = React.useState(0);

  const quote = demoQuotes[qIdx];

  return (
    <main className="w-full max-w-4xl mx-auto py-8">
      {/* Mode switcher */}
      <div className="flex justify-center mb-6 gap-2">
        <Button
          variant={mode === "ai" ? "default" : "outline"}
          onClick={() => setMode("ai")}
          className="min-w-[96px]"
        >
          AI Generator
        </Button>
        <Button
          variant={mode === "manual" ? "default" : "outline"}
          onClick={() => setMode("manual")}
          className="min-w-[96px]"
        >
          Manual
        </Button>
      </div>
      {/* --- AI Generator Mode --- */}
      {mode === "ai" && (
        <section>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4 text-center text-primary">
            AI Image Generator
          </h2>
          <div className="flex flex-col items-center gap-8">
            {/* Label (Use) selection */}
            <div className="w-full max-w-xs">
              <label
                htmlFor="use-select"
                className="block mb-1 text-base font-semibold text-muted-foreground"
              >
                Get me an image for...
              </label>
              <Select
                value={selectedLabel}
                onValueChange={(val) => setSelectedLabel(val)}
              >
                <SelectTrigger id="use-select">
                  <SelectValue placeholder="Choose a theme..." />
                </SelectTrigger>
                <SelectContent>
                  {aiLabels.map((lbl) => (
                    <SelectItem key={lbl.value} value={lbl.value}>
                      <span className="inline-flex items-center gap-2">
                        <LabelBadge label={lbl.value as keyof typeof aiQuotes} />
                        {lbl.text}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Selected Image & Description */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={activeImage.url}
                  alt={activeImage.alt}
                  className="rounded-2xl shadow-lg w-[320px] h-[300px] sm:w-[340px] sm:h-[320px] object-cover mb-2"
                  draggable={false}
                  style={{ border: "2.5px solid #fff" }}
                />
                <div className="absolute top-3 left-3">
                  <LabelBadge label={activeImage.label as keyof typeof aiQuotes} />
                </div>
              </div>
              <div className="space-y-2 min-w-[190px]">
                <div className="text-muted-foreground italic text-base">
                  {activeImage.description}
                </div>
                <div className="mt-2">
                  <span className="font-bold text-sm text-gray-700">
                    Select your favorite message:
                  </span>
                  <div className="flex flex-col gap-2 mt-1">
                    {relatedQuotes.map((qt) => (
                      <Button
                        key={qt}
                        variant={selectedQuote === qt ? "default" : "secondary"}
                        className={cn(
                          "w-full text-left whitespace-normal",
                          selectedQuote === qt
                            ? "border-primary bg-gradient-to-r from-yellow-50 via-white to-yellow-100" : "border"
                        )}
                        onClick={() => setSelectedQuote(qt)}
                      >
                        <span>{qt}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Display chosen quote below image on colored card */}
            <div className="mt-6 px-8 py-5 rounded-xl bg-white/90 shadow border flex flex-col items-center gap-2 max-w-lg mx-auto">
              <LabelBadge
                label={selectedLabel as keyof typeof aiQuotes}
                className="mb-1"
              />
              <span className="block text-lg text-center font-playfair font-semibold text-primary tracking-tight">
                {selectedQuote}
              </span>
            </div>
          </div>
        </section>
      )}
      {/* --- Manual mode (keep unchanged for now) --- */}
      {mode === "manual" && (
        <section>
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
        </section>
      )}
    </main>
  );
};
