import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizScreen from "@/app/_components/QuizScreen";
import { getQuizTopic, quizTopics } from "@/src/data/quiz-bank";
import { createPageMetadata } from "@/src/lib/seo";

export function generateStaticParams() {
  return quizTopics.map((topic) => ({ konu: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ konu: string }> }): Promise<Metadata> {
  const { konu } = await params;
  const topic = getQuizTopic(konu);
  return topic ? createPageMetadata({ title: topic.title, description: topic.description, path: `/pratik/${topic.slug}` }) : {};
}

export default async function Page({ params }: { params: Promise<{ konu: string }> }) {
  const { konu } = await params;
  const topic = getQuizTopic(konu);
  if (!topic) notFound();
  return <QuizScreen topicSlug={topic.slug} />;
}
