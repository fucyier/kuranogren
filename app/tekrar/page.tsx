import type { Metadata } from "next";
import TekrarClient from "./TekrarClient";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Tekrar Zamanı: Aralıklı Tekrarla Unutma",
  description: "Tamamladığın harf, ders ve ayetleri aralıklı tekrar yöntemiyle zamanında hatırla.",
  path: "/tekrar",
});

export default function Page() {
  return <TekrarClient />;
}
