import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryImage } from "../data/content";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) =>
      setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 md:gap-5">
        {images.map((im, i) => (
          <motion.button
            key={im.src + i}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIndex(i)}
            className="group relative mb-3 block w-full overflow-hidden bg-beige md:mb-5"
            aria-label={`View image: ${im.alt}`}
          >
            <img
              src={im.src}
              alt={im.alt}
              loading="lazy"
              className={`w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] ${
                im.tall ? "aspect-3/4" : "aspect-square"
              }`}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-espresso/0 opacity-0 transition-all duration-500 group-hover:bg-espresso/25 group-hover:opacity-100">
              <span className="eyebrow rounded-full border border-cream/60 px-4 py-2 text-cream">
                View
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-espresso/95 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <div className="flex items-center justify-between px-5 py-5 md:px-10">
              <span className="eyebrow text-cream/70">
                {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button
                onClick={close}
                className="eyebrow rounded-full border border-cream/30 px-5 py-2.5 text-cream transition-colors hover:bg-cream hover:text-espresso"
              >
                Close
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center px-4 pb-4">
              <motion.img
                key={images[index].src}
                src={images[index].src}
                alt={images[index].alt}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-h-[72vh] max-w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-cream/15 px-5 py-5 md:px-10">
              <button
                onClick={() => step(-1)}
                className="eyebrow text-cream/80 transition-colors hover:text-cream"
              >
                ← Previous
              </button>
              <p className="hidden max-w-md text-center text-[13px] font-light text-cream/60 md:block">
                {images[index].alt}
              </p>
              <button
                onClick={() => step(1)}
                className="eyebrow text-cream/80 transition-colors hover:text-cream"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
