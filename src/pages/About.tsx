import { IMG } from "../data/images";
import { Button, Eyebrow, PageHero, Reveal, SectionHead, useTitle } from "../components/ui";
import { wa } from "../data/content";

const VALUES = [
  {
    n: "01",
    t: "Hospitality",
    d: "Knowing a name, remembering an order, never rushing a table. The coffee is the reason people come in; hospitality is why they come back.",
  },
  {
    n: "02",
    t: "Craft",
    d: "Dough folded over two days. Espresso tasted every morning. A short menu, made properly, changed only when the season asks for it.",
  },
  {
    n: "03",
    t: "Community",
    d: "Three reading groups, two supper clubs and a wall we lend to local photographers. Luna belongs to the block it sits on.",
  },
];

const TEAM = [
  { name: "Meher Kapoor", role: "Founder", img: IMG.twoWomen },
  { name: "Ishaan Rao", role: "Head Barista", img: IMG.baristaHold },
  { name: "Meera D'Souza", role: "Head Chef", img: IMG.mushroomPlate },
];

function Split({
  eyebrow,
  title,
  body,
  image,
  alt,
  flip = false,
}: {
  eyebrow: string;
  title: string;
  body: string[];
  image: string;
  alt: string;
  flip?: boolean;
}) {
  return (
    <section className="shell py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-12">
        <div className={`md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}>
          <Reveal>
            <div className="overflow-hidden bg-beige">
              <img
                src={image}
                alt={alt}
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
        <div
          className={`md:col-span-5 md:pt-10 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}
        >
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-6 text-4xl leading-[1.05] md:text-[3.2rem]">
              {title}
            </h2>
          </Reveal>
          {body.map((p, i) => (
            <Reveal key={i} delay={0.12 + i * 0.06}>
              <p className="mt-6 text-[15px] font-light leading-[1.9] text-taupe">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  useTitle(
    "About Luna Café",
    "The story, philosophy, coffee, kitchen, space and team behind Luna Café in New Delhi."
  );

  return (
    <>
      <PageHero
        eyebrow="About Luna"
        title={
          <>
            More than
            <br />
            <span className="italic font-light text-olive">a café.</span>
          </>
        }
        intro="A narrow, sunlit room, a short menu and a stubborn belief that people should be allowed to stay as long as they like."
        image={IMG.interiorModern}
        alt="The bar and back counter at Luna Café"
      />

      <Split
        eyebrow="Our story"
        title="It started with a window."
        body={[
          "Meher spent a decade in kitchens across three cities before she found the room. It was too narrow, the wiring was a hazard, and the rent was optimistic — but the light came through the front window from eight until four, and that settled it.",
          "Luna opened in the spring of 2021 with nine tables, one espresso machine and a menu of six things. The pastry counter came six months later. The back room, now our events space, was a storeroom until a book club asked if they could use it.",
          "Three years on, very little of the original plan survived except the window seat. That, we protect.",
        ]}
        image={IMG.interiorPlants}
        alt="The sunlit window seat at Luna Café"
      />

      <section className="border-y hairline bg-beige/40">
        <div className="shell py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Our philosophy</Eyebrow>
              <h2 className="font-display mt-6 text-4xl leading-[1.05] md:text-[3.2rem]">
                Fewer things,
                <br />
                done properly.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="font-display text-[1.9rem] leading-[1.35] text-espresso md:text-[2.3rem]">
                “We would rather make twelve dishes we're proud of than forty we
                can defend.”
              </p>
              <p className="mt-7 text-[15px] font-light leading-[1.9] text-taupe">
                Everything at Luna is built around that sentence. It is why the
                menu is short, why the pastry team starts at four in the morning,
                and why we take things off the board the moment the produce stops
                being worth it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Split
        eyebrow="Our coffee"
        title="Eighty percent of it is water."
        body={[
          "We buy in small lots from two roasters we've worked with since the beginning, and rotate a seasonal single origin alongside the house blend. Beans are never more than three weeks off roast.",
          "Our water is filtered and remineralised to a fixed profile, checked weekly. Every morning the grinder is dialled in against a scale and a timer, and the shot is tasted before the doors open. If it isn't right, we don't open.",
        ]}
        image={IMG.baristaPour}
        alt="Barista dialling in espresso at the Luna bar"
        flip
      />

      <Split
        eyebrow="Our kitchen"
        title="Four people, one pass."
        body={[
          "The menu changes four times a year and quietly in between, depending on what the produce markets are doing. Bread and laminated dough begin at four in the morning and are folded over two days.",
          "Above the tickets there is a single line taped to the wall: would you be pleased if this arrived at your table? Everything that leaves the pass has to answer yes.",
        ]}
        image={IMG.pastryRack}
        alt="Pastries cooling on racks in the Luna kitchen"
      />

      <Split
        eyebrow="Our space"
        title="Designed to be lingered in."
        body={[
          "Lime plaster, reclaimed teak, and lighting warm enough to be kind at eight in the evening. Nine tables, one long communal table and a back room that seats twenty-four.",
          "There are power points at every seat, but on weekends we ask that laptops stay out of the main room. It keeps the space social — which was always the point.",
        ]}
        image={IMG.interiorWarm}
        alt="The warm interior of the Luna dining room"
        flip
      />

      <section className="shell py-20 md:py-28">
        <SectionHead eyebrow="Our team" title={<>The people<br />behind the pass.</>} />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="group">
                <div className="overflow-hidden bg-beige">
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    className="aspect-3/4 w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display mt-5 text-2xl">{t.name}</h3>
                <p className="eyebrow mt-2 text-taupe">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y hairline bg-beige/40">
        <div className="shell py-20 md:py-28">
          <SectionHead eyebrow="Our values" title="What we hold to." />
          <div className="mt-12 divide-y divide-espresso/12 border-t border-espresso/12">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.07}>
                <div className="grid gap-4 py-9 md:grid-cols-12">
                  <span className="font-display text-2xl text-olive/70 md:col-span-2">
                    {v.n}
                  </span>
                  <h3 className="font-display text-3xl md:col-span-3">{v.t}</h3>
                  <p className="max-w-xl text-[14.5px] font-light leading-[1.85] text-taupe md:col-span-7">
                    {v.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-display max-w-lg text-4xl leading-tight md:text-5xl">
            Come and see the window for yourself.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button to="/reservations">Reserve a table</Button>
            <Button href={wa("Hi Luna! I'd like to know more.")} variant="outline">
              WhatsApp Luna
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
