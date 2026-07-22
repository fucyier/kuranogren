import type { Metadata } from "next";
import TefsirClient from "./TefsirClient";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Tefsir: Namaz Surelerinin İniş Sebebi ve Anlamı",
  description: "Namaz surelerinin iniş sebebini, ayet ayet anlam katmanlarını ve günlük hayattan bağlantısını oku.",
  path: "/tefsir",
});

export default function Page() {
  return <TefsirClient />;
}
