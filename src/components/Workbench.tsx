
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

function gradientBadge(label: string, children: React.ReactNode) {
  return (
    <span
      className={`rounded-xl px-4 py-2 font-bold text-base text-gray-900 whitespace-nowrap shadow-sm bg-gradient-to-tr ${labelGradients[label] || "from-gray-200 to-gray-100"}`}
      style={{ letterSpacing: "0.03em", minWidth: 120, display: "inline-block", textAlign: "center"}}
    >
      {children}
    </span>
  );
}

export const Workbench: React.FC = () => {
  const [selected, setSelected] = React.useState(aiLabels[0].value);

  // Ensure 4 messages - fallback to empty strings if not enough
  const messages = (aiQuotes as Record<string, string[]>)[selected] ?? [];
  const fourMessages = Array(4)
    .fill("")
    .map((_, i) => messages[i] || "");

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-hygge-1 px-2 py-12">
      <div className="bg-white/70 rounded-3xl shadow-lg px-6 py-8 flex flex-col items-center gap-8 max-w-xl w-full border border-white/40">
        {/* Prompt */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="bg-white rounded-xl p-4 shadow border font-semibold text-lg mb-1 text-gray-900 w-full text-center">
            Get me an image for...
          </div>
          {/* Label dropdown */}
          <div className="w-full flex justify-center">
            <select
              className={`rounded-xl px-4 py-2 border shadow bg-gradient-to-tr ${labelGradients[selected]} font-bold text-base outline-none select-none`}
              style={{ minWidth: 180 }}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              aria-label="Select a label"
            >
              {aiLabels.map((lbl) => (
                <option
                  key={lbl.value}
                  value={lbl.value}
                  className={`font-semibold`}
                  style={{
                    color: "#291b1b",
                  }}
                >
                  {lbl.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Show label and messages */}
        <div className="flex flex-col items-center w-full gap-4">
          <div className="mb-1">{gradientBadge(selected, aiLabels.find((l) => l.value === selected)?.text || selected)}</div>
          {/* Placeholder image */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-white/60 mb-2">
            <img
              src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=520&q=80"
              alt="Placeholder"
              className="w-[320px] h-[230px] object-cover"
              draggable={false}
            />
          </div>
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
      </div>
    </main>
  );
};

