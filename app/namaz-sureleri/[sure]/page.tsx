import {notFound} from "next/navigation";
import SureAyetleriClient from "./SureAyetleriClient";
import {findNamazSuresi,namazSureleri} from "@/src/data/namaz-sureleri";

export function generateStaticParams(){return namazSureleri.map(sure=>({sure:sure.slug}))}
export default async function Page({params}:{params:Promise<{sure:string}>}){const {sure:slug}=await params;const sure=findNamazSuresi(slug);if(!sure)notFound();return <SureAyetleriClient sure={sure}/>}
