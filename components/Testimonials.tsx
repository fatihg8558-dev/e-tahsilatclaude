import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

// Yalnızca gerçek yorumlarla ve SHOW_TESTIMONIALS = true iken gösterilir.
export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Kullanıcılarımız ne diyor?</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex gap-0.5" aria-label={`${t.stars} yıldız`}>
              {Array.from({ length: t.stars }).map((_, i) => (<Star key={i} size={16} className="fill-ember text-ember" aria-hidden />))}
            </div>
            <blockquote className="mt-3 text-slate-200">{t.text}</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-mint/20 font-bold text-mint">{t.name.charAt(0)}</span>
              <span className="text-sm"><b className="block">{t.name}</b><span className="text-slate-400">{t.role}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
