const quotes = [
  {
    quote:
      "Nexus delivered a site that not only looks incredible but converted 3x better than our old one within the first month. I'd hire them again in a heartbeat.",
    name: "Sarah Chen",
    role: "CEO, Lumen Candles",
    initials: "SC",
    color: "from-rose-500 to-pink-600",
  },
  {
    quote:
      "Working with this team was the smoothest project we've ever run. They understood our product better than we did and shipped on time, no drama.",
    name: "Marcus Rivera",
    role: "CTO, Quantum AI",
    initials: "MR",
    color: "from-violet-500 to-indigo-600",
  },
  {
    quote:
      "Our page speed went from 32 to 99. Organic traffic is up 180%. They genuinely care about the craft and it shows in every detail.",
    name: "Priya Natarajan",
    role: "Head of Growth, Orbit",
    initials: "PN",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-violet-400 uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Words from happy clients.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div
              key={q.name}
              className="glass rounded-2xl p-8 flex flex-col"
            >
              <svg className="w-8 h-8 text-violet-400 mb-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              <p className="text-slate-200 leading-relaxed flex-1">"{q.quote}"</p>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${q.color} grid place-items-center text-white font-semibold`}>
                  {q.initials}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{q.name}</div>
                  <div className="text-slate-400 text-xs">{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
