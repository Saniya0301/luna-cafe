const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We start with a deep-dive call to understand your goals, audience, and brand. No fluff.",
  },
  {
    num: "02",
    title: "Design",
    desc: "High-fidelity Figma designs for every page, with revisions until you love it.",
  },
  {
    num: "03",
    title: "Develop",
    desc: "We build your site with modern, performant code. You'll get preview links all along the way.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "We handle deployment, DNS, SEO checks, and post-launch support for 30 days — free.",
  },
];

export default function Process() {
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-violet-400 uppercase tracking-widest mb-3">
            Our process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Simple, transparent, no surprises.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              <div className="glass rounded-2xl p-7 h-full">
                <div className="text-5xl font-bold text-violet-500/80 mb-4">
                  {s.num}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 text-white/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
