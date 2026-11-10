import { FEATURES } from "@/lib/data";

export default function Features() {
  return (
    <section id="ozellikler" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Günlük tahsilat işiniz için ihtiyacınız olan her şey</h2>
      <p className="mt-3 max-w-2xl text-slate-300">Makbuzdan mutabakata, plasiyerden muhasebeciye kadar tek yerde.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <article key={f.title} className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-mint/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(45,212,191,.4)] ${f.wide ? "md:col-span-2" : ""}`}>
            <span className={`grid h-11 w-11 place-items-center rounded-xl ${i % 3 === 2 ? "bg-ember/15 text-ember" : "bg-mint/15 text-mint"}`}><f.icon size={22} aria-hidden /></span>
            <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-slate-300">{f.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
