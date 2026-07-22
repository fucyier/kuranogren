"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Chip, Paper } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import LetterTraceCanvas from "@/app/_components/LetterTraceCanvas";
import letters from "@/src/data/elifba.json";
import { KEYS, logActivity, readArray, writeArray } from "@/src/lib/progress";

type Letter = (typeof letters)[number];

export default function LetterYaziClient({ letter }: { letter: Letter }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const index = letters.findIndex((item) => item.id === letter.id);
  const previous = letters[index - 1];
  const next = letters[index + 1];
  const done = completed.includes(letter.id);

  useEffect(() => setCompleted(readArray<string>(KEYS.yazi)), []);

  function playAudio() {
    const player = audioRef.current;
    if (!player) return;
    player.src = letter.audio;
    player.play().catch(() => {});
  }

  function markDone() {
    const updated = completed.includes(letter.id) ? completed : [...completed, letter.id];
    setCompleted(updated);
    writeArray(KEYS.yazi, updated);
    logActivity();
  }

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#163f3a]">
      <audio ref={audioRef} preload="none" />
      <AcademyHeader title="Yazı Pratiği" />
      <section className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <Link href="/yazi-pratigi" className="inline-flex items-center gap-2 font-extrabold text-emerald-800">
          <ArrowBackRounded /> Harf listesi
        </Link>

        <Paper elevation={0} className="mt-5 !rounded-[2rem] !bg-emerald-800 !p-7 !text-white sm:!p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Chip label={`HARF ${String(index + 1).padStart(2, "0")} / ${letters.length}`} className="!bg-amber-200 !font-extrabold !text-emerald-950" />
            {done && <Chip icon={<CheckCircleRounded />} label="Tamamlandı" className="!bg-white/15 !font-bold !text-white" />}
          </div>
          <h1 className="mt-5 font-serif text-5xl font-bold sm:text-6xl">{letter.name} harfini yaz</h1>
          <Button onClick={playAudio} startIcon={<VolumeUpRounded />} sx={{ mt: 3, color: "#fff", bgcolor: "rgba(255,255,255,.12)", borderRadius: 3, px: 2.5, py: 1, fontWeight: 800 }}>
            Telaffuzu dinle
          </Button>
        </Paper>

        <div className="mt-7">
          <LetterTraceCanvas letter={letter} />
        </div>

        <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-emerald-900/10 sm:flex-row">
          <div className="flex gap-2">
            <Button component={Link} href="/" startIcon={<HomeRounded />} sx={{ color: "#174f47", fontWeight: 700 }}>
              Ana sayfa
            </Button>
            {previous && (
              <Button component={Link} href={`/yazi-pratigi/${previous.id}`} startIcon={<ArrowBackRounded />} sx={{ color: "#174f47", fontWeight: 700 }}>
                Önceki harf
              </Button>
            )}
          </div>
          <Button
            onClick={markDone}
            variant="contained"
            endIcon={done ? <CheckCircleRounded /> : <ArrowForwardRounded />}
            sx={{ borderRadius: 3, bgcolor: "#174f47", px: 3, py: 1.4, fontWeight: 800, "&:hover": { bgcolor: "#0f3f38" } }}
          >
            {done ? "Harf tamamlandı" : "Tamamlandı olarak işaretle"}
          </Button>
          {next && (
            <Button component={Link} href={`/yazi-pratigi/${next.id}`} endIcon={<ArrowForwardRounded />} sx={{ color: "#c26732", fontWeight: 800 }}>
              Sonraki harf
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}
