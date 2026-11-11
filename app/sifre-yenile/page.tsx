"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, Field, Msg, btn } from "@/components/AuthShell";
import { supabase, hataMesaji } from "@/lib/supabase";

export default function SifreYenile() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setReady(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((ev, s) => {
      if (ev === "PASSWORD_RECOVERY" || s) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    if (pw.length < 8) return setErr("Şifre en az 8 karakter olmalı.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) return setErr(hataMesaji(error.message));
    router.push("/hesap/");
  }

  return (
    <AuthShell title="Yeni şifre belirle">
      {!ready ? (
        <Msg kind="err">Bu sayfa yalnızca e-postadaki yenileme linkiyle açılır. Linke tekrar tıklayın veya yeni link isteyin.</Msg>
      ) : (
        <form onSubmit={submit} noValidate>
          {err && <Msg kind="err">{err}</Msg>}
          <Field id="pw" label="Yeni şifre (en az 8 karakter)" type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
          <button className={btn} disabled={busy}>{busy ? "Kaydediliyor…" : "Şifreyi kaydet"}</button>
        </form>
      )}
    </AuthShell>
  );
}
