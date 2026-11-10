import { ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/data";

export default function Faq() {
  return (
    <section id="sss" className="mx-auto max-w-3xl px-5 py-20">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Sıkça sorulan sorular</h2>
      <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {FAQ.map((f) => (
          <details key={f.q} className="group py-1">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}<ChevronDown size={20} className="shrink-0 text-mint transition group-open:rotate-180" aria-hidden />
            </summary>
            <p className="pb-4 text-slate-300">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
