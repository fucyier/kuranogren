import type { Metadata } from "next";
import YaziPratigiClient from "./YaziPratigiClient";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Yazı Pratiği: Arapça Harfleri Elle Yaz",
  description: "28 Arapça harfi soluk bir rehberin üzerinden parmağınla veya fareyle geçerek yazma pratiği yap.",
  path: "/yazi-pratigi",
});

export default function Page() {
  return <YaziPratigiClient />;
}
