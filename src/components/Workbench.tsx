
import React from "react";
import { aiLabels, aiQuotes } from "../data/demo";

const labelGradients: Record<string, string> = {
  morning: "from-yellow-300/70 via-orange-200/70 to-yellow-100/80",
  apology: "from-blue-200/70 via-blue-100/70 to-blue-50/80",
  love: "from-rose-200/70 via-pink-100/70 to-rose-50/80",
  motivation: "from-teal-200/70 via-green-100/70 to-teal-50/80",
  knowledge: "from-violet-200/70 via-indigo-100/70 to-violet-50/80",
  night: "from-blue-800/90 via-slate-600/80 to-blue-500/70",
};

export const Workbench: React.FC = () => {
  const [selected, setSelected] = React.useState(aiLabels[0].value);
  const messages = (aiQuotes as Record<string, string[]>)[selected] ?? [];
  const fourMessages = Array(4)
    .fill("")
    .map((_, i) => messages[i] || "");

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-hygge-1 px-2 py-12">
      {/* Centered Glassy Box */}
      <div className="bg-white/70 rounded-3xl shadow-lg px-7 py-10 flex flex-col items-center gap-8 max-w-xl w-full border border-white/40">
        {/* Main Prompt with integrated dropdown */}
        <div className="w-full flex items-center justify-center">
          <div className="flex w-full rounded-xl shadow border font-semibold text-lg text-gray-900 bg-gradient-to-tr from-white via-white/90 to-white px-2 py-3 items-center">
            <span className="ml-2 text-base md:text-lg mr-3 select-none">Get me an image for</span>
            <select
              className={`rounded-xl px-4 py-2 border-none font-bold text-base outline-none ml-2
                text-gray-900 shadow-sm cursor-pointer bg-gradient-to-tr
                ${labelGradients[selected]} transition-colors min-w-[150px]`}
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
        </div>
        {/* Placeholder image */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-white/60 mb-2">
          <img
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=520&q=80"
            alt="Placeholder"
            className="w-[320px] h-[230px] object-cover"
            draggable={false}
          />
        </div>
        {/* Four Messages for selected label */}
        <div className="flex flex-col gap-3 w-full">
          {fourMessages.map(
            (msg, idx) =>
              msg && (
                <div
                  className="bg-white/80 rounded-lg px-4 py-2 text-base text-gray-800 font-playfair border border-gray-200 shadow-sm"
                  key={idx}
                >
                  {msg}
                </div>
              )
          )}
        </div>
      </div>
    </main>
  );
};
