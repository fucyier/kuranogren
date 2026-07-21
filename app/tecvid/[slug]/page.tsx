import {notFound} from "next/navigation";
import TecvidLessonScreen from "@/app/_components/TecvidLessonScreen";
import {getTecvidLesson,tecvidLessons} from "@/src/data/tecvid-lessons";

export function generateStaticParams(){return tecvidLessons.map(lesson=>({slug:lesson.slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const lesson=getTecvidLesson(slug);if(!lesson)notFound();return <TecvidLessonScreen lesson={lesson}/>}
