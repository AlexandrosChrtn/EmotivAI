import React from "react";
import { aiLabels, aiImages, aiQuotes } from "../data/demo";
import { GlassTextOverlay } from "./GlassTextOverlay";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

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

  // Store the current displayed images order for this label
  const getFirstFiveImages = React.useCallback((label: string) => {
    return aiImages
      .filter((img) =>
        Array.isArray(img.label) ? img.label.includes(label) : img.label === label
      )
      .slice(0, 5);
  }, []);
  const [displayedImages, setDisplayedImages] = React.useState(getFirstFiveImages(selected));

  // The color background uses labelGradients based on selected.
  const currentGradient = labelGradients[selected];

  const messages = (aiQuotes as Record<string, string[]>)[selected] ?? [];
  const fourMessages = Array(4)
    .fill("")
    .map((_, i) => messages[i] || "");

  // ----------- Imprinting Quote and Creating Image ------------
  // Set initial imprintedQuote to the first quote
  const [imprintedQuote, setImprintedQuote] = React.useState<string>(fourMessages[0]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [generatedDataUrl, setGeneratedDataUrl] = React.useState<string>("");

  // When label changes, reset images and set imprintedQuote to first quote for the label
  React.useEffect(() => {
    setDisplayedImages(getFirstFiveImages(selected));
    setImprintedQuote(messages[0] || ""); // default to first quote
  }, [selected, getFirstFiveImages, messages]);

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

  // Helper to create image with quote overlay via canvas
  const handleCreateImage = async () => {
    // Load image
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = mainImage;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Canvas size matches displayed
    const size = 500; // for square preview, or img.naturalWidth
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw main image
    ctx.drawImage(img, 0, 0, size, size);

    // Render quote overlay using similar style to homepage
    if (imprintedQuote) {
      // Glassmorphic overlay
      // White with alpha bg
      const overlayW = size * 0.84;
      const overlayH = size * 0.24;
      const overlayX = size * 0.08;
      const overlayY = size * 0.70;
      ctx.save();
      ctx.globalAlpha = 0.68;
      // Rounded rectangle
      ctx.fillStyle = "#fff";
      roundRect(ctx, overlayX, overlayY, overlayW, overlayH, 24);
      ctx.fill();
      ctx.restore();

      // Quote text (centered, multi-line if needed)
      ctx.save();
      ctx.font = "700 22px 'Playfair Display', serif";
      ctx.fillStyle = "#303160";
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      // Simple multi-line wrapping
      const lines = wrapTextLines(
        ctx,
        imprintedQuote,
        overlayW - 30,
        "700 22px 'Playfair Display', serif"
      );
      let textY = overlayY + (overlayH - lines.length * 26) / 2;
      lines.forEach((line) => {
        ctx.fillText(line, size / 2, textY);
        textY += 26;
      });
      ctx.restore();
    }
    setGeneratedDataUrl(canvas.toDataURL("image/png"));
    setDialogOpen(true);
  };

  // Helper: draw rounded rectangle (for glass overlay bg)
  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Helper: wrap text for quote
  function wrapTextLines(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    font: string
  ) {
    ctx.font = font;
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
      const test = line + (line ? " " : "") + word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  // Copy dataUrl to clipboard as image
  const handleCopy = async () => {
    if (!generatedDataUrl) return;
    try {
      const res = await fetch(generatedDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new window.ClipboardItem({ [blob.type]: blob }),
      ]);
      alert("Image copied! You can now paste it to your friends 🎉");
    } catch (err) {
      alert("Copy failed. Try saving the image manually.");
    }
  };

  // Render the main UI
  return (
    <main className="w-full flex flex-col items-center pt-4 pb-8 bg-hygge-1 min-h-screen">
      {/* Unified "I need an image for {LabelDropdown}" Header */}
      <section className={`w-full flex flex-col items-center justify-center mb-10 px-4`}>
        <div
          className={`
            w-full max-w-lg rounded-3xl border-2 border-white/50 shadow-xl 
            bg-gradient-to-tr ${currentGradient} 
            py-7 px-6 sm:px-10 flex flex-wrap items-center justify-center gap-3
            backdrop-blur-md 
            animate-fade-in
          `}
          style={{
            boxShadow:
              "0 16px 32px -8px rgba(0,0,0,0.07), 0 2px 18px 0px rgba(0,0,0,0.13)",
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
              onChange={(e) => setSelected(e.target.value)}
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
              {aiLabels.map((lbl) => (
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

      {/* Main Content: Side by Side */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 px-4 items-start justify-center">
        {/* LEFT: Quotes and Extra Images */}
        <section className="flex-1 min-w-[285px] max-w-md flex flex-col gap-6 md:border-r md:border-gray-200 pb-6 md:pb-0 md:pr-8">
          {/* Quotes Section Title */}
          <div className="flex flex-col gap-1">
            <div className="text-xs font-semibold text-gray-500 tracking-wide uppercase mb-1 pl-1">
              Choose quote
            </div>
            {/* Quotes */}
            {fourMessages.map(
              (msg, idx) =>
                msg && (
                  <button
                    type="button"
                    key={idx}
                    className={`
                      relative
                      bg-white/90 rounded-xl px-5 py-3 text-base lg:text-lg text-gray-800 font-playfair border shadow-lg transition
                      min-h-[68px] min-w-full h-[68px] flex items-center justify-center text-center
                      ${imprintedQuote === msg
                        ? "border-green-500 ring-2 ring-green-400 ring-offset-2 scale-[1.04] bg-primary/10 shadow-green-100/60"
                        : "border-white/60 hover:bg-white/100 hover:shadow-2xl"}
                    `}
                    style={{
                      boxShadow: "0 8px 25px -8px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      minHeight: "68px",
                      minWidth: "100%",
                      height: "68px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      whiteSpace: "normal",
                      position: "relative",
                    }}
                    onClick={() => setImprintedQuote(msg)}
                    aria-pressed={imprintedQuote === msg}
                  >
                    {imprintedQuote === msg && (
                      <span
                        className="absolute top-1.5 right-2 bg-white rounded-full border border-green-400 p-0.5 shadow-sm"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-label="Selected"
                      >
                        <Check size={13} color="#16a34a" strokeWidth={2.5} />
                      </span>
                    )}
                    {msg}
                  </button>
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
                  boxShadow: "0 10px 25px -8px rgba(0,0,0,0.12)",
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
          {/* "Create Image" Button */}
          <div className="flex flex-col items-center mt-5">
            <Button
              variant="default"
              size="lg"
              className="rounded-full px-8 py-3 font-playfair text-lg"
              onClick={handleCreateImage}
              disabled={!mainImage || !imprintedQuote}
              aria-label={
                !imprintedQuote
                  ? "Select a quote to imprint before creating image"
                  : "Create image with quote"
              }
            >
              Create image
            </Button>
            {!imprintedQuote && (
              <div className="text-xs text-gray-400 mt-2">
                Select a quote above to imprint it on your image!
              </div>
            )}
          </div>
        </section>

        {/* RIGHT: Main Image */}
        <section className="flex-1 min-w-[285px] max-w-lg flex flex-col items-center justify-start">
          {/* Section Title */}
          <div className="text-xs font-semibold text-gray-500 mb-1 tracking-wide uppercase self-start">
            Your image
          </div>
          {mainImage && (
            <div
              className="relative rounded-2xl overflow-hidden border-3 border-white/70 shadow-2xl bg-white/40 aspect-square flex justify-center items-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[425px] lg:h-[425px] hover:shadow-pink-200/50 transition-all duration-300"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={mainImage}
                alt="Main generated"
                className="w-full h-full object-cover"
                draggable={false}
              />
              {imprintedQuote && (
                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-[84%] max-w-[96%]">
                  <GlassTextOverlay quote={imprintedQuote} theme={selected as any} />
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Dialog for generated image and copy/share */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Your shareable image is ready!</DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col items-center gap-4 py-3">
            {generatedDataUrl && (
              <img
                src={generatedDataUrl}
                alt="Your generated quote image"
                className="rounded-xl shadow-lg max-w-full max-h-[360px] border"
                style={{ background: "#fff" }}
              />
            )}
            <div className="flex flex-col gap-3 w-full mt-2">
              <Button
                onClick={handleCopy}
                className="font-semibold w-full rounded-full"
              >
                Copy image
              </Button>
              <a
                href={generatedDataUrl}
                download="image-with-quote.png"
                className="w-full"
              >
                <Button
                  className="w-full rounded-full"
                  variant="outline"
                  type="button"
                >
                  Download image
                </Button>
              </a>
              <span className="text-xs text-muted-foreground pt-2 text-center">
                Paste or send this image anywhere you want! <br />
                If copy fails, tap "Download" to save it manually.
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};
