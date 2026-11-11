"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, Msg, btn } from "@/components/AuthShell";
import { supabase } from "@/lib/supabase";
import { CONTACT_EMAIL, IBAN, IBAN_SAHIBI } from "@/lib/data";

type Firma = { unvan: string; deneme_bitis: string | null; paket_bitis: string | null; sinirsiz: boolean | null };
type Paket = { id: string; ad: string; sure_gun: number; fiyat: number; ek_plasiyer_ucreti: number | null };

const tarih = (d: string) => new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
const para = (n: number) => n.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

function durum(f: Firma): { t: string; ok: boolean } {
  const now = Date.now();
  const gun = (d: string) => Math.ceil((new Date(d).getTime() - now) / 86400000);
  if (f.sinirsiz) return { t: "Sınırsız kullanım", ok: true };
  if (f.paket_bitis && new Date(f.paket_bitis).getTime() > now) return { t: `Paket aktif · ${tarih(f.paket_bitis)} tarihine kadar (${gun(f.paket_bitis)} gün)`, ok: true };
  if (f.deneme_bitis && new Date(f.deneme_bitis).getTime() > now) return { t: `Deneme sürümü · ${gun(f.deneme_bitis)} gün kaldı`, ok: true };
  if (f.deneme_bitis || f.paket_bitis) return { t: "Süreniz doldu", ok: false };
  return { t: "Deneme bilgisi bulunamadı", ok: false };
}

export default function Hesap() {
  const router = useRouter();
  const [ad, setAd] = useState("");
  const [firma, setFirma] = useState<Firma | null>(null);
  const [paketler, setPaketler] = useState<Paket[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) { router.replace("/giris/"); return; }
      const { data: prof } = await supabase.from("profiles").select("ad_soyad,firma_id").eq("id", s.session.user.id).single();
      if (!prof) { setErr("Profil bilgisi okunamadı."); setLoading(false); return; }
      setAd(prof.ad_soyad ?? "");
      const { data: f } = await supabase.from("firmalar").select("unvan,deneme_bitis,paket_bitis,sinirsiz").eq("id", prof.firma_id).single();
      setFirma(f as Firma | null);
      const { data: p } = await supabase.from("paketler").select("id,ad,sure_gun,fiyat,ek_plasiyer_ucreti").eq("aktif", true).order("fiyat");
      setPaketler((p ?? []) as Paket[]);
      setLoading(false);
    })();
  }, [router]);

  async function cikis() { await supabase.auth.signOut(); router.push("/"); }
  const d = firma ? durum(firma) : null;

  return (
    <AuthShell title={loading ? "Yükleniyor…" : `Merhaba${ad ? ", " + ad : ""}`} sub={firma?.unvan}>
      {err && <Msg kind="err">{err}</Msg>}
      {d && (
        <div className={`mb-6 rounded-xl border p-4 ${d.ok ? "border-mint/40 bg-mint/10" : "border-ember/50 bg-ember/10"}`}>
          <p className="text-sm text-slate-300">Abonelik durumu</p>
          <p className={`font-bold ${d.ok ? "text-mint" : "text-ember"}`}>{d.t}</p>
        </div>
      )}
      {paketler.length > 0 && (
        <>
          <h2 className="font-bold">Paketler</h2>
          <ul className="mt-2 divide-y divide-white/10 text-sm">
            {paketler.map((p) => (
              <li key={p.id} className="py-3">
                <b>{p.ad}</b> · {p.sure_gun} gün · {para(p.fiyat)}
                {p.ek_plasiyer_ucreti ? <span className="block text-slate-400">Ek plasiyer: {para(p.ek_plasiyer_ucreti)}</span> : null}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-white/10 p-4 text-sm text-slate-300">
            <p>Ödemeyi IBAN/havale ile yapın, dekontu uygulamadan yükleyin. Onaylanınca süreniz uzatılır.</p>
            {IBAN ? <p className="mt-2 font-semibold text-slate-100">{IBAN_SAHIBI}<br />{IBAN}</p> : <p className="mt-2">Ödeme bilgisi için: <a className="text-mint" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>}
          </div>
        </>
      )}
      <p className="mt-4 text-sm text-slate-400">Aynı e-posta ve şifreyle mobil uygulamaya da giriş yapabilirsiniz.</p>
      <button onClick={cikis} className={`${btn} bg-transparent !text-slate-100 border border-white/15 shadow-none`}>Çıkış yap</button>
    </AuthShell>
  );
}
