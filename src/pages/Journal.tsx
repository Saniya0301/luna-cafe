import { Link, useParams } from "react-router-dom";
import { JOURNAL } from "../data/content";
import { Button, Eyebrow, Reveal, TextLink, useTitle } from "../components/ui";

export function Journal() {
  useTitle(
    "Luna Café Journal",
    "Notes on coffee, food, people and slow mornings from the team at Luna Café."
  );
  const [lead, ...rest] = JOURNAL;

  return (
    <>
      <header className="border-b hairline pt-32 md:pt-40">
        <div className="shell pb-14">
          <Reveal>
            <Eyebrow>Journal</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-6 max-w-3xl text-[14vw] leading-[0.94] sm:text-6xl md:text-[5.2rem]">
              The Luna
              <br />
              <span className="italic font-light text-olive">Journal</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-lg text-[15px] font-light leading-[1.9] text-taupe">
              Notes from the bar, the pass and the corner table. Coffee,
              recipes, people, and the small rituals that make up a day here.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Lead article */}
      <section className="shell py-16 md:py-20">
        <Reveal>
          <Link to={`/journal/${lead.slug}`} className="group grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7 overflow-hidden bg-beige">
              <img
                src={lead.image}
                alt={lead.title}
                className="aspect-16/10 w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center md:col-span-5">
              <p className="eyebrow text-olive">
                {lead.category} · {lead.date}
              </p>
              <h2 className="font-display mt-4 text-4xl leading-[1.05] md:text-5xl">
                {lead.title}
              </h2>
              <p className="mt-5 text-[15px] font-light leading-[1.9] text-taupe">
                {lead.excerpt}
              </p>
              <p className="eyebrow mt-6 text-taupe/70">{lead.readTime}</p>
              <span className="mt-6">
                <TextLink to={`/journal/${lead.slug}`}>Read article</TextLink>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="shell pb-24 md:pb-32">
        <div className="grid gap-x-6 gap-y-14 border-t border-espresso/12 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.08}>
              <article className="group">
                <Link to={`/journal/${a.slug}`}>
                  <div className="overflow-hidden bg-beige">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="aspect-4/3 w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                    />
                  </div>
                  <p className="eyebrow mt-5 text-olive">
                    {a.category} · {a.date}
                  </p>
                  <h3 className="font-display mt-3 text-[1.75rem] leading-tight transition-transform duration-500 group-hover:translate-x-1">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed text-taupe">
                    {a.excerpt}
                  </p>
                  <span className="eyebrow mt-5 inline-block text-espresso link-underline pb-0.5">
                    Read article
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function Article() {
  const { slug } = useParams();
  const a = JOURNAL.find((x) => x.slug === slug);
  useTitle(
    a ? `${a.title} — Luna Café Journal` : "Luna Café Journal",
    a?.excerpt
  );

  if (!a)
    return (
      <section className="shell py-48 text-center">
        <h1 className="font-display text-5xl">Article not found.</h1>
        <div className="mt-8 flex justify-center">
          <Button to="/journal">Back to the journal</Button>
        </div>
      </section>
    );

  const others = JOURNAL.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <header className="border-b hairline pt-32 md:pt-40">
        <div className="shell pb-12">
          <Reveal>
            <Link to="/journal" className="eyebrow text-taupe hover:text-espresso">
              ← The Luna Journal
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="eyebrow mt-10 text-olive">
              {a.category} · {a.date} · {a.readTime}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 max-w-4xl text-[11vw] leading-[0.98] sm:text-5xl md:text-[4.4rem]">
              {a.title}
            </h1>
          </Reveal>
        </div>
        <div className="overflow-hidden bg-beige">
          <img
            src={a.image}
            alt={a.title}
            className="h-[45vh] w-full object-cover md:h-[65vh]"
          />
        </div>
      </header>

      <article className="shell py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-32">
              <p className="eyebrow text-taupe">Written by</p>
              <p className="font-display mt-2 text-2xl">The Luna Team</p>
              <p className="mt-6 text-[13px] font-light leading-relaxed text-taupe">
                {a.excerpt}
              </p>
            </div>
          </aside>
          <div className="md:col-span-8 md:col-start-5">
            <p className="font-display text-[1.75rem] leading-[1.45] text-espresso md:text-[2.1rem]">
              {a.body[0]}
            </p>
            {a.body.slice(1).map((p, i) => (
              <p
                key={i}
                className="mt-7 text-[16px] font-light leading-[1.95] text-taupe"
              >
                {p}
              </p>
            ))}
            <div className="mt-12 border-t border-espresso/12 pt-8">
              <Button to="/menu" variant="outline" arrow>
                See the menu
              </Button>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t hairline">
        <div className="shell py-16 md:py-24">
          <h2 className="font-display text-4xl">Keep reading</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/journal/${o.slug}`} className="group">
                <div className="overflow-hidden bg-beige">
                  <img
                    src={o.image}
                    alt={o.title}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-4 text-olive">{o.category}</p>
                <h3 className="font-display mt-2 text-2xl leading-tight">
                  {o.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
