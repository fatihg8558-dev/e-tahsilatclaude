"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell, Field, Msg, btn, linkCls } from "@/components/AuthShell";
import { supabase, hataMesaji, BASE } from "@/lib/supabase";

export default function Kayit() {
  const router = useRouter();
  const [f, setF] = useState({ ad_soyad: "", unvan: "", vergi_no: "", telefon: "", email: "", pw: "" });
  const [kvkk, setKvkk] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    if (f.ad_soyad.trim().length < 3) return setErr("Ad soyad girin.");
    if (f.unvan.trim().length < 2) return setErr("Firma ünvanını girin.");
    if (!/^\d{10,11}$/.test(f.vergi_no.trim())) return setErr("Vergi no (10 hane) veya TC kimlik no (11 hane) girin.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) return setErr("Geçerli bir e-posta girin.");
    if (f.pw.length < 8) return setErr("Şifre en az 8 karakter olmalı.");
    if (!kvkk) return setErr("Devam etmek için aydınlatma metnini kabul edin.");
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: f.email.trim(),
      password: f.pw,
      options: {
        data: { ad_soyad: f.ad_soyad.trim(), unvan: f.unvan.trim(), vergi_no: f.vergi_no.trim(), telefon: f.telefon.trim() },
        emailRedirectTo: `${window.location.origin}${BASE}/giris/`,
      },
    });
    setBusy(false);
    if (error) return setErr(hataMesaji(error.message));
    if (data.user && data.user.identities && data.user.identities.length === 0) return setErr(hataMesaji("already registered"));
    if (data.session) return router.push("/hesap/");
    setOk("Kaydınız alındı. E-posta adresinize bir doğrulama linki gönderdik; tıkladıktan sonra giriş yapabilirsiniz.");
  }

  return (
    <AuthShell title="Ücretsiz dene" sub="7 gün ücretsiz. Kredi kartı gerekmez.">
      {ok ? <Msg kind="ok">{ok}</Msg> : (
        <form onSubmit={submit} noValidate>
          {err && <Msg kind="err">{err}</Msg>}
          <Field id="ad" label="Ad soyad" autoComplete="name" value={f.ad_soyad} onChange={set("ad_soyad")} />
          <Field id="unvan" label="Firma ünvanı" autoComplete="organization" value={f.unvan} onChange={set("unvan")} />
          <Field id="vergi" label="Vergi no / TC kimlik no" inputMode="numeric" maxLength={11} value={f.vergi_no} onChange={set("vergi_no")} />
          <Field id="tel" label="Telefon" type="tel" autoComplete="tel" value={f.telefon} onChange={set("telefon")} />
          <Field id="email" label="E-posta" type="email" autoComplete="email" value={f.email} onChange={set("email")} />
          <Field id="pw" label="Şifre (en az 8 karakter)" type="password" autoComplete="new-password" value={f.pw} onChange={set("pw")} />
          <label className="mb-2 flex items-start gap-3 text-sm text-slate-300">
            <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#2dd4bf]" />
            KVKK aydınlatma metnini okudum, kabul ediyorum.
          </label>
          <button className={btn} disabled={busy}>{busy ? "Kaydediliyor…" : "Hesap oluştur"}</button>
        </form>
      )}
      <p className="mt-4 text-sm text-slate-400">Zaten hesabınız var mı? <Link href="/giris/" className="text-mint hover:underline">Giriş yapın</Link></p>
    </AuthShell>
  );
}
