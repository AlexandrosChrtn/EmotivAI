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
    const main = displayedImages[0];
    const newMain = displayedImages[imgIdx + 1];
    const newImages = [...displayedImages];
    newImages[0] = newMain;
    newImages[imgIdx + 1] = main;
    setDisplayedImages(newImages);
  };

  // The color background uses labelGradients based on selected.
  const currentGradient = labelGradients[selected];

  const messages = (aiQuotes as Record<string, string[]>)[selected] ?? [];
  const fourMessages = Array(4).fill("").map((_, i) => messages[i] || "");

  return (
    <main className="w-full flex flex-col items-center pt-4 pb-8 bg-hygge-1 min-h-screen">
      {/* Unified "I need an image for {LabelDropdown}" Header */}
      <section
        className={`w-full flex flex-col items-center justify-center mb-10 px-4`}
      >
        <div
          className={`
            w-full max-w-lg rounded-3xl border-2 border-white/50 shadow-xl 
            bg-gradient-to-tr ${currentGradient} 
            py-7 px-6 sm:px-10 flex flex-wrap items-center justify-center gap-3
            backdrop-blur-md 
            animate-fade-in
          `}
          style={{
            boxShadow: "0 16px 32px -8px rgba(0,0,0,0.07), 0 2px 18px 0px rgba(0,0,0,0.13)",
          }}
        >
          <h1 className="font-playfair font-bold text-2xl sm:text-3xl text-gray-900 whitespace-nowrap text-center w-full flex flex-wrap items-center justify-center gap-2">
            I need an image for&nbsp;
            <select
              className={`
                font-playfair
                px-4 py-2 rounded-full border-2 border-white/50 font-bold 
                transition focus:ring-2 focus:ring-primary/60 focus:outline-none
                bg-white/80 shadow-sm
                hover:bg-white
                backdrop-blur-[8px]
                ring-1 ring-white/25
                text-gray-900 
                glass
                min-w-[130px] select-dropdown
              `}
              value={selected}
              onChange={e => setSelected(e.target.value)}
              aria-label="Select a label"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.625em", // 10px if 16px parent, 8pt smaller than ~18px/1.1em original
                fontWeight: 700,
                borderRadius: "2em",
                border: "1.5px solid rgba(250,250,250,.26)",
                background: "rgba(255,255,255,0.54)",
                boxShadow: "0 2px 8px 0 rgba(200,130,205,0.09)",
                minWidth: 130,
                outline: "none",
                letterSpacing: ".02em",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              {aiLabels.map(lbl => (
                <option
                  key={lbl.value}
                  value={lbl.value}
                  className="font-semibold font-playfair"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "0.625em", // match dropdown trigger
                  }}
                >
                  {lbl.text}
                </option>
              ))}
            </select>
          </h1>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        {/* LEFT: Main Image */}
        <section className="flex justify-center">
          {mainImage && (
            <div 
              className="rounded-2xl overflow-hidden border-3 border-white/70 shadow-2xl bg-white/40 aspect-square flex justify-center items-center 
                w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] 
                hover:shadow-pink-200/50 transition-all duration-300"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
              }}
            >
              <img
                src={mainImage}
                alt="Main generated"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          )}
        </section>

        {/* RIGHT: Quotes and Extra Images */}
        <section className="flex flex-col gap-6">
          {/* Quotes */}
          <div className="flex flex-col gap-3">
            {fourMessages.map(
              (msg, idx) =>
                msg && (
                  <div
                    className="bg-white/90 rounded-xl px-5 py-3 text-base lg:text-lg text-gray-800 font-playfair border border-white/60 shadow-lg"
                    key={idx}
                    style={{
                      boxShadow: "0 8px 25px -8px rgba(0,0,0,0.1)"
                    }}
                  >
                    {msg}
                  </div>
                )
            )}
          </div>
          
          {/* Extra Images */}
          <div className="grid grid-cols-2 gap-4">
            {extraImages.map((img, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border-2 border-white/60 shadow-lg bg-white/60 aspect-square flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                style={{
                  boxShadow: "0 10px 25px -8px rgba(0,0,0,0.12)"
                }}
                onClick={() => handleExtraImageClick(i)}
                tabIndex={0}
                aria-label="Use this image as main"
                title="Click to make main image"
              >
                <img
                  src={img.url}
                  alt={`Generated for ${selected}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
