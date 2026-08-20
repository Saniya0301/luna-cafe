export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-fuchsia-600/10 blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm text-slate-300">Now taking bookings for Q3 2026</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            We build websites
            <br />
            that <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">actually convert</span>.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Nexus is a small, senior studio crafting lightning-fast, beautifully designed websites and web apps for startups and growing businesses.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition shadow-xl shadow-violet-500/20 flex items-center justify-center gap-2"
            >
              Book a free strategy call
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#work"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              See our work
            </a>
          </div>

          {/* Trusted by */}
          <div className="mt-20">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-6">Trusted by teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
              {["Acme Co.", "Lumen", "Quantum", "Flux", "Nimbus", "Orbit"].map((b) => (
                <span key={b} className="text-slate-400 text-lg font-semibold tracking-tight">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative card floating */}
      <div className="hidden lg:block absolute bottom-10 left-10 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl w-64 animate-[float_6s_ease-in-out_infinite]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <div className="text-xs font-mono text-slate-400 space-y-1">
          <div><span className="text-violet-400">const</span> <span className="text-sky-300">speed</span> = <span className="text-emerald-300">99</span>;</div>
          <div><span className="text-violet-400">const</span> <span className="text-sky-300">design</span> = <span className="text-amber-300">"perfect"</span>;</div>
          <div><span className="text-violet-400">const</span> <span className="text-sky-300">clients</span> = <span className="text-emerald-300">happy</span>;</div>
        </div>
      </div>
    </section>
  );
}
