import {notFound} from "next/navigation";
import AyetDetayClient from "./AyetDetayClient";
import {findNamazSuresi,namazSureleri} from "@/src/data/namaz-sureleri";

export function generateStaticParams(){return namazSureleri.flatMap(sure=>sure.ayahs.map(ayah=>({sure:sure.slug,ayet:String(ayah.number)})))}
export default async function Page({params}:{params:Promise<{sure:string;ayet:string}>}){const {sure:slug,ayet:number}=await params;const sure=findNamazSuresi(slug);const ayah=sure?.ayahs.find(item=>item.number===Number(number));if(!sure||!ayah)notFound();return <AyetDetayClient sure={sure} ayah={ayah}/>}
