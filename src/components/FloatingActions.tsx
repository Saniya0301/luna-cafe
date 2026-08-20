import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { wa } from "../data/content";
import { byId } from "../data/menu";
import { useCart } from "../store/cart";
import { rupee } from "./ui";

/* ---------------- Ask Luna (scripted concierge demo) ---------------- */

interface Msg {
  from: "luna" | "guest";
  text: string;
  items?: string[];
}

const SCRIPT: { prompt: string; reply: string; items: string[] }[] = [
  {
    prompt: "I want coffee.",
    reply:
      "Then you're in the right room. Our Flat White is what the bar drinks, the Cloud Latte is what everyone else orders, and the Cold Brew is for warm afternoons.",
    items: ["flat-white", "pistachio-cloud-latte", "cold-brew"],
  },
  {
    prompt: "I'm vegetarian.",
    reply:
      "Most of the menu is yours. These three are the ones we'd put in front of you first.",
    items: ["truffle-mushroom-toast", "citrus-burrata-salad", "luna-pancakes"],
  },
  {
    prompt: "I want something sweet.",
    reply:
      "The pastry counter was filled at six this morning. Start here.",
    items: ["pistachio-croissant", "cinnamon-roll", "dark-chocolate-torte"],
  },
  {
    prompt: "What should I order?",
    reply:
      "If it's your first visit: the Pistachio Cloud Latte, the Truffle Mushroom Toast, and a Tiramisu to finish. That's the whole café in three plates.",
    items: ["pistachio-cloud-latte", "truffle-mushroom-toast", "tiramisu"],
  },
  {
    prompt: "I want brunch.",
    reply:
      "Late morning is our best hour. Order one sweet, one savoury, and something green in the middle to share.",
    items: ["luna-pancakes", "eggs-benedict", "avocado-toast"],
  },
  {
    prompt: "Do you have vegan options?",
    reply:
      "We do — these are vegan as served, and oat or almond milk is available on every coffee.",
    items: ["seasonal-grain-bowl", "luna-grain-bowl", "peach-iced-tea"],
  },
];

function AskLunaPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "luna",
      text: "Hi, I'm Luna. What are you in the mood for?",
    },
  ]);
  const [used, setUsed] = useState<string[]>([]);

  const ask = (p: (typeof SCRIPT)[number]) => {
    setUsed((u) => [...u, p.prompt]);
    setMsgs((m) => [...m, { from: "guest", text: p.prompt }]);
    window.setTimeout(
      () =>
        setMsgs((m) => [
          ...m,
          { from: "luna", text: p.reply, items: p.items },
        ]),
      450
    );
  };

  const remaining = SCRIPT.filter((s) => !used.includes(s.prompt));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-24 right-4 z-[80] flex max-h-[70vh] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-espresso/15 bg-cream shadow-[0_24px_60px_-24px_rgba(32,35,26,0.45)] md:bottom-28 md:right-8"
      role="dialog"
      aria-label="Ask Luna"
    >
      <div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
        <div>
          <p className="font-display text-xl leading-none">Ask Luna</p>
          <p className="mt-1 text-[11px] font-light text-taupe">
            A guided demo — not a live assistant
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close Ask Luna"
          className="grid h-8 w-8 place-items-center rounded-full border border-espresso/15 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {msgs.map((m, i) => (
          <div key={i} className={m.from === "guest" ? "text-right" : ""}>
            <p
              className={`inline-block max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] font-light leading-relaxed ${
                m.from === "guest"
                  ? "bg-espresso text-cream"
                  : "bg-beige/70 text-espresso"
              }`}
            >
              {m.text}
            </p>
            {m.items && (
              <ul className="mt-3 space-y-2">
                {m.items.map((id) => {
                  const it = byId(id);
                  if (!it) return null;
                  return (
                    <li key={id}>
                      <Link
                        to="/menu"
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl border border-espresso/10 p-2 transition-colors hover:border-espresso/30"
                      >
                        <img
                          src={it.image}
                          alt=""
                          className="h-11 w-11 rounded-lg object-cover"
                          loading="lazy"
                        />
                        <span className="flex-1 text-left text-[13px] text-espresso">
                          {it.name}
                        </span>
                        <span className="text-[13px] text-taupe">
                          {rupee(it.price)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-espresso/10 px-4 py-3">
        {remaining.length ? (
          <div className="flex flex-wrap gap-2">
            {remaining.slice(0, 3).map((s) => (
              <button
                key={s.prompt}
                onClick={() => ask(s)}
                className="rounded-full border border-espresso/20 px-3 py-2 text-[12px] font-light text-taupe transition-colors hover:border-espresso hover:text-espresso"
              >
                {s.prompt}
              </button>
            ))}
          </div>
        ) : (
          <Link
            to="/menu"
            onClick={onClose}
            className="block rounded-full bg-espresso py-3 text-center eyebrow text-cream"
          >
            See the full menu
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- Floating stack ---------------- */

export default function FloatingActions() {
  const [ask, setAsk] = useState(false);
  const { count, toast } = useCart();

  return (
    <>
      {/* Add-to-cart toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-24 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-espresso px-6 py-3 eyebrow text-cream shadow-lg md:bottom-8 md:left-8 md:translate-x-0"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ask && <AskLunaPanel onClose={() => setAsk(false)} />}
      </AnimatePresence>

      {/* Desktop floating buttons */}
      <div className="fixed bottom-8 right-8 z-[75] hidden flex-col items-end gap-3 md:flex">
        <button
          onClick={() => setAsk((v) => !v)}
          className="rounded-full border border-espresso/20 bg-cream px-5 py-3 eyebrow text-espresso shadow-[0_10px_30px_-12px_rgba(32,35,26,0.4)] transition-colors hover:bg-espresso hover:text-cream"
        >
          Ask Luna
        </button>
        <a
          href={wa("Hi Luna! I'd like to chat.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 rounded-full bg-olive px-5 py-3.5 eyebrow text-cream shadow-[0_10px_30px_-12px_rgba(32,35,26,0.6)] transition-colors hover:bg-espresso"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 00-8.6 15.1L2 22l5.05-1.32A10 10 0 1012 2z" />
          </svg>
          Chat with Luna
        </a>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-[75] grid grid-cols-4 border-t border-espresso/15 bg-cream/95 backdrop-blur md:hidden">
        <Link to="/menu" className="py-4 text-center eyebrow text-espresso">
          Menu
        </Link>
        <Link
          to="/reservations"
          className="border-x border-espresso/10 py-4 text-center eyebrow text-espresso"
        >
          Reserve
        </Link>
        <a
          href={wa("Hi Luna! I'd like to chat.")}
          target="_blank"
          rel="noopener noreferrer"
          className="py-4 text-center eyebrow text-olive"
        >
          WhatsApp
        </a>
        <button
          onClick={() => setAsk((v) => !v)}
          className="border-l border-espresso/10 py-4 text-center eyebrow text-espresso"
        >
          {count > 0 ? `Ask · ${count}` : "Ask"}
        </button>
      </div>
    </>
  );
}


