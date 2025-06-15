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

  // MAIN + new Layout
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start bg-hygge-1 px-1 pt-3 pb-0">
      {/* Header */}
      <h1 className="w-full text-center text-2xl md:text-4xl font-extrabold font-playfair mb-2 md:mb-4 leading-tight">
        I need an image for
      </h1>
      {/* Fancy select below header, centered */}
      <div className="flex justify-center w-full mb-3 md:mb-6">
        <select
          className={`rounded-xl px-5 py-2 border-none font-bold text-lg outline-none
            text-gray-900 shadow-sm cursor-pointer bg-gradient-to-tr transition-colors min-w-[150px] max-w-xs
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
      {/* Quotes & Images grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 items-start justify-center"
           style={{ alignItems: "start" }}
      >
        {/* LEFT: 4 quotes/messages */}
        <section className="flex flex-col gap-2 md:gap-3 mt-0 md:mt-1 w-full md:w-[95%]">
          {fourMessages.map(
            (msg, idx) =>
              msg && (
                <div
                  className="bg-white/85 rounded-xl md:rounded-2xl px-4 py-2  text-[0.99rem] md:text-lg text-gray-800 font-playfair border border-gray-200 shadow"
                  key={idx}
                >
                  {msg}
                </div>
              )
          )}
        </section>

        {/* RIGHT: Images stack */}
        <section className="flex flex-col gap-4 items-center w-full md:w-[99%] mt-2 md:mt-0">
          {/* Main image */}
          {mainImage && (
            <div
              className="
                rounded-2xl overflow-hidden border border-white/60 shadow-xl
                bg-white/60 aspect-square flex justify-center items-center
                w-[90vw] h-[90vw]
                sm:w-[390px] sm:h-[390px]
                md:w-[420px] md:h-[420px]
                lg:w-[480px] lg:h-[480px]
                max-w-[95vw] md:max-w-[480px] mx-auto
                "
            >
              <img
                src={mainImage}
                alt="Main generated"
                className="w-full h-full object-cover object-center"
                draggable={false}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  aspectRatio: "1 / 1"
                }}
              />
            </div>
          )}
          {/* Extra images grid */}
          <div
            className="
              grid grid-cols-4 gap-2 md:gap-3 w-full
              "
          >
            {extraImages.map((img, i) => (
              <div
                key={i}
                className="
                  rounded-xl overflow-hidden border border-white/50 shadow bg-white/80 aspect-square flex items-center justify-center cursor-pointer hover:scale-105 transition-transform
                  h-[18vw] w-[18vw]
                  sm:h-[70px] sm:w-[70px]
                  md:h-[130px] md:w-[130px]
                  lg:h-[142px] lg:w-[142px]
                  min-h-0
                "
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
