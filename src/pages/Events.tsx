import { useState } from "react";
import { EVENT_TYPES, GALLERY, wa } from "../data/content";
import { IMG } from "../data/images";
import { GalleryGrid } from "../components/GalleryGrid";
import {
  Button,
  Eyebrow,
  Field,
  PageHero,
  Reveal,
  SectionHead,
  Select,
  TextArea,
  useTitle,
} from "../components/ui";

export default function Events() {
  useTitle(
    "Celebrate at Luna Café — Private Events & Enquiries",
    "Birthdays, private dinners, corporate gatherings and brunch events at Luna Café, New Delhi."
  );
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Private hire"
        title={
          <>
            Celebrate
            <br />
            <span className="italic font-light text-olive">at Luna.</span>
          </>
        }
        intro="A section of the room or the whole of it, for up to sixty guests. We'll build the menu with you and get the lighting right."
        image={IMG.gathering}
        alt="A small celebration at the back table of Luna Café"
      />

      <section className="shell py-20 md:py-28">
        <SectionHead
          eyebrow="Formats"
          title={<>Moments worth<br />celebrating.</>}
          intro="Six formats we host regularly — though if what you have in mind isn't listed, ask anyway."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {EVENT_TYPES.map((e, i) => (
            <Reveal key={e.name} delay={(i % 2) * 0.08}>
              <article className="group grid h-full grid-cols-1 border border-espresso/12 sm:grid-cols-2">
                <div className="overflow-hidden bg-beige">
                  <img
                    src={e.image}
                    alt={e.name}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105 sm:h-full"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <h3 className="font-display text-[1.8rem] leading-tight">
                    {e.name}
                  </h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed text-taupe">
                    {e.desc}
                  </p>
                  <dl className="mt-5 space-y-2.5 border-t border-espresso/12 pt-4 text-[13px] font-light">
                    <div>
                      <dt className="eyebrow text-taupe/70">Capacity</dt>
                      <dd className="text-espresso">{e.capacity}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-taupe/70">Menu</dt>
                      <dd className="text-espresso">{e.menu}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-taupe/70">Ambience</dt>
                      <dd className="text-espresso">{e.ambience}</dd>
                    </div>
                  </dl>
                  <a
                    href="#enquiry"
                    className="eyebrow mt-6 inline-block text-espresso link-underline pb-0.5"
                  >
                    Enquire →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y hairline bg-beige/40">
        <div className="shell py-20 md:py-28">
          <SectionHead eyebrow="The room" title="How it looks when it's yours." />
          <div className="mt-12">
            <GalleryGrid images={GALLERY.filter((g) => g.cat === "events" || g.cat === "space")} />
          </div>
        </div>
      </section>

      <section id="enquiry" className="shell py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Enquiries</Eyebrow>
            <h2 className="font-display mt-6 text-4xl leading-[1.05] md:text-[3rem]">
              Plan your
              <br />
              event.
            </h2>
            <p className="mt-6 text-[15px] font-light leading-[1.9] text-taupe">
              Tell us the date and roughly how many people, and we'll come back
              with options, a draft menu and a quote — usually within a day.
            </p>
            <div className="mt-8">
              <Button
                href={wa("Hi Luna! I'd like to enquire about hosting an event.")}
                variant="outline"
              >
                Event enquiry on WhatsApp
              </Button>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {sent ? (
              <Reveal>
                <div className="border border-espresso/12 p-10 text-center">
                  <h3 className="font-display text-5xl leading-none">Thank you.</h3>
                  <p className="mt-5 text-[15px] font-light text-taupe">
                    We'll be in touch shortly.
                  </p>
                  <p className="mx-auto mt-8 max-w-sm text-[12px] font-light leading-relaxed text-taupe/70">
                    Front-end demonstration — this enquiry has not been sent
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
                <Field id="e-name" label="Name" required placeholder="Your full name" />
                <Field id="e-email" label="Email" type="email" required placeholder="you@example.com" />
                <Field id="e-phone" label="Phone" type="tel" required placeholder="+91 00000 00000" />
                <Select
                  id="e-type"
                  label="Event type"
                  options={EVENT_TYPES.map((t) => t.name).concat("Something else")}
                />
                <Field id="e-date" label="Preferred date" type="date" required />
                <Field id="e-guests" label="Number of guests" type="number" min={2} placeholder="24" />
                <div className="sm:col-span-2">
                  <TextArea
                    id="e-msg"
                    label="Message"
                    placeholder="Tell us about the occasion, the mood, any dietary needs…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit">Send event enquiry</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
