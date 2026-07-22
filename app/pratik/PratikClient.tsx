"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardActionArea, Chip, Paper } from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import { quizTopics } from "@/src/data/quiz-bank";
import { KEYS, readArray, type QuizResult } from "@/src/lib/progress";

export default function PratikClient() {
  const [results, setResults] = useState<QuizResult[]>([]);
  useEffect(() => setResults(readArray<QuizResult>(KEYS.quiz)), []);

  function bestScore(slug: string) {
    const relevant = results.filter((r) => r.konu === slug && r.total > 0);
    if (!relevant.length) return null;
    return relevant.reduce((best, r) => (r.score / r.total > best.score / best.total ? r : best));
  }

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#163f3a]">
      <AcademyHeader title="Pratik Testleri" />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
        <Paper elevation={0} className="!rounded-[2rem] !bg-[#174f47] !p-7 !text-white sm:!p-10">
          <p className="text-sm font-black tracking-[.18em] text-amber-200">AKTİF TEST VE PEKİŞTİRME</p>
          <h1 className="mt-3 max-w-2xl font-serif text-5xl font-bold leading-tight sm:text-6xl">Bildiğini test et.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
            Her testte rastgele sorularla bilgini ölç. Yanlış cevapladığın sorular otomatik olarak Tekrar Zamanı listene eklenir.
          </p>
        </Paper>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quizTopics.map((topic) => {
            const best = bestScore(topic.slug);
            return (
              <Card key={topic.slug} elevation={0} className="!rounded-3xl ring-1 ring-emerald-900/10 transition hover:-translate-y-1 hover:shadow-xl">
                <CardActionArea component={Link} href={`/pratik/${topic.slug}`} className="!min-h-56 !p-6">
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ backgroundColor: topic.color }}>
                        <QuizRounded />
                      </span>
                      {best && (
                        <Chip
                          size="small"
                          label={`En iyi: ${best.score}/${best.total}`}
                          sx={{ bgcolor: `${topic.color}18`, color: topic.color, fontWeight: 800 }}
                        />
                      )}
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-bold leading-tight">{topic.shortTitle}</h3>
                    <p className="mt-3 text-sm leading-6 text-emerald-900/60">{topic.description}</p>
                    <span className="mt-auto flex items-center gap-1 pt-6 text-sm font-extrabold" style={{ color: topic.color }}>
                      Teste başla <ArrowForwardRounded fontSize="small" />
                    </span>
                  </div>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
