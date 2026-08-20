import { useState } from "react";
import { IMG } from "../data/images";
import {
  Button,
  Eyebrow,
  Field,
  PageHero,
  Reveal,
  TextArea,
  rupee,
  useTitle,
} from "../components/ui";

const AMOUNTS = [500, 1000, 2500];

export default function GiftCards() {
  useTitle(
    "Gift Cards — Luna Café",
    "Give a little Luna: gift cards for coffee, brunch and slow afternoons."
  );
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState("");
  const [done, setDone] = useState(false);

  const value = custom ? Number(custom) || 0 : amount;

  return (
    <>
      <PageHero
        eyebrow="Gift cards"
        title={
          <>
            Give a
            <br />
            <span className="italic font-light text-olive">little Luna.</span>
          </>
        }
        intro="A morning coffee, a long brunch, or the whole afternoon. Delivered by email, redeemable at the counter."
        image={IMG.croissantBlue}
        alt="A croissant and coffee set on a café table"
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <div className="relative isolate overflow-hidden border border-espresso/12 bg-espresso p-8 text-cream">
                <img
                  src={IMG.latteArt}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-25"
                />
                <div className="relative">
                  <p className="eyebrow text-cream/60">Luna Café</p>
                  <p className="font-display mt-16 text-5xl">{rupee(value)}</p>
                  <p className="mt-2 text-[13px] font-light text-cream/70">
                    Gift card · no expiry
                  </p>
                  <p className="mt-10 text-[13px] font-light italic text-cream/60">
                    Coffee, conversations & slow moments.
                  </p>
                </div>
              </div>
            </Reveal>
            <p className="mt-6 text-[13.5px] font-light leading-relaxed text-taupe">
              Gift cards can be used against anything at Luna — the counter, the
              kitchen, or a table booked for a birthday.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            {done ? (
              <Reveal>
                <div className="border border-espresso/12 p-10 text-center">
                  <h2 className="font-display text-4xl leading-tight">
                    A lovely thing to give.
                  </h2>
                  <p className="mt-5 text-[15px] font-light text-taupe">
                    In a live build, a {rupee(value)} gift card would now be on
                    its way to your recipient's inbox.
                  </p>
                  <p className="mx-auto mt-8 max-w-sm text-[12px] font-light leading-relaxed text-taupe/70">
                    No payment system is connected to this portfolio project, so
                    nothing has been charged or sent.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <Button onClick={() => setDone(false)} variant="outline">
                      Back
                    </Button>
                  </div>
                </div>
              </Reveal>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <Eyebrow>Choose an amount</Eyebrow>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => {
                        setAmount(a);
                        setCustom("");
                      }}
                      aria-pressed={!custom && amount === a}
                      className={`rounded-full border px-6 py-3.5 text-[14px] tabular-nums transition-colors ${
                        !custom && amount === a
                          ? "border-espresso bg-espresso text-cream"
                          : "border-espresso/20 text-taupe hover:border-espresso/60"
                      }`}
                    >
                      {rupee(a)}
                    </button>
                  ))}
                  <input
                    type="number"
                    min={200}
                    placeholder="Custom amount"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    className="w-40 rounded-full border border-espresso/20 bg-transparent px-6 py-3.5 text-[14px] font-light placeholder:text-taupe/60 focus:border-espresso focus:outline-none"
                  />
                </div>

                <div className="mt-12 grid gap-7 sm:grid-cols-2">
                  <Field id="g-name" label="Recipient name" required placeholder="Their name" />
                  <Field
                    id="g-email"
                    label="Recipient email"
                    type="email"
                    required
                    placeholder="them@example.com"
                  />
                  <div className="sm:col-span-2">
                    <TextArea
                      id="g-msg"
                      label="Message"
                      placeholder="A coffee on me — see you Sunday."
                    />
                  </div>
                </div>

                <div className="mt-9">
                  <Button type="submit" disabled={value < 200}>
                    Purchase gift card · {rupee(value)}
                  </Button>
                </div>
                <p className="mt-5 max-w-md text-[12px] font-light leading-relaxed text-taupe/70">
                  Visual demonstration only. No payment is processed.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
