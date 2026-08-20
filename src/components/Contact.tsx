import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-slate-900 p-8 md:p-16">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/30 blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-medium text-violet-400 uppercase tracking-widest mb-3">
                Let's talk
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Have a project in mind?
              </h2>
              <p className="mt-5 text-lg text-slate-300 leading-relaxed">
                Tell us about it — we usually reply within one business day. No sales pressure, promise.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 grid place-items-center">
                    <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  hello@nexusstudio.dev
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 grid place-items-center">
                    <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  Remote · Based in Austin, TX
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="glass rounded-2xl p-6 md:p-8 space-y-4"
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/20 grid place-items-center mb-4">
                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Thanks!</h3>
                  <p className="text-slate-400 mt-2">We'll be in touch shortly.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm text-slate-300 mb-1.5 block">Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 mb-1.5 block">Email</label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 mb-1.5 block">
                      What are you building?
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition resize-none"
                      placeholder="Tell us about your project, timeline, budget (if you have one)..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition shadow-lg shadow-white/10"
                  >
                    Send message
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
