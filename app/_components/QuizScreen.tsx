"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, LinearProgress, Paper } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ReplayRounded from "@mui/icons-material/ReplayRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import { getQuizTopic, type QuizQuestion } from "@/src/data/quiz-bank";
import { reviewResult, saveQuizResult, scheduleReview } from "@/src/lib/progress";

export default function QuizScreen({ topicSlug }: { topicSlug: string }) {
  const topic = getQuizTopic(topicSlug);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (topic) setQuestions(topic.build());
  }, [topic]);

  if (!topic) return null;

  const current = questions[index];
  const progress = questions.length ? Math.round((index / questions.length) * 100) : 0;

  function playAudio() {
    const player = audioRef.current;
    if (!player || !current?.audioSrc) return;
    player.src = current.audioSrc;
    player.play().catch(() => {});
  }

  function choose(optionIndex: number) {
    if (selected !== null || !current) return;
    setSelected(optionIndex);
    const correct = optionIndex === current.answerIndex;
    if (correct) setScore((s) => s + 1);
    if (current.srsId) {
      const kind = current.srsId.startsWith("harf-")
        ? "harf"
        : current.srsId.startsWith("tecvid-")
        ? "tecvid"
        : current.srsId.startsWith("namaz-")
        ? "namaz"
        : "elifba";
      scheduleReview(current.srsId, kind, current.srsLabel || current.arabic, current.srsHref);
      reviewResult(current.srsId, correct);
    }
  }

  function next() {
    if (index + 1 >= questions.length) {
      saveQuizResult({ konu: topic!.slug, date: new Date().toISOString().slice(0, 10), score, total: questions.length });
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function restart() {
    setQuestions(topic!.build());
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <main className="min-h-screen text-[#183f3a]" style={{ background: "#f7f3ec" }}>
      <audio ref={audioRef} preload="none" />
      <AcademyHeader title={topic.title} />
      <section className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <Link href="/pratik" className="inline-flex items-center gap-2 font-extrabold" style={{ color: topic.color }}>
          <ArrowBackRounded /> Test kategorileri
        </Link>

        {!finished && current && (
          <Paper elevation={0} className="mt-6 !rounded-[2rem] !p-7 ring-1 ring-blue-950/10 sm:!p-9">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-black" style={{ color: topic.color }}>
                Soru {index + 1} / {questions.length}
              </span>
              <span className="text-sm font-bold text-blue-950/50">Doğru: {score}</span>
            </div>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mt: 2, height: 8, borderRadius: 5, bgcolor: "#e7e2da", "& .MuiLinearProgress-bar": { bgcolor: topic.color } }}
            />

            <div className="mt-8 rounded-3xl bg-[#fbfaf7] p-6 text-center ring-1 ring-blue-950/5 sm:p-10">
              <p dir="rtl" className="arabic-learning text-6xl leading-none text-[#173f3a] sm:text-7xl">
                {current.arabic}
              </p>
              {current.audioSrc && (
                <Button onClick={playAudio} startIcon={<VolumeUpRounded />} sx={{ mt: 3, color: topic.color, fontWeight: 800 }}>
                  Sesi dinle
                </Button>
              )}
            </div>
            <p className="mt-6 text-center text-lg font-bold leading-7">{current.prompt}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {current.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === current.answerIndex;
                const isSelected = optionIndex === selected;
                const showState = selected !== null;
                return (
                  <button
                    key={option}
                    onClick={() => choose(optionIndex)}
                    disabled={selected !== null}
                    className={`rounded-2xl border-2 px-5 py-4 text-left text-sm font-bold leading-6 transition ${
                      showState && isCorrect
                        ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                        : showState && isSelected
                        ? "border-red-300 bg-red-50 text-red-800"
                        : "border-blue-950/10 bg-white hover:border-blue-950/25"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="mt-7 flex justify-end">
                <Button onClick={next} variant="contained" sx={{ borderRadius: 3, bgcolor: topic.color, fontWeight: 800, px: 3, py: 1.2 }}>
                  {index + 1 >= questions.length ? "Sonucu gör" : "Sonraki soru"}
                </Button>
              </div>
            )}
          </Paper>
        )}

        {finished && (
          <Paper elevation={0} className="mt-6 !rounded-[2rem] !p-9 text-center ring-1 ring-blue-950/10">
            <CheckCircleRounded sx={{ fontSize: 56, color: topic.color }} />
            <h1 className="mt-4 font-serif text-4xl font-bold">
              {score} / {questions.length} doğru
            </h1>
            <p className="mt-3 text-base leading-7 text-blue-950/60">
              {score === questions.length
                ? "Harika! Bu konuda tam puan aldın."
                : "Yanlış cevapladığın sorular Tekrar Zamanı listene eklendi; birkaç gün içinde tekrar karşına çıkacak."}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button onClick={restart} startIcon={<ReplayRounded />} variant="outlined" sx={{ borderRadius: 3, borderColor: topic.color, color: topic.color, fontWeight: 800 }}>
                Yeniden dene
              </Button>
              <Button component={Link} href="/tekrar" variant="contained" sx={{ borderRadius: 3, bgcolor: topic.color, fontWeight: 800 }}>
                Tekrar Zamanına git
              </Button>
            </div>
          </Paper>
        )}
      </section>
    </main>
  );
}
