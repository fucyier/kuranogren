"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Paper } from "@mui/material";
import LocalFireDepartmentRounded from "@mui/icons-material/LocalFireDepartmentRounded";
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import { computeBadges, computeStreak, studiedToday, type Badge } from "@/src/lib/progress";

export default function BasarilarClient() {
  const [streak, setStreak] = useState(0);
  const [today, setToday] = useState(false);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    setStreak(computeStreak());
    setToday(studiedToday());
    setBadges(computeBadges());
  }, []);

  const earnedCount = badges.filter((badge) => badge.earned).length;

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#163f3a]">
      <AcademyHeader title="Başarılarım" />
      <section className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:px-8 sm:py-12">
        <Paper elevation={0} className="overflow-hidden !rounded-[2rem] !bg-[#174f47] !p-7 !text-white sm:!p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-black tracking-[.18em] text-amber-200">GÜNLÜK SERİN</p>
              <h1 className="mt-3 font-serif text-5xl font-bold leading-tight sm:text-6xl">
                {streak > 0 ? `${streak} gün üst üste` : "Bugün başla"}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-emerald-50">
                {today
                  ? "Bugün bir ders veya ayet tamamladın. Yarın da devam ederek serini büyüt."
                  : "Bugün henüz bir ders veya ayet tamamlamadın. Serini korumak için kısa bir çalışma yeterli."}
              </p>
            </div>
            <div className="grid h-40 w-40 place-items-center justify-self-center rounded-full bg-white/10 ring-1 ring-white/20">
              <div className="text-center">
                <LocalFireDepartmentRounded sx={{ fontSize: 48, color: "#f6cf88" }} />
                <b className="mt-1 block text-4xl">{streak}</b>
                <small className="text-emerald-100">gün</small>
              </div>
            </div>
          </div>
        </Paper>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-black tracking-[.16em] text-orange-700">ROZETLER</p>
              <h2 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">Kazandıkların</h2>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-emerald-800 ring-1 ring-emerald-900/10">
              {earnedCount} / {badges.length} rozet
            </span>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((badge) => (
              <Card
                key={badge.id}
                elevation={0}
                className={`!rounded-3xl !p-5 ring-1 ${badge.earned ? "!bg-amber-50 ring-amber-300" : "!bg-white ring-emerald-900/10"}`}
              >
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${badge.earned ? "bg-amber-400 text-white" : "bg-stone-100 text-stone-400"}`}>
                  {badge.earned ? <EmojiEventsRounded /> : <LockRounded />}
                </div>
                <b className="mt-4 block text-lg leading-6">{badge.title}</b>
                <p className="mt-2 text-sm leading-6 text-emerald-900/60">{badge.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 rounded-3xl bg-white p-5 ring-1 ring-emerald-900/10">
          <Link href="/tekrar" className="rounded-2xl bg-emerald-50 px-5 py-3 text-sm font-extrabold text-emerald-800 transition hover:bg-emerald-100">
            Tekrar zamanına git →
          </Link>
          <Link href="/pratik" className="rounded-2xl bg-orange-50 px-5 py-3 text-sm font-extrabold text-orange-800 transition hover:bg-orange-100">
            Test çözerek pekiştir →
          </Link>
        </div>
      </section>
    </main>
  );
}
