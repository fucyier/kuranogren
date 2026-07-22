import type {Metadata} from "next";
import {notFound} from "next/navigation";
import SureAyetleriClient from "./SureAyetleriClient";
import {findNamazSuresi,namazSureleri} from "@/src/data/namaz-sureleri";
import {createPageMetadata} from "@/src/lib/seo";

export function generateStaticParams(){return namazSureleri.map(sure=>({sure:sure.slug}))}
export async function generateMetadata({params}:{params:Promise<{sure:string}>}):Promise<Metadata>{const {sure:slug}=await params;const sure=findNamazSuresi(slug);return sure?createPageMetadata({title:`${sure.name}: Okunuşu, Anlamı ve Açıklaması`,description:`${sure.name} ayetlerini Arapça metin, Türkçe anlam, ayrıntılı açıklama ve sesli okuma ile ayet ayet öğrenin. ${sure.theme}.`,path:`/namaz-sureleri/${sure.slug}`}):{}}
export default async function Page({params}:{params:Promise<{sure:string}>}){const {sure:slug}=await params;const sure=findNamazSuresi(slug);if(!sure)notFound();return <SureAyetleriClient sure={sure}/>}
