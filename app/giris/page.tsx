"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell, Field, Msg, btn, linkCls } from "@/components/AuthShell";
import { supabase, hataMesaji } from "@/lib/supabase";

export default function Giris() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw });
    setBusy(false);
    if (error) return setErr(hataMesaji(error.message));
    router.push("/hesap/");
  }

  return (
    <AuthShell title="Giriş yap" sub="Mobil uygulamadaki e-posta ve şifrenizle girin.">
      <form onSubmit={submit} noValidate>
        {err && <Msg kind="err">{err}</Msg>}
        <Field id="email" label="E-posta" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Field id="pw" label="Şifre" type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} required />
        <button className={btn} disabled={busy}>{busy ? "Giriş yapılıyor…" : "Giriş yap"}</button>
      </form>
      <div className="mt-4 flex flex-wrap justify-between text-sm">
        <Link href="/sifre/" className={linkCls}>Şifremi unuttum</Link>
        <Link href="/kayit/" className={linkCls}>Hesap oluştur</Link>
      </div>
    </AuthShell>
  );
}
