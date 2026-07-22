import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kur'an Öğrenme Sitesi",
  description: "30 günlük Elifba programı, 10 derslik Tecvid eğitimi ve ayet ayet Namaz Sureleri ile Kur'an-ı Kerim okumayı ücretsiz ve adım adım öğrenin.",
  path: "/",
});

export default function HomePage() {
  return <HomeClient />;
}
