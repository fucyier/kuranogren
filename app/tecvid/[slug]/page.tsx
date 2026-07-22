import type {Metadata} from "next";
import {notFound} from "next/navigation";
import TecvidLessonScreen from "@/app/_components/TecvidLessonScreen";
import {getTecvidLesson,tecvidLessons} from "@/src/data/tecvid-lessons";
import {createPageMetadata} from "@/src/lib/seo";

export function generateStaticParams(){return tecvidLessons.map(lesson=>({slug:lesson.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const lesson=getTecvidLesson(slug);return lesson?createPageMetadata({title:`Tecvid ${lesson.day}. Ders: ${lesson.title}`,description:`${lesson.summary} Renkli Arapça örnekler, ayrıntılı teori ve yavaş sesli pratiklerle çalışın.`,path:`/tecvid/${lesson.slug}`}):{}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const lesson=getTecvidLesson(slug);if(!lesson)notFound();return <TecvidLessonScreen lesson={lesson}/>}
