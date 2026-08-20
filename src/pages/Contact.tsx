import { useState } from "react";
import { SITE, wa } from "../data/content";
import { IMG } from "../data/images";
import {
  Button,
  Eyebrow,
  Field,
  Reveal,
  Select,
  TextArea,
  useTitle,
} from "../components/ui";

const TYPES = [
  "General",
  "Reservation",
  "Events",
  "Menu",
  "Feedback",
  "Collaboration",
];

export default function Contact() {
  useTitle(
    "Contact Luna Café",
    "Get in touch with Luna Café — reservations, events, menu questions, feedback and collaborations."
  );
  const [sent, setSent] = useState(false);

  return (
    <>
      <header className="border-b hairline pt-32 md:pt-40">
        <div className="shell grid gap-10 pb-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display mt-6 text-[16vw] leading-[0.92] sm:text-7xl md:text-[6rem]">
                Let's talk.
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-md text-[15px] font-light leading-[1.9] text-taupe">
                Whether it's a table for two, a menu question or an idea worth
                sharing — we read everything and usually reply within a day.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.1}>
              <img
                src={IMG.friendsCoffee}
                alt="Two guests talking over coffee at Luna"
                className="aspect-4/3 w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </header>

      <section className="shell py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="space-y-8 md:sticky md:top-32">
              {[
                { k: "Phone", v: SITE.phone, href: SITE.phoneHref },
                { k: "Email", v: SITE.email, href: `mailto:${SITE.email}` },
                { k: "WhatsApp", v: "Chat with Luna", href: wa("Hi Luna!") },
                {
                  k: "Location",
                  v: `${SITE.address1}, ${SITE.address2}`,
                  href: SITE.mapsUrl,
                },
              ].map((c) => (
                <div key={c.k} className="border-t border-espresso/12 pt-4">
                  <p className="eyebrow text-taupe">{c.k}</p>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="mt-2 block text-[16px] font-light text-espresso transition-colors hover:text-olive"
                  >
                    {c.v}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {sent ? (
              <Reveal>
                <div className="border border-espresso/12 p-10 text-center md:p-14">
                  <h2 className="font-display text-4xl leading-tight md:text-5xl">
                    Thank you for
                    <br />
                    reaching out.
                  </h2>
                  <p className="mt-5 text-[15px] font-light text-taupe">
                    We'll reply as soon as we're off the floor.
                  </p>
                  <p className="mx-auto mt-8 max-w-sm text-[12px] font-light leading-relaxed text-taupe/70">
                    Front-end demonstration — this message has not been sent
                    anywhere.
                  </p>
                </div>
              </Reveal>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid gap-7 sm:grid-cols-2"
              >
                <Field id="c-first" label="First name" required placeholder="Ananya" />
                <Field id="c-last" label="Last name" required placeholder="Sharma" />
                <Field id="c-email" label="Email" type="email" required placeholder="you@example.com" />
                <Field id="c-phone" label="Phone" type="tel" placeholder="+91 00000 00000" />
                <div className="sm:col-span-2">
                  <Select id="c-type" label="Enquiry type" options={TYPES} />
                </div>
                <div className="sm:col-span-2">
                  <TextArea
                    id="c-msg"
                    label="Message"
                    required
                    rows={5}
                    placeholder="Tell us what you have in mind…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit">Send message</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
