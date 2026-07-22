import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LetterYaziClient from "./LetterYaziClient";
import letters from "@/src/data/elifba.json";
import { createPageMetadata } from "@/src/lib/seo";

export function generateStaticParams() {
  return letters.map((letter) => ({ harf: letter.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ harf: string }> }): Promise<Metadata> {
  const { harf } = await params;
  const letter = letters.find((item) => item.id === harf);
  return letter
    ? createPageMetadata({
        title: `${letter.name} Harfini Yaz`,
        description: `${letter.name} harfini rehber üzerinden geçerek yazma pratiği yap ve doğru telaffuzunu dinle.`,
        path: `/yazi-pratigi/${letter.id}`,
      })
    : {};
}

export default async function Page({ params }: { params: Promise<{ harf: string }> }) {
  const { harf } = await params;
  const letter = letters.find((item) => item.id === harf);
  if (!letter) notFound();
  return <LetterYaziClient letter={letter} />;
}
