import type { Metadata } from "next";
import PratikClient from "./PratikClient";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pratik Testleri: Harf, Tecvid ve Sure Bilgini Ölç",
  description: "Çoktan seçmeli sorularla harfleri, tecvid kurallarını ve namaz surelerinin anlamlarını test et.",
  path: "/pratik",
});

export default function Page() {
  return <PratikClient />;
}
