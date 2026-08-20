import { Suspense, lazy, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const Scene3D = lazy(() => import("../components/Scene3D"));
import { IMG } from "../data/images";
import { MOODS, SIGNATURE_PREVIEW, byId, type MenuItem } from "../data/menu";
import { GALLERY, SITE, TESTIMONIALS, wa } from "../data/content";
import { Button, Eyebrow, Reveal, SectionHead, TextLink, rupee, useTitle } from "../components/ui";
import { MenuCard, MenuItemModal } from "../components/MenuBits";
import { GalleryGrid } from "../components/GalleryGrid";

/* ---- Hero image with real 3D perspective tilt on pointer ---- */
function TiltImage() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });

  const rotateY = useTransform(sx, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateX = useTransform(sy, [-0.5, 0.5], ["-5deg", "5deg"]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["85%", "15%"]);
  const imgX = useTransform(sx, [-0.5, 0.5], ["3%", "-3%"]);
  const imgY = useTransform(sy, [-0.5, 0.5], ["2.5%", "-2.5%"]);

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div style={{ perspective: 1400 }}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden bg-beige will-change-transform"
      >
        <motion.img
          src="/images/hero.jpg"
          alt="Golden afternoon light across a table at Luna Café"
          style={{ x: imgX, y: imgY, scale: 1.1 }}
          className="h-[62vh] w-full object-cover md:h-[78vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* moving light glare */}
        <motion.div
          aria-hidden="true"
          style={{
            background: useTransform(
              glareX,
              (v) =>
                `radial-gradient(60% 80% at ${v} 20%, rgba(255,240,214,0.28), transparent 70%)`
            ),
          }}
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        />
      </motion.div>
    </div>
  );
}

/* ============ 01 · HERO ============ */
function Hero() {
  return (
    <section className="relative border-b hairline pt-28 md:pt-32">
      <div className="shell grid items-stretch gap-10 pb-14 md:grid-cols-12 md:gap-8 md:pb-20">
        {/* Left */}
        <div className="flex flex-col justify-center md:col-span-5 md:pr-4">
          <Reveal>
            <Eyebrow>Luna Café · Est. 2021</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-7 text-[15vw] leading-[0.92] sm:text-[5.5rem] md:text-[4.4rem] lg:text-[5.6rem] xl:text-[6.4rem]">
              Coffee,
              <br />
              <span className="italic font-light text-olive">conversations</span>
              <br />
              &amp; slow
              <br />
              moments.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-sm text-[15px] font-light leading-[1.85] text-taupe">
              Specialty coffee, seasonal plates and freshly baked treats, served
              in a space made for lingering.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/menu">View menu</Button>
              <Button to="/reservations" variant="outline">
                Reserve a table
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-10 flex items-center gap-3 text-[13px] font-light italic text-taupe">
              <span className="h-px w-8 bg-espresso/25" />
              A little space to slow down.
            </p>
          </Reveal>
        </div>

        {/* Right */}
        <div className="relative md:col-span-7">
          <TiltImage />

          {/* Floating find-us card */}
          <motion.a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="group absolute bottom-4 left-4 z-10 w-[15rem] border border-espresso/10 bg-cream/95 p-5 shadow-[0_24px_50px_-24px_rgba(32,35,26,0.5)] backdrop-blur-sm transition-colors hover:bg-cream md:bottom-8 md:left-8"
          >
            <div className="flex items-start justify-between">
              <span className="eyebrow text-taupe">Find us</span>
              <span className="text-espresso transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </div>
            <p className="font-display mt-3 text-2xl leading-none">New Delhi</p>
            <p className="mt-2 text-[13px] font-light text-taupe">
              {SITE.address1}
            </p>
            <span className="eyebrow mt-4 inline-block text-olive">
              Get directions
            </span>
          </motion.a>

          {/* Open today badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.9 }}
            className="absolute right-0 top-6 z-10 hidden bg-espresso px-5 py-4 text-cream shadow-[0_20px_44px_-22px_rgba(32,35,26,0.7)] md:block"
          >
            <p className="eyebrow text-cream/60">Open today</p>
            <p className="mt-1.5 text-[14px] font-light tabular-nums">
              8:00 AM — 11:00 PM
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="shell hidden items-center gap-3 pb-6 md:flex"
      >
        <span className="eyebrow text-taupe/70">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="text-taupe/70"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

/* ============ 02 · QUICK INFO ============ */
const QUICK = [
  { k: "Open today", v: "8 AM — 11 PM" },
  { k: "Location", v: "New Delhi" },
  { k: "Reservations", v: "Available" },
  { k: "Menu", v: "Seasonal" },
];

function QuickInfo() {
  return (
    <section className="border-b hairline bg-beige/45">
      <div className="shell grid grid-cols-2 divide-x divide-espresso/10 md:grid-cols-4">
        {QUICK.map((q, i) => (
          <Reveal
            key={q.k}
            delay={i * 0.06}
            className={`px-4 py-7 text-center md:py-9 ${
              i < 2 ? "border-b border-espresso/10 md:border-b-0" : ""
            }`}
          >
            <p className="eyebrow text-taupe">{q.k}</p>
            <p className="font-display mt-2 text-2xl md:text-[1.75rem]">{q.v}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ 03 · INTRODUCTION ============ */
function Intro() {
  return (
    <section className="shell py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5 md:pt-10">
          <Reveal>
            <Eyebrow>Introduction</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 text-5xl leading-[1] md:text-[4rem]">
              More than
              <br />
              a café.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 text-[15px] font-light leading-[1.9] text-taupe">
              Luna was created for the moments between things — your first coffee
              of the morning, an unhurried brunch, an afternoon spent working, or
              a long conversation after sunset.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 text-[15px] font-light leading-[1.9] text-taupe">
              We believe thoughtful food, beautiful spaces and genuine
              hospitality can turn an ordinary visit into a moment worth
              remembering.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9">
              <TextLink to="/about">Our story</TextLink>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <div className="overflow-hidden bg-beige">
              <img
                src={IMG.interiorWarm}
                alt="Soft lamplight over the corner banquette at Luna"
                loading="lazy"
                className="aspect-3/4 w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="mt-6 flex items-end gap-6">
            <Reveal delay={0.1} className="w-1/2">
              <div className="overflow-hidden bg-beige">
                <img
                  src={IMG.baristaPour}
                  alt="A barista finishing a pour at the bar"
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.16} className="w-1/2">
              <p className="text-[13px] font-light italic leading-relaxed text-taupe">
                “Made slowly. Served warmly.”
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ 04 · WHY LUNA ============ */
const WHY = [
  {
    n: "01",
    t: "Specialty Coffee",
    d: "Thoughtfully sourced beans and carefully crafted espresso, dialled in every morning before the doors open.",
  },
  {
    n: "02",
    t: "Fresh From The Kitchen",
    d: "Seasonal dishes and pastries prepared with care, on a menu short enough that everything is made properly.",
  },
  {
    n: "03",
    t: "A Space To Stay",
    d: "Come for coffee. Stay for conversations, work and slow evenings — nobody will hurry your table.",
  },
];

function WhyLuna() {
  return (
    <section className="border-y hairline bg-beige/40">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow>Why Luna</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display mt-6 text-5xl leading-[1] md:text-[3.6rem]">
                Why Luna?
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="divide-y divide-espresso/12 border-t border-espresso/12">
              {WHY.map((w, i) => (
                <Reveal key={w.n} delay={i * 0.08}>
                  <div className="group grid grid-cols-[3rem_1fr] gap-5 py-9 md:grid-cols-[5rem_1fr]">
                    <span className="font-display text-2xl text-olive/70">{w.n}</span>
                    <div>
                      <h3 className="font-display text-[1.9rem] leading-tight md:text-[2.2rem]">
                        {w.t}
                      </h3>
                      <p className="mt-3 max-w-md text-[14.5px] font-light leading-[1.85] text-taupe">
                        {w.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ 06 · FEATURED SIGNATURE ============ */
function Signature() {
  const item = byId("pistachio-cloud-latte")!;
  return (
    <section className="relative border-y hairline">
      <div className="grid md:grid-cols-2">
        <div className="order-2 flex items-center bg-espresso px-6 py-20 text-cream md:order-1 md:px-14 lg:px-20">
          <div>
            <Reveal>
              <Eyebrow className="!text-cream/60">The Luna Signature</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display mt-6 text-5xl leading-[1] text-cream md:text-[4rem]">
                Pistachio
                <br />
                <span className="italic font-light">Cloud Latte</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-sm text-[15px] font-light leading-[1.9] text-cream/70">
                Our signature espresso creation, finished with silky milk and
                house-made pistachio cream. Eleven attempts, one stubborn
                barista, and the only item we've never been able to take off the
                board.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="font-display mt-8 text-3xl text-cream tabular-nums">
                {rupee(item.price)}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8">
                <Button
                  to="/journal/the-story-behind-our-pistachio-latte"
                  variant="light"
                  arrow
                >
                  Discover the signature
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="order-1 overflow-hidden bg-beige md:order-2">
          <motion.img
            src={IMG.heartLatte}
            alt="The Pistachio Cloud Latte, finished with pistachio cream"
            loading="lazy"
            className="h-[50vh] w-full object-cover md:h-full md:min-h-[38rem]"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </section>
  );
}

/* ============ 06b · 3D CRAFT ============ */
function Craft3D() {
  return (
    <section className="relative overflow-hidden border-b hairline bg-beige/45">
      {/* soft radial light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 55% at 62% 45%, rgba(255,244,224,0.85), transparent 70%)",
        }}
      />
      <div className="shell relative grid items-center gap-8 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <Reveal>
            <Eyebrow>In three dimensions</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 text-5xl leading-[1] md:text-[3.4rem]">
              Turn it
              <br />
              around.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-sm text-[15px] font-light leading-[1.9] text-taupe">
              Our cups are thrown by a studio two hours outside the city —
              thick-walled, slightly uneven, and warm in the hand for longer.
              Drag to look closer.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 space-y-3 border-t border-espresso/12 pt-6">
              {[
                ["Vessel", "Hand-thrown stoneware, 220 ml"],
                ["Glaze", "Matte ivory, food-safe"],
                ["Inside", "A double ristretto and silk microfoam"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3">
                  <span className="eyebrow text-taupe">{k}</span>
                  <span className="text-[14px] font-light text-espresso">{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="eyebrow mt-8 flex items-center gap-2.5 text-olive">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-olive/40">
                ✥
              </span>
              Drag to rotate
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal delay={0.1}>
            <Suspense
              fallback={
                <div className="grid h-[22rem] w-full place-items-center sm:h-[26rem] md:h-[32rem]">
                  <span className="eyebrow text-taupe/60">Warming the cup…</span>
                </div>
              }
            >
              <Scene3D />
            </Suspense>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ 07 · MOOD MENU ============ */
function MoodMenu() {
  const [active, setActive] = useState(MOODS[0]);
  return (
    <section className="shell py-24 md:py-32">
      <SectionHead
        eyebrow="Choose your own"
        title={
          <>
            What are you in
            <br />
            the mood for?
          </>
        }
        intro="Tell us how the day is going and we'll point you at three things worth ordering."
      />

      <div className="mt-12 -mx-5 flex gap-2.5 overflow-x-auto px-5 no-scrollbar md:mx-0 md:flex-wrap md:px-0">
        {MOODS.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m)}
            aria-pressed={active.id === m.id}
            className={`eyebrow shrink-0 rounded-full border px-6 py-3.5 transition-all duration-500 ${
              active.id === m.id
                ? "border-espresso bg-espresso text-cream"
                : "border-espresso/20 text-taupe hover:border-espresso/60 hover:text-espresso"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <motion.p
        key={active.id + "-note"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-[15px] font-light italic text-taupe"
      >
        {active.note}
      </motion.p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {active.items.map((id, i) => {
          const it = byId(id);
          if (!it) return null;
          return (
            <motion.div
              key={active.id + id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/menu" className="group block">
                <div className="overflow-hidden bg-beige">
                  <img
                    src={it.image}
                    alt={it.name}
                    loading="lazy"
                    className="aspect-4/5 w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                </div>
                <div className="flex items-baseline justify-between border-b border-espresso/12 pt-4 pb-3">
                  <h3 className="font-display text-xl">{it.name}</h3>
                  <span className="text-[14px] tabular-nums text-taupe">
                    {rupee(it.price)}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ============ 08 · AMBIENCE ============ */
const TIMES = [
  { t: "Morning", d: "Coffee, pastries & quiet corners." },
  { t: "Afternoon", d: "Brunch, conversations & work." },
  { t: "Evening", d: "Desserts, warm lights & slow evenings." },
];

function Ambience() {
  return (
    <section className="relative isolate overflow-hidden border-y hairline">
      <img
        src={IMG.interiorBangkok}
        alt="The Luna room as the evening lights come on"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-espresso/70" />
      <div className="shell relative py-24 md:py-36">
        <Reveal>
          <h2 className="font-display max-w-2xl text-[11vw] leading-[0.98] text-cream sm:text-5xl md:text-[4.2rem]">
            Come for the coffee.
            <br />
            <span className="italic font-light">Stay for the moment.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-px border-t border-cream/20 md:grid-cols-3 md:gap-0">
          {TIMES.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.1}>
              <div
                className={`py-8 md:px-8 ${
                  i > 0 ? "border-t border-cream/15 md:border-l md:border-t-0" : "md:pl-0"
                }`}
              >
                <p className="eyebrow text-cream/50">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 text-3xl text-cream">{x.t}</h3>
                <p className="mt-2.5 text-[14px] font-light leading-relaxed text-cream/70">
                  {x.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ 10 · STORY ============ */
function Story() {
  return (
    <section className="shell py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <div className="overflow-hidden bg-beige">
              <img
                src={IMG.interiorPlants}
                alt="The window seat framed by greenery"
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-5 md:col-start-8 md:pt-12">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 text-5xl leading-[1] md:text-[3.6rem]">
              The story
              <br />
              behind Luna.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 text-[15px] font-light leading-[1.9] text-taupe">
              Luna began with a simple idea: create a place where exceptional
              coffee and good food could bring people together. Our founder,
              Meher, spent a decade in kitchens across three cities before
              signing the lease on a narrow, sunlit room with terrible wiring and
              a beautiful window.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 text-[15px] font-light leading-[1.9] text-taupe">
              Three years later the wiring is fixed, the window is still the best
              seat in the house, and the room is full of people who came for a
              coffee and stayed for the afternoon.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9">
              <TextLink to="/about">Discover our story</TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ 11 · EVENTS ============ */
const EVENT_PREVIEW = [
  { n: "Birthdays", img: IMG.gathering },
  { n: "Private Dinners", img: IMG.parisEvening },
  { n: "Corporate Gatherings", img: IMG.interiorModern },
  { n: "Brunch Events", img: IMG.breakfastSpread },
];

function Events() {
  return (
    <section className="border-y hairline bg-beige/40">
      <div className="shell py-24 md:py-32">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>Private hire</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display mt-6 text-5xl leading-[1] md:text-[3.6rem]">
                Make it a
                <br />
                Luna moment.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.12}>
              <p className="text-[15px] font-light leading-[1.9] text-taupe">
                From intimate birthday dinners to creative gatherings, Luna is
                available for moments worth celebrating.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EVENT_PREVIEW.map((e, i) => (
            <Reveal key={e.n} delay={i * 0.07}>
              <Link to="/events" className="group block">
                <div className="overflow-hidden bg-beige">
                  <img
                    src={e.img}
                    alt={e.n}
                    loading="lazy"
                    className="aspect-3/4 w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between border-b border-espresso/12 pt-4 pb-3">
                  <h3 className="font-display text-xl">{e.n}</h3>
                  <span className="text-taupe transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <Button to="/events" variant="outline" arrow>
              Plan your event
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ 12 · TESTIMONIALS ============ */
function Testimonials() {
  return (
    <section className="shell py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHead eyebrow="Community" title={<>Loved by our<br />community.</>} />
        <Reveal delay={0.1}>
          <div className="text-left md:text-right">
            <p className="text-lg tracking-[0.3em] text-olive">★★★★★</p>
            <p className="font-display mt-2 text-3xl">4.8 / 5</p>
            <p className="mt-1 text-[12px] font-light text-taupe">
              Illustrative rating for this portfolio project
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="flex h-full flex-col justify-between border border-espresso/12 p-8">
              <blockquote className="font-display text-[1.6rem] leading-[1.35] text-espresso">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-espresso/12 pt-5">
                <p className="eyebrow text-espresso">— {t.name}</p>
                <p className="mt-1.5 text-[13px] font-light text-taupe">{t.detail}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-[12px] font-light leading-relaxed text-taupe/70">
          Note: Luna Café is a fictional brand. These testimonials are written
          demonstrations created for this portfolio project and are not verified
          customer reviews.
        </p>
      </Reveal>
    </section>
  );
}

/* ============ 13 · RESERVATION CTA ============ */
function ReserveCTA() {
  return (
    <section className="relative isolate overflow-hidden border-y hairline">
      <img
        src={IMG.conversation}
        alt="A table set and waiting at Luna Café"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-espresso/68" />
      <div className="shell relative flex flex-col items-start py-24 md:py-32">
        <Reveal>
          <Eyebrow className="!text-cream/60">Reservations</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display mt-6 max-w-xl text-[12vw] leading-[0.98] text-cream sm:text-6xl md:text-[4.4rem]">
            Your table
            <br />
            is waiting.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed text-cream/70">
            Join us for coffee, brunch, dinner and everything in between.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button to="/reservations" variant="solidLight">
              Reserve a table
            </Button>
            <Button
              href={wa("Hi Luna! I'd like to book a table.")}
              variant="light"
            >
              Book via WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ 14 · LOCATION ============ */
function Location() {
  return (
    <section className="shell py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <Eyebrow>Visit</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 text-5xl leading-[1] md:text-[3.4rem]">
              Find your way
              <br />
              to Luna.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-6 border-t border-espresso/12 pt-8">
            {[
              { k: "Address", v: `${SITE.address1}\n${SITE.address2}` },
              { k: "Open today", v: "8:00 AM — 11:00 PM" },
              { k: "Phone", v: SITE.phone },
              { k: "Email", v: SITE.email },
            ].map((r, i) => (
              <Reveal key={r.k} delay={i * 0.05}>
                <div className="grid grid-cols-[7.5rem_1fr] gap-4">
                  <span className="eyebrow text-taupe">{r.k}</span>
                  <span className="whitespace-pre-line text-[15px] font-light text-espresso">
                    {r.v}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={SITE.mapsUrl}>Get directions</Button>
              <a
                href={SITE.phoneHref}
                className="inline-flex min-h-[52px] items-center rounded-full border border-espresso/25 px-7 eyebrow transition-colors hover:border-espresso hover:bg-espresso hover:text-cream"
              >
                Call
              </a>
              <Button href={wa("Hi Luna!")} variant="outline">
                WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full min-h-[22rem] overflow-hidden border border-espresso/12 bg-beige"
            >
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(109,107,78,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(109,107,78,0.22) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <div className="absolute left-0 top-1/3 h-[3px] w-full -rotate-6 bg-espresso/12" />
              <div className="absolute left-1/3 top-0 h-full w-[3px] rotate-3 bg-espresso/12" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-espresso/25 bg-cream text-espresso transition-transform duration-500 group-hover:-translate-y-1">
                  ◎
                </span>
                <p className="font-display mt-5 text-3xl">Luna Café</p>
                <p className="mt-1.5 text-[13px] font-light text-taupe">
                  {SITE.address1}, {SITE.address2}
                </p>
                <span className="eyebrow mt-6 rounded-full border border-espresso/25 bg-cream px-5 py-2.5 text-espresso">
                  Open in Google Maps ↗
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ PAGE ============ */
export default function Home() {
  useTitle(
    "Luna Café — Coffee, Brunch & Slow Moments",
    "Luna Café is a boutique neighbourhood café in New Delhi serving specialty coffee, seasonal plates and fresh pastries."
  );
  const [active, setActive] = useState<MenuItem | null>(null);
  const preview = SIGNATURE_PREVIEW.map((id) => byId(id)!).filter(Boolean);

  return (
    <>
      <Hero />
      <QuickInfo />
      <Intro />
      <WhyLuna />

      {/* 05 · Signature menu preview */}
      <section className="shell py-24 md:py-32">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow="A taste of Luna"
            title={<>Our favourites,<br />crafted for slow mornings.</>}
            intro="Six things we would happily order ourselves, on any day of the week."
          />
          <Reveal delay={0.12}>
            <div className="shrink-0 pb-2">
              <TextLink to="/menu">View full menu</TextLink>
            </div>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((it, i) => (
            <MenuCard key={it.id} item={it} index={i} onOpen={setActive} />
          ))}
        </div>
      </section>

      <Signature />
      <Craft3D />
      <MoodMenu />
      <Ambience />

      {/* 09 · Gallery preview */}
      <section className="shell py-24 md:py-32">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow="Gallery" title={<>A glimpse<br />of Luna.</>} />
          <Reveal delay={0.1}>
            <div className="shrink-0 pb-2">
              <TextLink to="/gallery">View full gallery</TextLink>
            </div>
          </Reveal>
        </div>
        <div className="mt-12">
          <GalleryGrid images={GALLERY.slice(0, 9)} />
        </div>
      </section>

      <Story />
      <Events />
      <Testimonials />
      <ReserveCTA />
      <Location />

      <MenuItemModal item={active} onClose={() => setActive(null)} />
    </>
  );
}
