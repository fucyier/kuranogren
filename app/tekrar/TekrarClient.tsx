"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Paper } from "@mui/material";
import CheckRounded from "@mui/icons-material/CheckRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import EventAvailableRounded from "@mui/icons-material/EventAvailableRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import letters from "@/src/data/elifba.json";
import { dueReviews, reviewResult, totalScheduled, type SrsEntry } from "@/src/lib/progress";

const kindLabels: Record<string, string> = {
  elifba: "Elifba dersi",
  tecvid: "Tecvid dersi",
  namaz: "Namaz suresi ayeti",
  harf: "Harf",
};

export default function TekrarClient() {
  const [items, setItems] = useState<(SrsEntry & { id: string })[]>([]);
  const [total, setTotal] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setItems(dueReviews());
    setTotal(totalScheduled());
  }, []);

  function refresh() {
    setItems(dueReviews());
  }

  function markResult(id: string, correct: boolean) {
    reviewResult(id, correct);
    refresh();
  }

  function playLetter(letterId: string) {
    const letter = letters.find((item) => item.id === letterId);
    const player = audioRef.current;
    if (!letter || !player) return;
    player.src = letter.audio;
    player.play().catch(() => {});
  }

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#163f3a]">
      <audio ref={audioRef} preload="none" />
      <AcademyHeader title="Tekrar Zamanı" />
      <section className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <Paper elevation={0} className="!rounded-[2rem] !bg-[#174f47] !p-7 !text-white sm:!p-10">
          <p className="text-sm font-black tracking-[.18em] text-amber-200">ARALIKLI TEKRAR</p>
          <h1 className="mt-3 font-serif text-5xl font-bold leading-tight sm:text-6xl">Bugün {items.length} tekrar seni bekliyor</h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-emerald-50">
            Tamamladığın dersler ve ayetler burada zamanı geldiğinde otomatik olarak yeniden karşına çıkar. Toplam {total} öğe takipte.
          </p>
        </Paper>

        {items.length === 0 && (
          <Paper elevation={0} className="mt-8 !rounded-3xl !p-9 text-center ring-1 ring-emerald-900/10">
            <EventAvailableRounded sx={{ fontSize: 48, color: "#174f47" }} />
            <h2 className="mt-4 font-serif text-2xl font-bold">Bugün için bekleyen tekrar yok</h2>
            <p className="mt-2 text-sm leading-6 text-emerald-900/60">
              Yeni bir ders tamamladığında ya da testte yanlış cevap verdiğinde, o konu birkaç gün sonra burada tekrar karşına çıkar.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button component={Link} href="/pratik" variant="contained" sx={{ borderRadius: 3, bgcolor: "#174f47", fontWeight: 800 }}>
                Test çöz
              </Button>
              <Button component={Link} href="/elifba" variant="outlined" sx={{ borderRadius: 3, borderColor: "#174f47", color: "#174f47", fontWeight: 800 }}>
                Derslere dön
              </Button>
            </div>
          </Paper>
        )}

        <div className="mt-8 space-y-4">
          {items.map((item) => {
            const letterId = item.kind === "harf" ? item.id.replace("harf-", "") : null;
            const letter = letterId ? letters.find((l) => l.id === letterId) : null;
            return (
              <Paper key={item.id} elevation={0} className="!rounded-3xl !p-5 ring-1 ring-emerald-900/10 sm:!p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {letter && (
                      <button onClick={() => playLetter(letter.id)} className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-800">
                        <span dir="rtl" className="arabic-learning text-3xl leading-none">
                          {letter.arabic}
                        </span>
                      </button>
                    )}
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-orange-700">{kindLabels[item.kind]}</span>
                      <b className="mt-1 block text-lg leading-6">{item.label}</b>
                      <small className="text-emerald-900/50">Tekrar sayısı: {item.reps}</small>
                    </div>
                  </div>

                  {item.kind === "harf" ? (
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => playLetter(letterId!)} startIcon={<VolumeUpRounded />} sx={{ color: "#174f47", fontWeight: 700 }}>
                        Dinle
                      </Button>
                      <Button onClick={() => markResult(item.id, true)} startIcon={<CheckRounded />} variant="contained" sx={{ borderRadius: 3, bgcolor: "#17756a", fontWeight: 800 }}>
                        Bildim
                      </Button>
                      <Button onClick={() => markResult(item.id, false)} startIcon={<CloseRounded />} variant="outlined" sx={{ borderRadius: 3, borderColor: "#c94f4f", color: "#c94f4f", fontWeight: 800 }}>
                        Unuttum
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {item.href && (
                        <Button component={Link} href={item.href} startIcon={<OpenInNewRounded />} sx={{ color: "#174f47", fontWeight: 700 }}>
                          İncele
                        </Button>
                      )}
                      <Button onClick={() => markResult(item.id, true)} startIcon={<CheckRounded />} variant="contained" sx={{ borderRadius: 3, bgcolor: "#17756a", fontWeight: 800 }}>
                        Tekrar ettim
                      </Button>
                    </div>
                  )}
                </div>
              </Paper>
            );
          })}
        </div>
      </section>
    </main>
  );
}
