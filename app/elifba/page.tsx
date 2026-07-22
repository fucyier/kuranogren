import type { Metadata } from "next";
import ElifbaProgramClient from "./ElifbaProgramClient";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "30 Günlük Elifba Programı",
  description: "Arapça harfleri, harekeleri, mahreçleri ve temel okuma kurallarını sesli örnekler ve bol pratikle 30 günde öğrenin.",
  path: "/elifba",
});

export default function ElifbaIndexPage() {
  return <ElifbaProgramClient />;
}
