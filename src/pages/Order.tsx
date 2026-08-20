import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, MENU, type Category } from "../data/menu";
import { IMG } from "../data/images";
import { Button, Eyebrow, PageHero, Reveal, rupee, useTitle } from "../components/ui";
import { useCart } from "../store/cart";
import { TagRow } from "../components/MenuBits";

export default function Order() {
  useTitle(
    "Order Online — Luna Café",
    "Order Luna Café coffee, pastries and kitchen dishes for pickup or delivery."
  );
  const { add, count, subtotal, mode, setMode } = useCart();
  const [cat, setCat] = useState<Category | "all">("all");

  const items = useMemo(
    () => (cat === "all" ? MENU : MENU.filter((m) => m.category === cat)),
    [cat]
  );

  return (
    <>
      <PageHero
        eyebrow="Order online"
        title={
          <>
            Luna,
            <br />
            <span className="italic font-light text-olive">to go.</span>
          </>
        }
        intro="The full coffee menu, the pastry counter and most kitchen dishes — ready at the counter, or brought to your door within five kilometres."
        image={IMG.chocCroissant}
        alt="Croissants cooling on a tray at Luna Café"
      />

      <div className="sticky top-[100px] z-30 border-b hairline bg-cream/95 backdrop-blur-md">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex rounded-full border border-espresso/20 p-1">
            {(["pickup", "delivery"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`eyebrow rounded-full px-6 py-2.5 transition-colors ${
                  mode === m ? "bg-espresso text-cream" : "text-taupe"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <Link
            to="/cart"
            className="eyebrow flex items-center gap-3 rounded-full border border-espresso/20 px-5 py-2.5 transition-colors hover:border-espresso"
          >
            <span>Your order · {count}</span>
            <span className="tabular-nums text-olive">{rupee(subtotal)}</span>
          </Link>
        </div>
        <div className="shell pb-4">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 no-scrollbar md:mx-0 md:px-0">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                aria-pressed={cat === c.id}
                className={`eyebrow shrink-0 rounded-full border px-5 py-2.5 transition-all duration-400 ${
                  cat === c.id
                    ? "border-espresso bg-espresso text-cream"
                    : "border-espresso/20 text-taupe hover:border-espresso/60"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="shell py-14 md:py-20">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow text-taupe">
            {mode === "pickup"
              ? "Ready in 15 — 20 minutes at the counter"
              : "Delivered in 30 — 45 minutes · ₹60 within 5 km"}
          </p>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.id} delay={(i % 3) * 0.06}>
              <article className="group flex h-full flex-col border border-espresso/12">
                <div className="overflow-hidden bg-beige">
                  <img
                    src={it.image}
                    alt={it.name}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl leading-tight">{it.name}</h3>
                    <span className="shrink-0 text-[15px] tabular-nums">
                      {rupee(it.price)}
                    </span>
                  </div>
                  <p className="mt-2.5 flex-1 text-[13.5px] font-light leading-relaxed text-taupe">
                    {it.desc}
                  </p>
                  <TagRow tags={it.tags} className="mt-3" />
                  <button
                    onClick={() => add(it)}
                    className="eyebrow mt-5 w-full rounded-full border border-espresso/25 py-3.5 transition-colors hover:bg-espresso hover:text-cream"
                  >
                    Add to order
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-espresso/12 pt-10">
          <Eyebrow>Note</Eyebrow>
          <p className="mt-4 max-w-2xl text-[13px] font-light leading-relaxed text-taupe">
            This ordering experience is a front-end demonstration built for a
            portfolio project. No order is transmitted to a kitchen and no
            payment is processed at checkout.
          </p>
          <div className="mt-8">
            <Button to="/cart" arrow>
              Review your order
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
