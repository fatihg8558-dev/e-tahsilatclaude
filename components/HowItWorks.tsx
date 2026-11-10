import { STEPS } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section id="nasil" className="border-y border-white/10 bg-white/[0.02] py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">3 adımda başlayın</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/10 p-6">
              <span className={`text-5xl font-extrabold ${i === 2 ? "text-ember" : "text-mint"}`}>{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-slate-300">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
