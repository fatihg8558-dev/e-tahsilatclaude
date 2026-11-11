import Link from "next/link";
import { Wallet } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

export function AuthShell({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <main className="relative min-h-screen px-5 py-10">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(45,212,191,.16),transparent)]" />
      <div className="relative mx-auto max-w-md">
        <Link href="/" className="mb-8 inline-flex min-h-12 items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-mint text-obsidian"><Wallet size={18} aria-hidden /></span>
          E-Tahsilat
        </Link>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
          <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
          {sub && <p className="mt-1 text-slate-300">{sub}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  );
}

export function Field({ label, id, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-200">{label}</label>
      <input id={id} {...rest} className="min-h-12 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-slate-100 placeholder:text-slate-500 focus:border-mint focus:outline-none" />
    </div>
  );
}

export function Msg({ kind, children }: { kind: "err" | "ok"; children: ReactNode }) {
  return (
    <p role={kind === "err" ? "alert" : "status"} className={`mb-4 rounded-lg border px-3 py-2 text-sm ${kind === "err" ? "border-red-400/40 bg-red-400/10 text-red-300" : "border-mint/40 bg-mint/10 text-mint"}`}>
      {children}
    </p>
  );
}

export const btn =
  "mt-2 flex min-h-12 w-full items-center justify-center rounded-xl bg-mint font-bold text-obsidian shadow-[0_8px_28px_-6px_rgba(45,212,191,.6)] transition hover:brightness-110 disabled:opacity-60";
export const linkCls = "inline-flex min-h-12 items-center text-mint hover:underline";
