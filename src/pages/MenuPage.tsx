import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CATEGORIES, FILTERS, MENU, type Category, type MenuItem, type Tag } from "../data/menu";
import { IMG } from "../data/images";
import { MenuItemModal, MenuRow } from "../components/MenuBits";
import { Button, Eyebrow, PageHero, Reveal, useTitle } from "../components/ui";
import { wa } from "../data/content";

const GROUP_ORDER: Category[] = [
  "coffee",
  "breakfast",
  "brunch",
  "lunch",
  "dessert",
  "drinks",
];

const GROUP_NOTE: Record<Category, string> = {
  coffee: "Seasonal house blend, dialled in each morning.",
  breakfast: "Served from opening until noon.",
  brunch: "All day, every day — the heart of the menu.",
  lunch: "From 12 noon.",
  dessert: "Baked in-house from four in the morning.",
  drinks: "Cold, bright and made to order.",
};

export default function MenuPage() {
  useTitle(
    "Luna Café Menu — Coffee, Breakfast, Brunch & Desserts",
    "Explore the full Luna Café menu: specialty coffee, breakfast, brunch, lunch, desserts and cold drinks, with dietary filters."
  );

  const [cat, setCat] = useState<Category | "all">("all");
  const [tag, setTag] = useState<Tag | "all">("all");
  const [active, setActive] = useState<MenuItem | null>(null);

  const filtered = useMemo(
    () =>
      MENU.filter(
        (m) =>
          (cat === "all" || m.category === cat) &&
          (tag === "all" || m.tags.includes(tag))
      ),
    [cat, tag]
  );

  const groups = GROUP_ORDER.map((g) => ({
    id: g,
    label: CATEGORIES.find((c) => c.id === g)!.label,
    items: filtered.filter((m) => m.category === g),
  })).filter((g) => g.items.length);

  return (
    <>
      <PageHero
        eyebrow="The Menu"
        title={
          <>
            The
            <br />
            <span className="italic font-light text-olive">Menu</span>
          </>
        }
        intro="From first coffee to last dessert. Our menu changes with the season and with whatever the market gives us — this is how it reads today."
        image={IMG.pastryDisplay}
        alt="Fresh pastries arranged along the Luna counter"
      />

      {/* Filters */}
      <div className="sticky top-[100px] z-30 border-b hairline bg-cream/95 backdrop-blur-md">
        <div className="shell py-4">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 no-scrollbar md:mx-0 md:flex-wrap md:px-0">
            {CATEGORIES.map((c) => (
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
          <div className="mt-3 -mx-5 flex items-center gap-2 overflow-x-auto px-5 no-scrollbar md:mx-0 md:px-0">
            <span className="eyebrow shrink-0 pr-2 text-taupe/70">Dietary</span>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setTag(f.id)}
                aria-pressed={tag === f.id}
                className={`eyebrow shrink-0 rounded-full border px-4 py-2 text-[10px] transition-all duration-400 ${
                  tag === f.id
                    ? "border-olive bg-olive text-cream"
                    : "border-espresso/15 text-taupe hover:border-olive/60 hover:text-olive"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="shell py-16 md:py-24">
        <p className="eyebrow text-taupe">
          {filtered.length} item{filtered.length === 1 ? "" : "s"}
        </p>

        {groups.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-3xl">Nothing here just yet.</p>
            <p className="mt-3 text-[15px] font-light text-taupe">
              Try a different filter — or ask us and we'll adapt something.
            </p>
            <div className="mt-8 flex justify-center">
              <Button onClick={() => { setCat("all"); setTag("all"); }} variant="outline">
                Reset filters
              </Button>
            </div>
          </div>
        )}

        <div className="mt-10 space-y-20">
          {groups.map((g) => (
            <div key={g.id} className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-3">
                <div className="md:sticky md:top-[13.5rem]">
                  <Reveal>
                    <Eyebrow>{String(GROUP_ORDER.indexOf(g.id) + 1).padStart(2, "0")}</Eyebrow>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2 className="font-display mt-4 text-4xl leading-none">
                      {g.label}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-3 max-w-[15rem] text-[13.5px] font-light leading-relaxed text-taupe">
                      {GROUP_NOTE[g.id]}
                    </p>
                  </Reveal>
                </div>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <ul className="border-t border-espresso/12">
                  <AnimatePresence mode="popLayout">
                    {g.items.map((it) => (
                      <MenuRow key={it.id} item={it} onOpen={setActive} />
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 border-t border-espresso/12 pt-12">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                Allergies, swaps
                <br />
                or something else?
              </h2>
              <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-taupe">
                Tell us and we'll work around it. Most dishes can be adapted, and
                oat or almond milk is available on every coffee.
              </p>
            </div>
            <div className="flex flex-wrap content-end gap-3 md:col-span-5 md:col-start-8">
              <Button href={wa("Hi Luna! I have a question about the menu.")}>
                Ask about the menu
              </Button>
              <Button to="/order" variant="outline" arrow>
                Order online
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MenuItemModal item={active} onClose={() => setActive(null)} />
    </>
  );
}
