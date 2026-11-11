import { createClient } from "@supabase/supabase-js";

// Publishable anahtar tarayıcıda görünmek üzere tasarlanmıştır. Gizli (secret/service_role) anahtarı ASLA buraya koymayın.
export const supabase = createClient(
  "https://joxnbnclogasumkfzyqt.supabase.co",
  "sb_publishable_PzJOpsBlvVm9MoxTx_PFkw_X66otRCQ"
);

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function hataMesaji(m: string): string {
  const s = m.toLowerCase();
  if (s.includes("invalid login")) return "E-posta veya şifre hatalı.";
  if (s.includes("not confirmed")) return "E-posta adresiniz henüz doğrulanmamış. Gelen kutunuzdaki doğrulama linkine tıklayın.";
  if (s.includes("already registered")) return "Bu e-posta ile zaten bir hesap var. Giriş yapmayı deneyin.";
  if (s.includes("rate limit")) return "Çok fazla deneme yapıldı. Biraz bekleyip tekrar deneyin.";
  if (s.includes("database error")) return "Kayıt oluşturulamadı. Bilgileri kontrol edip tekrar deneyin (vergi/TC no daha önce kayıtlı olabilir).";
  if (s.includes("password")) return "Şifre kurallara uymuyor. En az 8 karakter kullanın.";
  return "Bir hata oluştu. Lütfen tekrar deneyin.";
}
