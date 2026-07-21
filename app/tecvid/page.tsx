import type {Metadata} from "next";
import TecvidProgramClient from "./TecvidProgramClient";

export const metadata:Metadata={title:"10 Derslik Tecvid Programı | Kur'an Öğren",description:"Renkli örnekler, yavaş Arapça sesler ve bol pratikle temel tecvid kurallarını öğren."};
export default function Page(){return <TecvidProgramClient/>}
