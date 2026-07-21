import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ElifbaLessonScreen from "@/app/_components/ElifbaLessonScreen";
import { elifbaLessons, getElifbaLesson } from "@/src/data/elifba-lessons";

export function generateStaticParams() {
  return elifbaLessons.map((item)=>({lesson:item.slug}));
}

export async function generateMetadata({params}:{params:Promise<{lesson:string}>}):Promise<Metadata>{
  const {lesson:slug}=await params;const lesson=getElifbaLesson(slug);
  return lesson?{title:`${lesson.day}. Gün: ${lesson.title} | Kur'an Öğren`,description:lesson.summary}:{};
}

export default async function LessonPage({params}:{params:Promise<{lesson:string}>}) {
  const {lesson:slug}=await params;const lesson=getElifbaLesson(slug);
  if(!lesson)notFound();
  return <ElifbaLessonScreen lesson={lesson}/>;
}
