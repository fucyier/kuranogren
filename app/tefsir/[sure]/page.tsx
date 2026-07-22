import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SureTefsiriClient from "./SureTefsiriClient";
import { findNamazSuresi, namazSureleri } from "@/src/data/namaz-sureleri";
import { findTefsirNote } from "@/src/data/tefsir-notes";
import { createPageMetadata } from "@/src/lib/seo";

export function generateStaticParams() {
  return namazSureleri.map((sure) => ({ sure: sure.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sure: string }> }): Promise<Metadata> {
  const { sure: slug } = await params;
  const sure = findNamazSuresi(slug);
  return sure
    ? createPageMetadata({
        title: `${sure.name} Tefsiri: İniş Sebebi ve Ayet Ayet Anlamı`,
        description: `${sure.name} sûresinin iniş sebebini, ayet ayet anlam katmanlarını ve günlük hayattan bağlantısını okuyun.`,
        path: `/tefsir/${sure.slug}`,
      })
    : {};
}

export default async function Page({ params }: { params: Promise<{ sure: string }> }) {
  const { sure: slug } = await params;
  const sure = findNamazSuresi(slug);
  if (!sure) notFound();
  const note = findTefsirNote(slug);
  return <SureTefsiriClient sure={sure} note={note} />;
}
