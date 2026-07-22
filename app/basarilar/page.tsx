import type { Metadata } from "next";
import BasarilarClient from "./BasarilarClient";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Başarılarım: Günlük Seri ve Rozetler",
  description: "Kaç gün üst üste çalıştığını ve kazandığın rozetleri gör; motivasyonunu yüksek tut.",
  path: "/basarilar",
});

export default function Page() {
  return <BasarilarClient />;
}
