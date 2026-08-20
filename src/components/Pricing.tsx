const plans = [
  {
    name: "Starter",
    price: "$2.5k",
    desc: "Perfect for a single landing page or small marketing site.",
    features: [
      "Up to 3 pages",
      "Mobile responsive",
      "Basic SEO setup",
      "Contact form",
      "2 rounds of revisions",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$7.5k",
    desc: "For startups and businesses ready to scale online.",
    features: [
      "Up to 10 pages",
      "Custom design in Figma",
      "CMS integration",
      "Advanced SEO + analytics",
      "Blog or case studies",
      "Unlimited revisions",
      "30 days of support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Full web apps, e‑commerce, or complex integrations.",
    features: [
      "Custom scope",
      "Web app development",
      "Headless CMS / Shopify",
      "API integrations",
      "Dedicated project manager",
      "Ongoing retainer available",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 relative">
      <div className="absolute inset-x-0 top-40 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-violet-400 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Straightforward packages.
          </h2>
          <p className="mt-5 text-lg text-slate-400">
            Every project is unique, but here's a rough idea. We'll always give you a fixed quote upfront.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 ${
                p.highlighted
                  ? "bg-gradient-to-b from-violet-600/20 to-indigo-600/10 border-2 border-violet-500/50 shadow-2xl shadow-violet-500/20 md:-translate-y-4"
                  : "glass"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider">
                  Most popular
                </div>
              )}

              <h3 className="text-xl font-semibold text-white">{p.name}</h3>
              <p className="text-slate-400 mt-1 text-sm">{p.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">{p.price}</span>
                {p.price !== "Custom" && (
                  <span className="text-slate-400 text-sm">/ project</span>
                )}
              </div>

              <a
                href="#contact"
                className={`mt-6 block text-center w-full px-5 py-3 rounded-full font-medium transition ${
                  p.highlighted
                    ? "bg-white text-slate-900 hover:bg-slate-200"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                Get started
              </a>

              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-slate-300 text-sm">
                    <svg
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        p.highlighted ? "text-violet-400" : "text-emerald-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
