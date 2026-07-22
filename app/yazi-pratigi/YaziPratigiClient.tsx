"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardActionArea, Chip, LinearProgress, Paper } from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import letters from "@/src/data/elifba.json";
import { KEYS, readArray } from "@/src/lib/progress";

export default function YaziPratigiClient() {
  const [completed, setCompleted] = useState<string[]>([]);
  useEffect(() => setCompleted(readArray<string>(KEYS.yazi)), []);
  const percent = Math.round((completed.length / letters.length) * 100);

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#163f3a]">
      <AcademyHeader title="Yazı Pratiği" />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <Paper elevation={0} className="!rounded-[2rem] !bg-emerald-800 !p-7 !text-white sm:!p-10">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-black tracking-[.18em] text-amber-200">YAZI PRATİĞİ</p>
              <h1 className="mt-3 max-w-2xl font-serif text-5xl font-bold leading-tight sm:text-6xl">Harfi gör, üzerinden geç, ezberle.</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-emerald-50">
                Bir harf seç, soluk rehber harfin üzerinden parmağınla veya fareyle geç. Şekli elinle tekrarlamak, harfi kalıcı olarak öğrenmenin en somut yoludur.
              </p>
            </div>
            <Paper elevation={0} className="!rounded-3xl !bg-white/10 !p-6 !text-white ring-1 ring-white/15">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-sm text-emerald-100">Tamamlanan</span>
                  <b className="mt-1 block text-4xl">
                    {completed.length}
                    <small className="text-lg font-medium text-emerald-200"> / {letters.length} harf</small>
                  </b>
                </div>
                <b className="text-2xl text-amber-200">%{percent}</b>
              </div>
              <LinearProgress
                variant="determinate"
                value={percent}
                sx={{ mt: 2.5, height: 11, borderRadius: 8, bgcolor: "rgba(255,255,255,.18)", "& .MuiLinearProgress-bar": { bgcolor: "#f5c87f", borderRadius: 8 } }}
              />
            </Paper>
          </div>
        </Paper>

        <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {letters.map((letter) => {
            const done = completed.includes(letter.id);
            return (
              <Card key={letter.id} elevation={0} className={`relative !rounded-3xl ring-1 transition hover:-translate-y-1 hover:shadow-lg ${done ? "!bg-emerald-50 ring-emerald-300" : "!bg-white ring-emerald-900/10"}`}>
                <CardActionArea component={Link} href={`/yazi-pratigi/${letter.id}`} className="!p-4 !text-center">
                  {done && <Chip size="small" icon={<CheckCircleRounded />} label="" className="!absolute !right-2 !top-2 !bg-emerald-600 !text-white" />}
                  <span dir="rtl" className="arabic-learning block text-5xl leading-none text-emerald-800">
                    {letter.arabic}
                  </span>
                  <b className="mt-2 block text-sm">{letter.name}</b>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
