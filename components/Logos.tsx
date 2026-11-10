// Yalnızca gerçek referanslarınız olduğunda lib/data.ts içinde SHOW_LOGOS = true yapın.
export default function Logos() {
  const names = ["Firma 1", "Firma 2", "Firma 3", "Firma 4", "Firma 5"]; // TODO: gerçek firma adları / logolar
  return (
    <section className="border-y border-white/10 py-10">
      <p className="text-center text-sm text-slate-400">Bizi tercih eden firmalar</p>
      <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 text-lg font-bold text-slate-500">
        {names.map((n) => (<li key={n}>{n}</li>))}
      </ul>
    </section>
  );
}
