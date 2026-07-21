"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card, CardActionArea, Chip, LinearProgress, Paper } from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import PlayCircleRounded from "@mui/icons-material/PlayCircleRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import { elifbaLessons } from "@/src/data/elifba-lessons";

const categoryColors: Record<string,string> = {
  "Harf Bilgisi":"#e9f3ee", "Doğru Telaffuz":"#f7e6cf", "Telaffuz":"#f7e6cf",
  "Harekeler":"#e8e6f3", "Okuma Pratiği":"#e5eef4", "Okuma İşaretleri":"#f3e4df",
  "Uzatma":"#e6f0e9", "Tenvin":"#f4e9cf", "Özel Okuyuşlar":"#e8e1ed",
  "Kur’an İşaretleri":"#dfeaec", "Tam Okuma":"#dfeee6",
};

export default function ElifbaProgramClient() {
  const [completed,setCompleted] = useState<number[]>([]);
  useEffect(()=>{const saved=localStorage.getItem("elifba-30-progress");if(saved)setCompleted(JSON.parse(saved))},[]);
  const percent=useMemo(()=>Math.round(completed.length/30*100),[completed]);

  return <main className="min-h-screen bg-[#fbf7ef] text-[#163f3a]">
    <AcademyHeader title="30 Günlük Elifba Programı"/>
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
      <Paper elevation={0} className="relative overflow-hidden !rounded-[2rem] !bg-emerald-800 !p-7 !text-white sm:!p-10">
        <div className="relative z-10 grid items-end gap-8 lg:grid-cols-[1fr_380px]"><div><p className="text-sm font-black tracking-[.18em] text-amber-200">30 GÜNLÜK ELİFBA PROGRAMI</p><h1 className="mt-3 max-w-3xl font-serif text-5xl font-bold leading-tight sm:text-6xl">Her gün bir ders,<br/>Kur&apos;an okumaya bir adım.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50">Ders kartını seç, sesli örnekleri dinle ve tamamladığın günleri işaretle. Program kaldığın yeri bu cihazda hatırlar.</p></div><Paper elevation={0} className="!rounded-3xl !bg-white/10 !p-6 !text-white ring-1 ring-white/15"><div className="flex items-end justify-between"><div><span className="text-sm text-emerald-100">Tamamlanan</span><b className="mt-1 block text-4xl">{completed.length}<small className="text-lg font-medium text-emerald-200"> / 30 ders</small></b></div><b className="text-2xl text-amber-200">%{percent}</b></div><LinearProgress variant="determinate" value={percent} sx={{mt:2.5,height:11,borderRadius:8,bgcolor:"rgba(255,255,255,.18)","& .MuiLinearProgress-bar":{bgcolor:"#f5c87f",borderRadius:8}}}/></Paper></div>
      </Paper>

      <div className="mt-12 flex items-end justify-between gap-4"><div><p className="text-sm font-black tracking-[.16em] text-orange-700">ÖĞRENME YOLUN</p><h2 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">30 dersin tamamı</h2></div><p className="hidden max-w-md text-right text-sm leading-6 text-emerald-900/60 sm:block">Her kart ayrı bir detay ekranı açar. Tamamlanan dersler yeşil onay işaretiyle görünür.</p></div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {elifbaLessons.map(lesson=>{const done=completed.includes(lesson.day);return <Card key={lesson.slug} elevation={0} className={`group !rounded-3xl ring-1 transition hover:-translate-y-1 hover:shadow-xl ${done?"!bg-emerald-50 ring-emerald-300":"!bg-white ring-emerald-900/10"}`}><CardActionArea component={Link} href={`/${lesson.slug}`} className="!min-h-64 !p-6"><div className="flex h-full flex-col"><div className="flex items-start justify-between gap-4"><span className={`grid h-12 w-12 place-items-center rounded-2xl text-sm font-black ${done?"bg-emerald-700 text-white":"bg-stone-100 text-emerald-800"}`}>{done?<CheckCircleRounded/>:String(lesson.day).padStart(2,"0")}</span><Chip size="small" label={done?"Tamamlandı":lesson.category} sx={{bgcolor:done?"#d9ece2":categoryColors[lesson.category]||"#eef1ed",color:"#174f47",fontWeight:800}}/></div><h3 className="mt-6 font-serif text-2xl font-bold leading-tight">{lesson.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-emerald-900/60">{lesson.summary}</p><div className="mt-auto flex items-center justify-between pt-6 text-sm font-extrabold text-orange-700"><span className="flex items-center gap-2"><PlayCircleRounded fontSize="small"/> Sesli ders</span><span className="flex items-center gap-1 transition group-hover:translate-x-1">Dersi aç <ArrowForwardRounded fontSize="small"/></span></div></div></CardActionArea></Card>})}
      </div>
    </section>
  </main>;
}
