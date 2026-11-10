import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";

const font = Manrope({ subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  title: "E-Tahsilat | Tahsilat, tediye, cari ve plasiyer takibi",
  description:
    "Tahsilat ve tediye makbuzu, çek/senet kaydı, plasiyer yönetimi, mutabakat ve cari ekstre. 7 gün ücretsiz deneyin.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className={font.className}>{children}</body>
    </html>
  );
}
