import { CONTACT_EMAIL, NAV } from "@/lib/data";

// Bülten formu yalnızca NEXT_PUBLIC_NEWSLETTER_URL tanımlıysa gösterilir (kayıtların gideceği bir servis olmadan çalışmaz).
const NEWSLETTER_URL = process.env.NEXT_PUBLIC_NEWSLETTER_URL;

export default function Footer() {
  return (
    <footer id="iletisim" className="border-t border-white/10 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold">E-Tahsilat</p>
          <p className="mt-2 text-sm text-slate-400">Tahsilat, tediye, cari ve plasiyer takibi.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-flex min-h-12 items-center text-mint">{CONTACT_EMAIL}</a>
        </div>
        <nav aria-label="Hızlı linkler" className="text-sm">
          <p className="font-bold">Hızlı linkler</p>
          <ul className="mt-2">{NAV.map((n) => (<li key={n.href}><a href={n.href} className="inline-flex min-h-12 items-center text-slate-300 hover:text-mint">{n.label}</a></li>))}</ul>
        </nav>
        <div className="text-sm">
          <p className="font-bold">Yasal</p>
          <ul className="mt-2">
            {["KVKK Aydınlatma Metni", "Gizlilik Politikası", "Kullanım Şartları"].map((t) => (
              <li key={t}><a href="#" className="inline-flex min-h-12 items-center text-slate-300 hover:text-mint">{t}</a></li> /* TODO: gerçek metin sayfalarına bağlayın */
            ))}
          </ul>
          {NEWSLETTER_URL && (
            <form action={NEWSLETTER_URL} method="post" className="mt-3 flex gap-2">
              <label htmlFor="nl" className="sr-only">E-posta</label>
              <input id="nl" name="email" type="email" required placeholder="E-posta adresiniz" className="min-h-12 w-full rounded-lg border border-white/15 bg-white/5 px-3" />
              <button className="min-h-12 rounded-lg bg-mint px-4 font-bold text-obsidian">Abone ol</button>
            </form>
          )}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-slate-500">© {new Date().getFullYear()} E-Tahsilat. Tüm hakları saklıdır.</p>
    </footer>
  );
}
