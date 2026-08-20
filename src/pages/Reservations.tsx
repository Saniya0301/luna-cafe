import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { IMG } from "../data/images";
import { SITE, wa } from "../data/content";
import { Button, Eyebrow, Field, Reveal, TextArea, useTitle } from "../components/ui";

const GUESTS = ["2", "3", "4", "5", "6+"];
const TIMES = ["11:00 AM", "12:30 PM", "1:30 PM", "3:00 PM", "6:30 PM", "7:30 PM", "8:30 PM"];
const OCCASIONS = ["None", "Birthday", "Anniversary", "Accessibility", "Other"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const start = new Date(view.getFullYear(), view.getMonth(), 1);
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const offset = (start.getDay() + 6) % 7; // Monday-first

  const canGoBack =
    view.getFullYear() > today.getFullYear() ||
    (view.getFullYear() === today.getFullYear() && view.getMonth() > today.getMonth());

  return (
    <div className="border border-espresso/12 p-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={!canGoBack}
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-espresso/15 text-sm disabled:opacity-30"
          aria-label="Previous month"
        >
          ←
        </button>
        <p className="font-display text-2xl">
          {MONTHS[view.getMonth()]} {view.getFullYear()}
        </p>
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-espresso/15 text-sm"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 text-center">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="eyebrow pb-2 text-taupe/60">
            {d}
          </span>
        ))}
        {Array.from({ length: offset }).map((_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = new Date(view.getFullYear(), view.getMonth(), i + 1);
          const past = date < today;
          const isSel = selected?.toDateString() === date.toDateString();
          return (
            <button
              key={i}
              type="button"
              disabled={past}
              onClick={() => onSelect(date)}
              className={`aspect-square rounded-full text-[13px] transition-colors ${
                isSel
                  ? "bg-espresso text-cream"
                  : past
                  ? "text-taupe/25"
                  : "text-espresso hover:bg-beige"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="grid gap-6 border-t border-espresso/12 py-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow>Step {n}</Eyebrow>
          <h2 className="font-display mt-3 text-3xl leading-tight">{title}</h2>
        </div>
        <div className="md:col-span-8 md:col-start-5">{children}</div>
      </div>
    </Reveal>
  );
}

export default function Reservations() {
  useTitle(
    "Reserve a Table at Luna Café",
    "Book a table at Luna Café in New Delhi — brunch, dinner and everything in between."
  );

  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [occasion, setOccasion] = useState("None");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  const dateLabel = date
    ? date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  const ready = Boolean(date && time && name);

  if (done)
    return (
      <section className="shell flex min-h-screen flex-col items-center justify-center py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow className="justify-center">Reservation request</Eyebrow>
          <h1 className="font-display mt-6 text-[13vw] leading-[0.95] sm:text-6xl md:text-7xl">
            Your table
            <br />
            is reserved.
          </h1>
          <p className="mx-auto mt-7 max-w-md text-[15px] font-light leading-relaxed text-taupe">
            We look forward to welcoming you to Luna, {name.split(" ")[0]}.
          </p>
          <div className="mx-auto mt-9 max-w-sm border border-espresso/12 p-6 text-left">
            {[
              ["Guests", guests],
              ["Date", dateLabel],
              ["Time", time],
              ["Occasion", occasion],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between border-b border-espresso/10 py-2.5 last:border-0"
              >
                <span className="eyebrow text-taupe">{k}</span>
                <span className="text-[14px] font-light">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                "Table at Luna Café"
              )}&details=${encodeURIComponent(`${guests} guests at ${time}`)}`}
            >
              Add to calendar
            </Button>
            <Button href={SITE.mapsUrl} variant="outline">
              Get directions
            </Button>
            <Button
              href={wa(
                `Hi Luna! I've just requested a table for ${guests} on ${dateLabel} at ${time}.`
              )}
              variant="outline"
            >
              WhatsApp Luna
            </Button>
          </div>
          <p className="mx-auto mt-10 max-w-md text-[12px] font-light leading-relaxed text-taupe/70">
            This is a front-end demonstration for a portfolio project. No booking
            system is connected and availability shown is illustrative only.
          </p>
        </motion.div>
      </section>
    );

  return (
    <>
      <header className="relative border-b hairline pt-32 md:pt-40">
        <div className="shell grid gap-10 pb-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>Reservations</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display mt-6 text-[14vw] leading-[0.94] sm:text-6xl md:text-[4.6rem]">
                Reserve
                <br />
                your table.
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-md text-[15px] font-light leading-[1.9] text-taupe">
                Five short steps. Walk-ins are always welcome, but weekends fill
                quickly — especially between eleven and two.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={0.1}>
              <img
                src={IMG.interiorPeople}
                alt="A laid table waiting in the Luna dining room"
                className="aspect-4/5 w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </header>

      <section className="shell py-14 md:py-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
            window.scrollTo({ top: 0 });
          }}
        >
          <Step n="01" title="Number of guests">
            <div className="flex flex-wrap gap-2.5">
              {GUESTS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGuests(g)}
                  aria-pressed={guests === g}
                  className={`h-14 w-14 rounded-full border text-[15px] transition-colors ${
                    guests === g
                      ? "border-espresso bg-espresso text-cream"
                      : "border-espresso/20 text-taupe hover:border-espresso/60"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <p className="mt-4 text-[13px] font-light text-taupe">
              Groups of seven or more — please{" "}
              <a
                href={wa("Hi Luna! I'd like to book for a larger group.")}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                message us on WhatsApp
              </a>
              .
            </p>
          </Step>

          <Step n="02" title="Select date">
            <div className="max-w-sm">
              <Calendar selected={date} onSelect={setDate} />
            </div>
            {date && (
              <p className="mt-4 text-[14px] font-light text-olive">{dateLabel}</p>
            )}
          </Step>

          <Step n="03" title="Select time">
            <div className="flex flex-wrap gap-2.5">
              {TIMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  aria-pressed={time === t}
                  className={`rounded-full border px-5 py-3.5 text-[13px] transition-colors ${
                    time === t
                      ? "border-espresso bg-espresso text-cream"
                      : "border-espresso/20 text-taupe hover:border-espresso/60"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="mt-4 text-[12px] font-light text-taupe/70">
              Times shown are illustrative. Live availability is not connected in
              this demonstration.
            </p>
          </Step>

          <Step n="04" title="Your details">
            <div className="grid gap-7 sm:grid-cols-2">
              <Field
                id="r-name"
                label="Name"
                required
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Field id="r-email" label="Email" type="email" required placeholder="you@example.com" />
              <Field id="r-phone" label="Phone" type="tel" required placeholder="+91 00000 00000" />
            </div>
          </Step>

          <Step n="05" title="Special request">
            <div className="flex flex-wrap gap-2.5">
              {OCCASIONS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOccasion(o)}
                  aria-pressed={occasion === o}
                  className={`eyebrow rounded-full border px-5 py-3 transition-colors ${
                    occasion === o
                      ? "border-olive bg-olive text-cream"
                      : "border-espresso/20 text-taupe hover:border-espresso/60"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            <div className="mt-8 max-w-xl">
              <TextArea
                id="r-msg"
                label="Anything we should know?"
                placeholder="Allergies, a quiet table, a cake at the end of the meal…"
              />
            </div>
          </Step>

          <div className="grid gap-6 border-t border-espresso/12 py-10 md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-5">
              <Button type="submit" disabled={!ready} className="w-full sm:w-auto">
                Confirm reservation
              </Button>
              {!ready && (
                <p className="mt-4 text-[13px] font-light text-taupe">
                  Choose a date, a time and add your name to continue.
                </p>
              )}
              <p className="mt-6 max-w-lg text-[12px] font-light leading-relaxed text-taupe/70">
                Front-end demonstration only — no reservation backend is
                connected, so nothing is actually booked.
              </p>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
