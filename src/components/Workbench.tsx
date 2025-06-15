
import React from "react";
import { aiLabels, aiImages, aiQuotes } from "../data/demo";

// Gradient backgrounds per label
const labelGradients: Record<string, string> = {
  morning: "from-yellow-300/70 via-orange-200/70 to-yellow-100/80",
  apology: "from-blue-200/80 via-blue-100/70 to-blue-50/85",
  love: "from-rose-200/90 via-pink-100/80 to-rose-50/90",
  motivation: "from-teal-200/80 via-green-100/70 to-teal-50/80",
  knowledge: "from-violet-200/80 via-indigo-100/70 to-violet-50/70",
  night: "from-blue-900/90 via-slate-600/80 to-blue-400/70",
};

export const Workbench: React.FC = () => {
  // Use the first label as the default
  const [selected, setSelected] = React.useState(aiLabels[0].value);

  // FIX: Filter images and messages for selected label, where label is now an array
  const labelImages = aiImages.filter((img) =>
    Array.isArray(img.label) ? img.label.includes(selected) : img.label === selected
  );
  
  // Show up to 5 images (main + 4 extra)
  const mainImage = labelImages[0]?.url || "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=900&q=80";
  const extraImages = labelImages.slice(1, 5).map(i => i.url);
  // If less than 5 images, fill with placeholder(s)
  while (extraImages.length < 4) {
    extraImages.push(
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
    );
  }

  const messages = (aiQuotes as Record<string, string[]>)[selected] ?? [];
  const fourMessages = Array(4)
    .fill("")
    .map((_, i) => messages[i] || "");

  return (
    <main className="min-h-screen flex items-center justify-center bg-hygge-1 px-2 py-12">
      <div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
        style={{ alignItems: "stretch" }}
      >
        {/* LEFT: Prompt bar + 4 messages */}
        <section className="flex flex-col gap-7">
          {/* Prompt bar */}
          <div className="flex rounded-2xl shadow border font-semibold text-lg text-gray-900 bg-gradient-to-tr from-white via-white/90 to-white px-3 py-4 items-center w-full">
            <span className="text-base md:text-lg mr-3 select-none font-medium">
              Get me an image for
            </span>
            <select
              className={`rounded-xl px-4 py-2 border-none font-bold text-base outline-none ml-2
                text-gray-900 shadow-sm cursor-pointer bg-gradient-to-tr transition-colors min-w-[150px]
                ${labelGradients[selected]} duration-200`}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              aria-label="Select a label"
            >
              {aiLabels.map((lbl) => (
                <option
                  key={lbl.value}
                  value={lbl.value}
                  className="font-semibold"
                  style={{
                    color: "#291b1b",
                    background:
                      "linear-gradient(to top right, #fffbe8 0%, #ffe0ee 50%, #e8f8ff 100%)",
                  }}
                >
                  {lbl.text}
                </option>
              ))}
            </select>
          </div>
          {/* 4 messages */}
          <div className="flex flex-col gap-3 w-full">
            {fourMessages.map(
              (msg, idx) =>
                msg && (
                  <div
                    className="bg-white/85 rounded-lg px-4 py-2 text-base text-gray-800 font-playfair border border-gray-200 shadow"
                    key={idx}
                  >
                    {msg}
                  </div>
                )
            )}
          </div>
        </section>

        {/* RIGHT: Images grid */}
        <section className="flex flex-col gap-4">
          {/* Main image */}
          <div className="rounded-2xl overflow-hidden border border-white/60 shadow-xl mb-0 h-[240px] w-full flex justify-center items-center bg-white/60">
            <img
              src={mainImage}
              alt="Main generated"
              className="w-full h-full object-cover object-center"
              style={{ maxHeight: 240, borderRadius: "1.25rem" }}
              draggable={false}
            />
          </div>
          {/* Extra images in a grid */}
          <div className="grid grid-cols-4 gap-3">
            {extraImages.map((url, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-white/50 shadow bg-white/80 aspect-square flex items-center justify-center"
                style={{ minHeight: 0 }}
              >
                <img
                  src={url}
                  alt={`Generated for ${selected}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
