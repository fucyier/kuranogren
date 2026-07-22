import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ElifbaLessonScreen from "@/app/_components/ElifbaLessonScreen";
import { elifbaLessons, getElifbaLesson } from "@/src/data/elifba-lessons";
import { createPageMetadata } from "@/src/lib/seo";

export function generateStaticParams() {
  return elifbaLessons.map((item)=>({lesson:item.slug}));
}

export async function generateMetadata({params}:{params:Promise<{lesson:string}>}):Promise<Metadata>{
  const {lesson:slug}=await params;const lesson=getElifbaLesson(slug);
  return lesson?createPageMetadata({title:`${lesson.day}. Gün: ${lesson.title}`,description:`${lesson.summary} Sesli örnekleri dinleyin, ayrıntılı anlatımı okuyun ve pratiklerle öğrendiklerinizi pekiştirin.`,path:`/${lesson.slug}`}):{};
}

export default async function LessonPage({params}:{params:Promise<{lesson:string}>}) {
  const {lesson:slug}=await params;const lesson=getElifbaLesson(slug);
  if(!lesson)notFound();
  return <ElifbaLessonScreen lesson={lesson}/>;
}
