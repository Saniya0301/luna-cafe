import { useState } from "react";
import { GALLERY, type GalleryCategory } from "../data/content";
import { IMG } from "../data/images";
import { GalleryGrid } from "../components/GalleryGrid";
import { PageHero, useTitle } from "../components/ui";

const CATS: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "coffee", label: "Coffee" },
  { id: "space", label: "Space" },
  { id: "people", label: "People" },
  { id: "events", label: "Events" },
];

export default function Gallery() {
  useTitle(
    "Luna Café Gallery — Coffee, Food & Space",
    "A visual glimpse of Luna Café: the coffee, the plates, the room and the people in it."
  );
  const [cat, setCat] = useState<GalleryCategory | "all">("all");
  const images = cat === "all" ? GALLERY : GALLERY.filter((g) => g.cat === cat);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            A glimpse
            <br />
            <span className="italic font-light text-olive">of Luna.</span>
          </>
        }
        intro="Mornings, plates, corners and evenings — photographed across a year of ordinary days at the café."
        image={IMG.latteArt}
        alt="Latte art poured into a warm ceramic cup"
      />

      <div className="sticky top-[100px] z-30 border-b hairline bg-cream/95 backdrop-blur-md">
        <div className="shell py-4">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 no-scrollbar md:mx-0 md:px-0">
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                aria-pressed={cat === c.id}
                className={`eyebrow shrink-0 rounded-full border px-5 py-2.5 transition-all duration-400 ${
                  cat === c.id
                    ? "border-espresso bg-espresso text-cream"
                    : "border-espresso/20 text-taupe hover:border-espresso/60 hover:text-espresso"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="shell py-14 md:py-20">
        <p className="eyebrow mb-8 text-taupe">
          {images.length} image{images.length === 1 ? "" : "s"} · click to enlarge
        </p>
        <GalleryGrid images={images} />
      </section>
    </>
  );
}
