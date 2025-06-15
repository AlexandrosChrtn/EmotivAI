
import React from "react";
import { aiLabels, aiImages, aiQuotes } from "../data/demo";

// Gradient backgrounds per label
const labelGradients: Record<string, string> = {
  morning: "from-yellow-300/70 via-orange-200/70 to-yellow-100/80",
  apology: "from-blue-200/80 via-blue-100/70 to-blue-50/85",
  love: "from-rose-200/90 via-pink-100/80 to-rose-50/90",
  motivation: "from-teal-200/80 via-green-100/70 to-teal-50/80",
  knowledge: "from-violet-200/80 via-indigo-100/70 to-violet-50/70",
  night: "from-blue-900/90 via-slate-600/80 to-blue-400/70"
};
export const Workbench: React.FC = () => {
  // Use the first label as the default
  const [selected, setSelected] = React.useState(aiLabels[0].value);

  // Store the current displayed images order for this label
  const getFirstFiveImages = React.useCallback((label: string) => {
    return aiImages
      .filter(img => Array.isArray(img.label) ? img.label.includes(label) : img.label === label)
      .slice(0, 5);
  }, []);
  const [displayedImages, setDisplayedImages] = React.useState(getFirstFiveImages(selected));

  // When label changes, reset displayedImages to first 5 for new label
  React.useEffect(() => {
    setDisplayedImages(getFirstFiveImages(selected));
  }, [selected, getFirstFiveImages]);
  const mainImage = displayedImages[0]?.url || "";
  const extraImages = displayedImages.slice(1);

  // Swap the main image with one of the selected images
  const handleExtraImageClick = (imgIdx: number) => {
    // imgIdx is the index in extraImages (0..3)
    const main = displayedImages[0];
    const newMain = displayedImages[imgIdx + 1]; // +1 because mainImage is 0
    const newImages = [...displayedImages];
    // Swap
    newImages[0] = newMain;
    newImages[imgIdx + 1] = main;
    setDisplayedImages(newImages);
  };
  const messages = (aiQuotes as Record<string, string[]>)[selected] ?? [];
  const fourMessages = Array(4).fill("").map((_, i) => messages[i] || "");

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-hygge-1 px-2 pt-6 pb-0">
      <div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start"
        style={{ alignItems: "start" }}
      >
        {/* LEFT: Prompt bar + 4 messages */}
        <section className="flex flex-col gap-5 md:gap-7 mt-1">
          {/* Prompt bar */}
          <div className="flex rounded-2xl shadow border font-semibold text-lg text-gray-900 bg-gradient-to-tr from-white via-white/90 to-white px-3 py-3 items-center w-full">
            <span className="text-base md:text-lg mr-3 select-none font-medium">
              I need an image for
            </span>
            <select
              className={`rounded-xl px-4 py-2 border-none font-bold text-base outline-none ml-2
                text-gray-900 shadow-sm cursor-pointer bg-gradient-to-tr transition-colors min-w-[150px]
                ${labelGradients[selected]} duration-200`}
              value={selected}
              onChange={e => setSelected(e.target.value)}
              aria-label="Select a label"
            >
              {aiLabels.map(lbl => (
                <option
                  key={lbl.value}
                  value={lbl.value}
                  className="font-semibold"
                  style={{
                    color: "#291b1b",
                    background: "linear-gradient(to top right, #fffbe8 0%, #ffe0ee 50%, #e8f8ff 100%)"
                  }}
                >
                  {lbl.text}
                </option>
              ))}
            </select>
          </div>
          {/* 4 messages */}
          <div className="flex flex-col gap-2 w-full">
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
        <section className="flex flex-col gap-3 md:gap-4">
          {/* Main image */}
          {mainImage && (
            <div
              className="rounded-2xl overflow-hidden border border-white/60 shadow-xl h-[340px] w-full max-w-[340px] mx-auto bg-white/60 aspect-square flex justify-center items-center"
            >
              <img
                src={mainImage}
                alt="Main generated"
                className="w-full h-full object-cover object-center"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  aspectRatio: "1 / 1"
                }}
                draggable={false}
              />
            </div>
          )}
          {/* Extra images in a grid */}
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {extraImages.map((img, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-white/50 shadow bg-white/80 aspect-square flex items-center justify-center cursor-pointer hover:scale-105 transition-transform h-[84px] w-[84px] md:h-[110px] md:w-[110px]"
                style={{ minHeight: 0 }}
                onClick={() => handleExtraImageClick(i)}
                tabIndex={0}
                aria-label={`Use this image as main`}
                title="Click to make main image"
              >
                <img
                  src={img.url}
                  alt={`Generated for ${selected}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    aspectRatio: "1 / 1"
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
