import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart";
import { Button, Eyebrow, Reveal, rupee, useTitle } from "../components/ui";

export default function Cart() {
  useTitle("Your Order — Luna Café", "Review your Luna Café pickup or delivery order.");
  const { lines, setQty, remove, subtotal, mode, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  const fee = mode === "delivery" ? 60 : 30;
  const total = subtotal + (lines.length ? fee : 0);

  if (placed)
    return (
      <section className="shell flex min-h-[80vh] flex-col items-center justify-center py-40 text-center">
        <Eyebrow className="justify-center">Demo checkout</Eyebrow>
        <h1 className="font-display mt-6 text-[12vw] leading-[0.96] sm:text-6xl">
          That's as far
          <br />
          as the demo goes.
        </h1>
        <p className="mx-auto mt-7 max-w-md text-[15px] font-light leading-relaxed text-taupe">
          No payment system is connected to this portfolio project, so nothing
          has been charged and no order has been sent to the kitchen. In a live
          build, this is where checkout and payment would sit.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button to="/menu">Back to the menu</Button>
          <Button
            to="/order"
            variant="outline"
            onClick={() => {
              clear();
              setPlaced(false);
            }}
          >
            Start again
          </Button>
        </div>
      </section>
    );

  if (!lines.length)
    return (
      <section className="shell flex min-h-[80vh] flex-col items-center justify-center py-40 text-center">
        <Eyebrow className="justify-center">Your order</Eyebrow>
        <h1 className="font-display mt-6 text-[13vw] leading-[0.96] sm:text-6xl">
          Your order
          <br />
          is empty.
        </h1>
        <p className="mt-6 max-w-sm text-[15px] font-light text-taupe">
          Nothing here yet. The pastry counter is a reasonable place to begin.
        </p>
        <div className="mt-9">
          <Button to="/order" arrow>
            Explore menu
          </Button>
        </div>
      </section>
    );

  return (
    <section className="shell pt-32 pb-24 md:pt-44 md:pb-32">
      <Eyebrow>Your order</Eyebrow>
      <h1 className="font-display mt-5 text-5xl leading-none md:text-[4rem]">
        Your order
      </h1>
      <p className="mt-4 eyebrow text-taupe">{mode} · Luna Café, New Delhi</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ul className="border-t border-espresso/12">
            {lines.map((l) => (
              <Reveal key={l.key} as="li">
                <div className="flex gap-5 border-b border-espresso/12 py-6">
                  <img
                    src={l.image}
                    alt={l.name}
                    className="h-24 w-24 shrink-0 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-display text-2xl leading-tight">
                        {l.name}
                      </h2>
                      <span className="tabular-nums text-[15px]">
                        {rupee(l.unit * l.qty)}
                      </span>
                    </div>
                    {l.modifiers.length > 0 && (
                      <p className="mt-1.5 text-[13px] font-light text-taupe">
                        {l.modifiers.join(" · ")}
                      </p>
                    )}
                    <p className="mt-1 text-[13px] font-light text-taupe">
                      {rupee(l.unit)} each
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 rounded-full border border-espresso/20 px-4 py-2">
                        <button
                          onClick={() => setQty(l.key, l.qty - 1)}
                          aria-label={`Decrease ${l.name}`}
                          className="text-lg leading-none text-taupe hover:text-espresso"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-[14px] tabular-nums">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => setQty(l.key, l.qty + 1)}
                          aria-label={`Increase ${l.name}`}
                          className="text-lg leading-none text-taupe hover:text-espresso"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(l.key)}
                        className="eyebrow text-taupe underline underline-offset-4 hover:text-espresso"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-6">
            <Link to="/order" className="eyebrow text-taupe hover:text-espresso">
              ← Add something else
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-espresso/12 p-7 lg:sticky lg:top-32">
            <h2 className="font-display text-3xl">Summary</h2>
            <dl className="mt-7 space-y-3.5 text-[14px] font-light">
              <div className="flex justify-between">
                <dt className="text-taupe">Subtotal</dt>
                <dd className="tabular-nums">{rupee(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-taupe">
                  {mode === "delivery" ? "Delivery" : "Service"}
                </dt>
                <dd className="tabular-nums">{rupee(fee)}</dd>
              </div>
              <div className="flex justify-between border-t border-espresso/12 pt-4 text-[17px]">
                <dt className="font-display text-2xl">Total</dt>
                <dd className="font-display text-2xl tabular-nums">
                  {rupee(total)}
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <Button onClick={() => setPlaced(true)} className="w-full">
                Continue to checkout
              </Button>
            </div>
            <p className="mt-5 text-[12px] font-light leading-relaxed text-taupe/70">
              Demonstration only — no payment is taken and no order is placed.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
