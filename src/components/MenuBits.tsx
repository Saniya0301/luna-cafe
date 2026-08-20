import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TAG_LABEL, type MenuItem, type Tag } from "../data/menu";
import { Button, rupee } from "./ui";
import { useCart } from "../store/cart";

const SHOW_TAGS: Tag[] = ["bestseller", "chefs-pick", "vegetarian", "vegan", "gluten-friendly"];

export function TagRow({ tags, className = "" }: { tags: Tag[]; className?: string }) {
  const visible = SHOW_TAGS.filter((t) => tags.includes(t)).slice(0, 2);
  if (!visible.length) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visible.map((t) => (
        <span
          key={t}
          className={`eyebrow rounded-full border px-2.5 py-1 text-[9.5px] ${
            t === "bestseller" || t === "chefs-pick"
              ? "border-olive/40 bg-olive/10 text-olive"
              : "border-espresso/15 text-taupe"
          }`}
        >
          {TAG_LABEL[t]}
        </span>
      ))}
    </div>
  );
}

/* -------- Editorial card (image-led) -------- */
export function MenuCard({
  item,
  index,
  onOpen,
}: {
  item: MenuItem;
  index: number;
  onOpen: (i: MenuItem) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <button
        onClick={() => onOpen(item)}
        className="block w-full text-left"
        aria-label={`View ${item.name}`}
      >
        <div className="relative overflow-hidden bg-beige">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="aspect-4/5 w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-espresso/0 transition-colors duration-700 group-hover:bg-espresso/10" />
          <span className="absolute left-4 top-4 eyebrow text-cream/90 mix-blend-difference">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b border-espresso/12 pt-5 pb-3">
          <h3 className="font-display text-2xl leading-tight transition-transform duration-500 group-hover:translate-x-1">
            {item.name}
          </h3>
          <span className="text-[15px] tabular-nums text-espresso">
            {rupee(item.price)}
          </span>
        </div>
        <p className="pt-3 text-[14px] font-light leading-relaxed text-taupe">
          {item.desc}
        </p>
        <TagRow tags={item.tags} className="pt-3" />
      </button>
    </motion.article>
  );
}

/* -------- Compact list row (menu page) -------- */
export function MenuRow({
  item,
  onOpen,
}: {
  item: MenuItem;
  onOpen: (i: MenuItem) => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={() => onOpen(item)}
        className="group flex w-full items-center gap-5 border-b border-espresso/12 py-5 text-left"
      >
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-16 w-16 shrink-0 object-cover transition-transform duration-700 group-hover:scale-105 sm:h-20 sm:w-20"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <h3 className="font-display truncate text-[1.45rem] leading-tight transition-transform duration-500 group-hover:translate-x-1">
              {item.name}
            </h3>
            <span
              className="hidden h-px flex-1 self-end bg-espresso/15 sm:block"
              aria-hidden="true"
            />
            <span className="shrink-0 text-[15px] tabular-nums">{rupee(item.price)}</span>
          </div>
          <p className="mt-1.5 line-clamp-2 text-[13.5px] font-light leading-relaxed text-taupe">
            {item.desc}
          </p>
          <TagRow tags={item.tags} className="mt-2.5" />
        </div>
      </button>
    </motion.li>
  );
}

/* -------- Quick view modal -------- */

const MILKS = [
  { label: "Whole milk", price: 0 },
  { label: "Oat milk", price: 50 },
  { label: "Almond milk", price: 50 },
];

export function MenuItemModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [milk, setMilk] = useState(0);
  const [shot, setShot] = useState(false);

  useEffect(() => {
    setMilk(0);
    setShot(false);
  }, [item]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = item ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  const isCoffee = item?.category === "coffee" || item?.category === "drinks";
  const total =
    (item?.price ?? 0) + (isCoffee ? MILKS[milk].price + (shot ? 70 : 0) : 0);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-espresso/55 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[92vh] w-full overflow-y-auto bg-cream md:max-h-[86vh] md:max-w-4xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-cream/40 bg-espresso/40 text-cream backdrop-blur md:border-espresso/15 md:bg-cream/80 md:text-espresso"
            >
              ✕
            </button>
            <div className="grid md:grid-cols-2">
              <img
                src={item.image}
                alt={item.name}
                className="h-56 w-full object-cover md:h-full"
              />
              <div className="p-6 md:p-10">
                <TagRow tags={item.tags} />
                <h2 className="font-display mt-4 text-4xl leading-none md:text-5xl">
                  {item.name}
                </h2>
                <p className="mt-3 text-lg text-olive tabular-nums">
                  {rupee(item.price)}
                </p>
                <p className="mt-5 text-[15px] font-light leading-relaxed text-taupe">
                  {item.desc}
                </p>

                <dl className="mt-7 space-y-4 border-t border-espresso/12 pt-6 text-[14px] font-light">
                  <div>
                    <dt className="eyebrow text-espresso">Ingredients</dt>
                    <dd className="mt-1.5 text-taupe">{item.ingredients}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-espresso">Allergens</dt>
                    <dd className="mt-1.5 text-taupe">{item.allergens}</dd>
                  </div>
                </dl>

                {isCoffee && (
                  <div className="mt-7 border-t border-espresso/12 pt-6">
                    <p className="eyebrow text-espresso">Milk</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {MILKS.map((m, i) => (
                        <button
                          key={m.label}
                          onClick={() => setMilk(i)}
                          className={`rounded-full border px-4 py-2.5 text-[12px] font-light transition-colors ${
                            milk === i
                              ? "border-espresso bg-espresso text-cream"
                              : "border-espresso/20 text-taupe hover:border-espresso/50"
                          }`}
                        >
                          {m.label}
                          {m.price ? ` + ₹${m.price}` : ""}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setShot((s) => !s)}
                      className={`mt-3 rounded-full border px-4 py-2.5 text-[12px] font-light transition-colors ${
                        shot
                          ? "border-espresso bg-espresso text-cream"
                          : "border-espresso/20 text-taupe hover:border-espresso/50"
                      }`}
                    >
                      Add extra shot + ₹70
                    </button>
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    onClick={() => {
                      const mods = isCoffee
                        ? [
                            ...(milk > 0 ? [MILKS[milk]] : []),
                            ...(shot ? [{ label: "Extra shot", price: 70 }] : []),
                          ]
                        : [];
                      add(item, mods);
                      onClose();
                    }}
                    className="flex-1"
                  >
                    Add to order · {rupee(total)}
                  </Button>
                </div>
                <p className="mt-4 text-[11px] font-light leading-relaxed text-taupe/70">
                  Front-end demonstration. No order is placed and no payment is
                  taken.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
