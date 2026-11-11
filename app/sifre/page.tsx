"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AuthShell, Field, Msg, btn, linkCls } from "@/components/AuthShell";
import { supabase, hataMesaji, BASE } from "@/lib/supabase";

export default function SifreUnuttum() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}${BASE}/sifre-yenile/`,
    });
    setBusy(false);
    if (error) return setErr(hataMesaji(error.message));
    setOk("Bu e-posta ile bir hesap varsa, şifre yenileme linki gönderildi.");
  }

  return (
    <AuthShell title="Şifremi unuttum" sub="E-posta adresinize yenileme linki göndereceğiz.">
      {ok && <Msg kind="ok">{ok}</Msg>}
      {err && <Msg kind="err">{err}</Msg>}
      <form onSubmit={submit} noValidate>
        <Field id="email" label="E-posta" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className={btn} disabled={busy}>{busy ? "Gönderiliyor…" : "Link gönder"}</button>
      </form>
      <Link href="/giris/" className={`mt-3 ${linkCls}`}>Girişe dön</Link>
    </AuthShell>
  );
}
