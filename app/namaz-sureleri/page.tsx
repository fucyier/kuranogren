import type {Metadata} from "next";
import NamazSureleriClient from "./NamazSureleriClient";
import {createPageMetadata} from "@/src/lib/seo";

export const metadata:Metadata=createPageMetadata({title:"Namaz Sureleri ve Anlamları",description:"Fâtiha'dan Nâs suresine kadar namaz surelerini Arapça metin, ayet ayet anlam, açıklama ve yerel ses kayıtlarıyla öğrenin.",path:"/namaz-sureleri"});
export default function Page(){return <NamazSureleriClient/>}
