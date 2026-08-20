import { HOURS, SITE, wa } from "../data/content";
import { IMG } from "../data/images";
import { Button, Eyebrow, PageHero, Reveal, useTitle } from "../components/ui";

const GETTING_HERE = [
  {
    t: "Parking",
    d: "Metered street parking runs the length of the block. A public parking structure sits two minutes away on the corner of Example Street and Garden Lane.",
  },
  {
    t: "Nearby landmark",
    d: "Look for the old banyan tree at the top of the street — we're four doors down, behind the green awning.",
  },
  {
    t: "Public transport",
    d: "Six minutes on foot from the nearest metro station (Exit 3). Several bus routes stop at the market, one street over.",
  },
];

export default function Location() {
  useTitle(
    "Luna Café — Location & Opening Hours",
    "Find Luna Café at 123 Example Street, New Delhi. Opening hours, directions, parking and transport."
  );

  const todayIdx = (new Date().getDay() + 6) % 7;

  return (
    <>
      <PageHero
        eyebrow="Visit"
        title={
          <>
            Find your way
            <br />
            <span className="italic font-light text-olive">to Luna.</span>
          </>
        }
        intro="Four doors down from the banyan tree, behind the green awning. Open every day of the week."
        image={IMG.eveningTerrace}
        alt="Evening lights along the Luna Café terrace"
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Address</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-display mt-5 text-4xl leading-tight">
                {SITE.address1}
                <br />
                {SITE.address2}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 space-y-3 border-t border-espresso/12 pt-8 text-[15px] font-light">
                <p>
                  <span className="eyebrow mr-4 text-taupe">Phone</span>
                  <a href={SITE.phoneHref} className="hover:text-olive">
                    {SITE.phone}
                  </a>
                </p>
                <p>
                  <span className="eyebrow mr-4 text-taupe">Email</span>
                  <a href={`mailto:${SITE.email}`} className="hover:text-olive">
                    {SITE.email}
                  </a>
                </p>
                <p>
                  <span className="eyebrow mr-4 text-taupe">Instagram</span>
                  {SITE.instagram}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={SITE.mapsUrl}>Get directions</Button>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex min-h-[52px] items-center rounded-full border border-espresso/25 px-7 eyebrow transition-colors hover:bg-espresso hover:text-cream"
                >
                  Call
                </a>
                <Button href={wa("Hi Luna! I'm on my way.")} variant="outline">
                  WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <Eyebrow>Opening hours</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <ul className="mt-6 border-t border-espresso/12">
                {HOURS.map((h, i) => (
                  <li
                    key={h.day}
                    className={`flex items-baseline justify-between border-b border-espresso/12 py-4 ${
                      i === todayIdx ? "text-espresso" : "text-taupe"
                    }`}
                  >
                    <span
                      className={`text-[15px] ${
                        i === todayIdx ? "font-display text-2xl" : "font-light"
                      }`}
                    >
                      {h.day}
                      {i === todayIdx && (
                        <span className="eyebrow ml-3 text-olive">Today</span>
                      )}
                    </span>
                    <span className="text-[14px] font-light tabular-nums">
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-[13px] font-light leading-relaxed text-taupe">
                Kitchen closes forty-five minutes before the café. The pastry
                counter is at its best before eleven.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-y hairline">
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block h-[22rem] overflow-hidden bg-beige md:h-[30rem]"
          aria-label="Open Luna Café in Google Maps"
        >
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(rgba(109,107,78,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(109,107,78,0.2) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
          <div className="absolute left-0 top-1/3 h-[4px] w-full -rotate-3 bg-espresso/10" />
          <div className="absolute left-1/4 top-0 h-full w-[4px] rotate-2 bg-espresso/10" />
          <div className="absolute right-1/3 top-0 h-full w-[2px] -rotate-6 bg-espresso/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-espresso/25 bg-cream text-xl transition-transform duration-500 group-hover:-translate-y-1.5">
              ◎
            </span>
            <p className="font-display mt-6 text-4xl">Luna Café</p>
            <p className="mt-2 text-[14px] font-light text-taupe">
              {SITE.address1}, {SITE.address2}
            </p>
            <span className="eyebrow mt-7 rounded-full border border-espresso/25 bg-cream px-6 py-3 text-espresso">
              Open in Google Maps ↗
            </span>
            <p className="mt-6 max-w-xs text-[11px] font-light leading-relaxed text-taupe/70">
              A live Google Maps embed would sit here once a real address is
              configured.
            </p>
          </div>
        </a>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-3">
          {GETTING_HERE.map((g, i) => (
            <Reveal key={g.t} delay={i * 0.08}>
              <div className="border-t border-espresso/12 pt-6">
                <h2 className="font-display text-2xl">{g.t}</h2>
                <p className="mt-3 text-[14px] font-light leading-[1.85] text-taupe">
                  {g.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
