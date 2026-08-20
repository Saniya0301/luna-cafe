import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS, wa } from "../data/content";
import { Button, Eyebrow, Reveal, useTitle } from "../components/ui";

export default function FAQ() {
  useTitle(
    "FAQ — Luna Café",
    "Reservations, dietary options, allergies, delivery, private events, Wi-Fi and parking at Luna Café."
  );
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <header className="border-b hairline pt-32 md:pt-40">
        <div className="shell pb-14">
          <Reveal>
            <Eyebrow>Good to know</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-6 max-w-2xl text-[14vw] leading-[0.94] sm:text-6xl md:text-[5rem]">
              Questions,
              <br />
              <span className="italic font-light text-olive">answered.</span>
            </h1>
          </Reveal>
        </div>
      </header>

      <section className="shell py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="text-[15px] font-light leading-[1.9] text-taupe">
                Anything not covered here — message us. WhatsApp is the fastest
                way to reach us during service hours.
              </p>
              <div className="mt-7 flex flex-col items-start gap-3">
                <Button href={wa("Hi Luna! I have a question.")} variant="outline">
                  Contact Luna
                </Button>
                <Button to="/contact" variant="outline" arrow>
                  Send a message
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="border-t border-espresso/12">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q} className="border-b border-espresso/12">
                    <h2>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span className="font-display text-[1.5rem] leading-snug md:text-[1.75rem]">
                          {f.q}
                        </span>
                        <span
                          className={`mt-1.5 shrink-0 text-xl text-olive transition-transform duration-500 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>
                    </h2>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-7 text-[15px] font-light leading-[1.9] text-taupe">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
