import type { Metadata } from "next";
import "./globals.css";
import "./child.css";

export const metadata: Metadata = { title: "Kur'an Öğren | Her gün bir adım", description: "Elifba, tecvid, dinleme ve ezber takibini bir araya getiren öğrenme alanı." };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
