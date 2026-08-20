const stats = [
  { value: "120+", label: "Websites launched" },
  { value: "8 yrs", label: "In business" },
  { value: "99", label: "Avg. Lighthouse score" },
  { value: "97%", label: "Client retention" },
];

export default function Stats() {
  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
