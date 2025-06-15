
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

  // Calculate desktop/mobile classes for image sizing
  const mainImageClass =
    "rounded-2xl overflow-hidden border-2 border-white/70 shadow-2xl bg-white/40 aspect-square flex justify-center items-center " +
    "w-[90vw] h-[90vw] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] 2xl:w-[680px] 2xl:h-[680px] " +
    "max-w-[98vw] mx-auto hover:shadow-pink-200 transition-all duration-300";
  const extraImageClass =
    "rounded-xl overflow-hidden border-2 border-white/60 shadow-lg bg-white/60 aspect-square flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 " +
    "h-[17vw] w-[17vw] sm:h-[90px] sm:w-[90px] md:h-[150px] md:w-[150px] lg:h-[190px] lg:w-[190px] min-h-0";

  // Premium glass bubble for the header
  return (
    <main className="w-full flex flex-col items-center pt-2 pb-0 bg-hygge-1 min-h-screen">
      {/* Glassy Premium Bubble Header */}
      <div
        className="relative flex flex-col items-center mt-2 mb-3 sm:mb-7"
        style={{ zIndex: 3 }}
      >
        <div
          className={`px-7 py-4 rounded-[2.5rem] shadow-2xl bg-gradient-to-tr from-white/60 via-pink-100/60 to-indigo-100/80 border border-white/30 
              backdrop-blur-[14px] transition-colors 
              animate-fade-in font-playfair font-extrabold text-[2.1rem] sm:text-4xl md:text-5xl text-center tracking-tight leading-[1.13] text-gray-900 relative`}
          style={{
            boxShadow: "0 16px 48px 0 rgba(217,112,193,0.13), 0 2px 14px 0 rgba(100,180,255,0.08)",
            border: "2.5px solid rgba(255,255,255,0.18)",
            background: "linear-gradient(120deg, #fffafd 65%, #f8e6ff 100%)",
            backdropFilter: "blur(18px)",
          }}
        >
          <span className="block drop-shadow-[0_2px_8px_rgba(244,152,224,0.11)]">
            I need an image for
          </span>
        </div>
        {/* Label select tightly below the bubble */}
        <div className="flex justify-center w-full mt-2 mb-0 relative z-10">
          <select
            className={`rounded-xl px-6 py-2 border-none font-bold text-lg outline-none text-gray-900 shadow-lg cursor-pointer 
              bg-gradient-to-tr ${labelGradients[selected]} transition-colors min-w-[140px] max-w-xs duration-200`}
            value={selected}
            onChange={e => setSelected(e.target.value)}
            aria-label="Select a label"
            style={{
              border: "1.2px solid rgba(222,182,255,0.23)",
              boxShadow: "0 4px 18px 0 rgba(90,60,170,0.09)"
            }}
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
      </div>
      {/* Main content grid */}
      <div
        className="
          relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-12 items-start px-2 md:px-7 mt-1
          "
        style={{
          alignItems: "start",
        }}
      >
        {/* LEFT: 4 quotes/messages */}
        <section className="flex flex-col gap-3 w-full md:w-[95%] mt-0 md:mt-1">
          {fourMessages.map(
            (msg, idx) =>
              msg && (
                <div
                  className="bg-white/85 rounded-2xl px-5 py-3 text-base md:text-lg text-gray-800 font-playfair border border-gray-200 shadow animate-fade-in"
                  key={idx}
                >
                  {msg}
                </div>
              )
          )}
        </section>
        {/* RIGHT: Images stack */}
        <section className="flex flex-col gap-5 items-center w-full md:w-[99%] mt-0">
          {/* Main image */}
          {mainImage && (
            <div className={mainImageClass}>
              <img
                src={mainImage}
                alt="Main generated"
                className="w-full h-full object-cover object-center"
                draggable={false}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "1.9rem"
                }}
              />
            </div>
          )}
          {/* Extra images grid */}
          <div
            className="
              grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full
            "
          >
            {extraImages.map((img, i) => (
              <div
                key={i}
                className={extraImageClass}
                style={{
                  minHeight: 0,
                  border: "1.2px solid rgba(220,183,246,0.19)",
                  boxShadow: "0 6px 26px 0 rgba(145,178,236,0.10)"
                }}
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
      {/* Push footer lower if needed */}
      <div className="h-3 md:h-6"></div>
    </main>
  );
};
