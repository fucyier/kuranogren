import type { Metadata } from "next";
import MahrecHaritasiClient from "./MahrecHaritasiClient";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Mahreç Haritası: Harfler Ağızda Nereden Çıkar?",
  description: "Boğaz, dil ve dudak bölgelerini interaktif bir şema üzerinde keşfet; her bölgeden çıkan harfleri dinle.",
  path: "/mahrec-haritasi",
});

export default function Page() {
  return <MahrecHaritasiClient />;
}
