const projects = [
  {
    title: "Finvest Dashboard",
    tag: "SaaS · Fintech",
    desc: "A real-time investment dashboard with 10× faster load times.",
    gradient: "from-violet-600 via-indigo-600 to-blue-600",
  },
  {
    title: "Lumen Store",
    tag: "E‑commerce",
    desc: "Minimal Shopify store for a premium candle brand. +240% conversion.",
    gradient: "from-amber-500 via-rose-500 to-pink-600",
  },
  {
    title: "Orbit Travel",
    tag: "Marketing site",
    desc: "Award-nominated site for a luxury travel agency.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
  },
  {
    title: "Quantum AI",
    tag: "Startup · AI",
    desc: "Launch site and waitlist for a generative AI product.",
    gradient: "from-fuchsia-600 via-purple-600 to-indigo-700",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-violet-400 uppercase tracking-widest mb-3">
              Selected work
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Sites we're proud of.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-white font-medium hover:text-violet-400 transition"
          >
            View all projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
            >
              <div
                className={`aspect-[4/3] bg-gradient-to-br ${p.gradient} relative overflow-hidden`}
              >
                {/* Decorative shapes */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-black/20 blur-3xl" />
                </div>

                {/* Mock browser window */}
                <div className="absolute inset-8 md:inset-12 rounded-2xl bg-white/95 shadow-2xl overflow-hidden flex flex-col group-hover:scale-[1.03] transition-transform duration-500">
                  <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 px-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 p-4 space-y-2 bg-slate-50">
                    <div className="h-3 w-3/4 rounded bg-slate-200" />
                    <div className="h-3 w-1/2 rounded bg-slate-200" />
                    <div className="h-20 rounded bg-slate-200/60 mt-4" />
                    <div className="flex gap-2 mt-4">
                      <div className="h-8 w-20 rounded-full bg-slate-200" />
                      <div className="h-8 w-16 rounded-full bg-slate-100 border border-slate-200" />
                    </div>
                    {i % 2 === 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="aspect-square rounded bg-slate-200/70" />
                        <div className="aspect-square rounded bg-slate-200/70" />
                        <div className="aspect-square rounded bg-slate-200/70" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-5 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-violet-400 font-medium">
                    {p.tag}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="text-slate-400 mt-1">{p.desc}</p>
                </div>
                <div className="h-10 w-10 shrink-0 rounded-full bg-white/5 border border-white/10 grid place-items-center group-hover:bg-white group-hover:text-slate-900 transition text-white">
                  <svg className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
