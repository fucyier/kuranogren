"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button, Paper } from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import letters from "@/src/data/elifba.json";
import { mahrecBonusNotes, mahrecZones } from "@/src/data/mahrec-haritasi";

export default function MahrecHaritasiClient() {
  const [activeZoneId, setActiveZoneId] = useState(mahrecZones[0].id);
  const audioRef = useRef<HTMLAudioElement>(null);
  const activeZone = mahrecZones.find((zone) => zone.id === activeZoneId) ?? mahrecZones[0];

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
      <AcademyHeader title="Mahreç Haritası" />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
        <Paper elevation={0} className="!rounded-[2rem] !bg-emerald-800 !p-7 !text-white sm:!p-10">
          <p className="text-sm font-black tracking-[.18em] text-amber-200">SESLİ-GÖRSEL MAHREÇ HARİTASI</p>
          <h1 className="mt-3 max-w-2xl font-serif text-5xl font-bold leading-tight sm:text-6xl">Ses nereden çıkıyor?</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
            Aşağıdaki şemada bir bölgeye dokun; o bölgeden çıkan harfleri gör ve dinle. Harita, harflerin ağız içindeki
            yaklaşık çıkış noktasını basitleştirerek gösterir.
          </p>
        </Paper>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Paper elevation={0} className="!rounded-3xl !p-6 ring-1 ring-emerald-900/10">
            <svg viewBox="0 0 100 100" className="w-full" role="img" aria-label="Ağız ve boğaz kesiti şeması">
              <path
                d="M8 55 C8 30 28 10 55 10 C78 10 92 25 92 45 C92 58 84 66 74 68 L70 78 L62 70 C55 74 45 74 38 70 C22 70 8 65 8 55 Z"
                fill="#f1e7d6"
                stroke="#c9b78f"
                strokeWidth="1.2"
              />
              <path d="M62 55 Q75 60 88 50" fill="none" stroke="#c9b78f" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M18 62 Q35 74 58 68" fill="none" stroke="#c9b78f" strokeWidth="1.4" strokeLinecap="round" />
              {mahrecZones.map((zone) => (
                <g key={zone.id}>
                  <circle
                    cx={zone.cx}
                    cy={zone.cy}
                    r={activeZoneId === zone.id ? 9 : 7}
                    fill={zone.color}
                    fillOpacity={activeZoneId === zone.id ? 0.9 : 0.55}
                    stroke="#fff"
                    strokeWidth="1.5"
                    style={{ cursor: "pointer", transition: "all .2s" }}
                    onClick={() => setActiveZoneId(zone.id)}
                  />
                  <text x={zone.cx} y={zone.cy + 16} textAnchor="middle" fontSize="4.2" fontWeight={700} fill="#163f3a">
                    {zone.title.split(" ")[0]}
                  </text>
                </g>
              ))}
            </svg>
            <p className="mt-3 text-center text-xs font-semibold text-emerald-900/50">Basitleştirilmiş şema — anatomik kesinlik amaçlanmamıştır.</p>
          </Paper>

          <Paper elevation={0} className="!rounded-3xl !p-6 ring-1 ring-emerald-900/10 sm:!p-8">
            <div className="flex flex-wrap gap-2">
              {mahrecZones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZoneId(zone.id)}
                  className="rounded-full px-4 py-2 text-sm font-extrabold transition"
                  style={{
                    backgroundColor: activeZoneId === zone.id ? zone.color : `${zone.color}18`,
                    color: activeZoneId === zone.id ? "#fff" : zone.color,
                  }}
                >
                  {zone.title}
                </button>
              ))}
            </div>

            <h2 className="mt-6 font-serif text-3xl font-bold">{activeZone.title}</h2>
            <p className="mt-1 text-sm font-bold" style={{ color: activeZone.color }}>
              {activeZone.subtitle}
            </p>
            <p className="mt-4 text-[15px] leading-7 text-emerald-950/75">{activeZone.description}</p>

            <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {activeZone.letterIds.map((letterId) => {
                const letter = letters.find((item) => item.id === letterId);
                if (!letter) return null;
                return (
                  <button
                    key={letterId}
                    onClick={() => playLetter(letterId)}
                    className="group rounded-2xl bg-[#fbfaf7] p-3 text-center ring-1 ring-emerald-900/10 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span dir="rtl" className="arabic-learning block text-3xl leading-none" style={{ color: activeZone.color }}>
                      {letter.arabic}
                    </span>
                    <VolumeUpRounded fontSize="small" className="mt-1" style={{ color: activeZone.color }} />
                  </button>
                );
              })}
            </div>
          </Paper>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {mahrecBonusNotes.map((note) => (
            <Paper key={note.id} elevation={0} className="!rounded-3xl !bg-[#f1dfc7] !p-6">
              <b className="font-serif text-2xl font-bold text-orange-900">{note.title}</b>
              <p className="mt-2 text-sm leading-6 text-orange-950/70">{note.description}</p>
              <Link href={note.href} className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-orange-800">
                İlgili tecvid dersine git <ArrowForwardRounded fontSize="small" />
              </Link>
            </Paper>
          ))}
        </div>
      </section>
    </main>
  );
}
