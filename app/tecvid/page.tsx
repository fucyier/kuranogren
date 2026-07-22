import type {Metadata} from "next";
import TecvidProgramClient from "./TecvidProgramClient";
import {createPageMetadata} from "@/src/lib/seo";

export const metadata:Metadata=createPageMetadata({title:"10 Derslik Tecvid Programı",description:"Med, izhar, idgam, ihfa, iklab ve kalkale gibi temel tecvid kurallarını renkli örnekler ve yavaş Arapça seslerle öğrenin.",path:"/tecvid"});
export default function Page(){return <TecvidProgramClient/>}
