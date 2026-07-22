import type {Metadata} from "next";
import {notFound} from "next/navigation";
import AyetDetayClient from "./AyetDetayClient";
import {findNamazSuresi,namazSureleri} from "@/src/data/namaz-sureleri";
import {createPageMetadata} from "@/src/lib/seo";

export function generateStaticParams(){return namazSureleri.flatMap(sure=>sure.ayahs.map(ayah=>({sure:sure.slug,ayet:String(ayah.number)})))}
export async function generateMetadata({params}:{params:Promise<{sure:string;ayet:string}>}):Promise<Metadata>{const {sure:slug,ayet:number}=await params;const sure=findNamazSuresi(slug);const ayah=sure?.ayahs.find(item=>item.number===Number(number));return sure&&ayah?createPageMetadata({title:`${sure.name} ${ayah.number}. Ayet: Anlamı ve Tefsiri`,description:`${sure.name} ${ayah.number}. ayetin Türkçe anlamı: ${ayah.shortMeaning} Ayetin açıklamasını okuyun ve Arapça sesini dinleyin.`,path:`/namaz-sureleri/${sure.slug}/${ayah.number}`}):{}}
export default async function Page({params}:{params:Promise<{sure:string;ayet:string}>}){const {sure:slug,ayet:number}=await params;const sure=findNamazSuresi(slug);const ayah=sure?.ayahs.find(item=>item.number===Number(number));if(!sure||!ayah)notFound();return <AyetDetayClient sure={sure} ayah={ayah}/>}
