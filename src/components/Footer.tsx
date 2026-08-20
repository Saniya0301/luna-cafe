import { Link } from "react-router-dom";
import { useState } from "react";
import { SITE, wa } from "../data/content";
import { IMG } from "../data/images";
import { Button, Eyebrow, Reveal } from "./ui";

function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={IMG.interiorPeople}
        alt="Guests lingering at Luna Café in the evening"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-espresso/72" />
      <div className="shell relative py-24 text-center md:py-36">
        <Reveal>
          <Eyebrow className="justify-center !text-cream/70">Until next time</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mx-auto mt-6 max-w-3xl text-[13vw] leading-[0.95] text-cream sm:text-6xl md:text-7xl">
            See you at Luna?
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-md text-[15px] font-light leading-relaxed text-cream/75">
            Coffee is better when there's somewhere worth staying.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/reservations" variant="solidLight">Reserve a table</Button>
            <Button to="/menu" variant="light">View menu</Button>
            <Button href={wa("Hi Luna! I have a question.")} variant="light">
              WhatsApp Luna
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <div className="border-b hairline">
      <div className="shell grid gap-8 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Eyebrow>Newsletter</Eyebrow>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] md:text-5xl">
            A little Luna
            <br />
            in your inbox.
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
          <p className="text-[15px] leading-relaxed text-taupe">
            New menu drops, special events and weekend treats. One thoughtful
            note a month — nothing more.
          </p>
          {done ? (
            <p className="eyebrow mt-8 text-olive">You're on the list.</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end"
            >
              <div className="flex-1">
                <label htmlFor="nl-email" className="eyebrow block text-taupe mb-2">
                  Your email address
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border-b border-espresso/20 bg-transparent py-3 text-[15px] font-light text-espresso placeholder:text-taupe/50 focus:border-olive focus:outline-none"
                />
              </div>
              <Button type="submit" className="shrink-0">Join us</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Menu", to: "/menu" },
      { label: "About", to: "/about" },
      { label: "Gallery", to: "/gallery" },
      { label: "Journal", to: "/journal" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Location", to: "/location" },
      { label: "Opening Hours", to: "/location" },
      { label: "Reservations", to: "/reservations" },
      { label: "Events", to: "/events" },
    ],
  },
  {
    title: "Customer",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "Order Online", to: "/order" },
      { label: "Gift Cards", to: "/gift-cards" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <FinalCTA />
      <Newsletter />

      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <p className="font-display text-3xl">
            LUNA<span className="text-olive"> CAFÉ</span>
          </p>
          <p className="mt-4 max-w-xs text-[15px] font-light leading-relaxed text-taupe">
            {SITE.tagline}
          </p>
          <p className="mt-6 text-[14px] font-light leading-relaxed text-taupe">
            {SITE.address1}
            <br />
            {SITE.address2}
          </p>
        </div>

        {columns.map((c) => (
          <div key={c.title} className="md:col-span-2">
            <p className="eyebrow text-espresso">{c.title}</p>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[14px] font-light text-taupe transition-colors hover:text-espresso"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <p className="eyebrow text-espresso">Contact</p>
          <ul className="mt-5 space-y-3 text-[14px] font-light text-taupe">
            <li>
              <a
                href={wa("Hi Luna!")}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-espresso"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={SITE.phoneHref} className="transition-colors hover:text-espresso">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="break-all transition-colors hover:text-espresso"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
          <p className="eyebrow mt-8 text-espresso">Follow</p>
          <ul className="mt-5 space-y-3 text-[14px] font-light text-taupe">
            <li><a href="#" className="transition-colors hover:text-espresso">Instagram</a></li>
            <li><a href="#" className="transition-colors hover:text-espresso">Facebook</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 pb-28 text-center md:flex-row md:pb-6 md:text-left">
          <p className="eyebrow text-taupe">Luna Café © 2026</p>
          <p className="text-[13px] font-light italic text-taupe">
            Coffee, conversations & slow moments.
          </p>
          <p className="text-[11px] font-light text-taupe/70">
            A fictional brand created as a portfolio project.
          </p>
        </div>
      </div>
    </footer>
  );
}
