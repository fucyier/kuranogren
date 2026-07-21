"use client";
import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {Card,CardActionArea,Chip,LinearProgress,Paper} from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import GraphicEqRounded from "@mui/icons-material/GraphicEqRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import {tecvidLessons} from "@/src/data/tecvid-lessons";

export default function TecvidProgramClient(){
 const [completed,setCompleted]=useState<number[]>([]);
 useEffect(()=>{try{setCompleted(JSON.parse(localStorage.getItem("tecvid-10-progress")||"[]"))}catch{}},[]);
 const percent=useMemo(()=>Math.round(completed.length/tecvidLessons.length*100),[completed]);
 return <main className="min-h-screen bg-[#f7f3ec] text-[#183f3a]"><AcademyHeader title="10 Derslik Tecvid Programı"/>
  <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
   <Paper elevation={0} className="relative overflow-hidden !rounded-[2rem] !bg-[#244a70] !p-7 !text-white sm:!p-10"><div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/15"/><div className="relative z-10 grid items-end gap-8 lg:grid-cols-[1fr_380px]"><div><p className="text-sm font-black tracking-[.18em] text-[#f6cf88]">10 DERSLİK TECVİD PROGRAMI</p><h1 className="mt-3 max-w-3xl font-serif text-5xl font-bold leading-tight sm:text-6xl">Rengi gör, sesi dinle,<br/>kuralı okuyuşuna taşı.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">Her kuralı yavaş Arapça kayıtlarla dinle, renkli harflerde takip et ve bol tekrar kartlarıyla kalıcı hâle getir.</p></div><Paper elevation={0} className="!rounded-3xl !bg-white/10 !p-6 !text-white ring-1 ring-white/15"><div className="flex items-end justify-between"><div><span className="text-sm text-blue-100">Tamamlanan</span><b className="mt-1 block text-4xl">{completed.length}<small className="text-lg font-medium text-blue-200"> / 10 ders</small></b></div><b className="text-2xl text-[#f6cf88]">%{percent}</b></div><LinearProgress variant="determinate" value={percent} sx={{mt:2.5,height:11,borderRadius:8,bgcolor:"rgba(255,255,255,.18)","& .MuiLinearProgress-bar":{bgcolor:"#f6cf88",borderRadius:8}}}/></Paper></div></Paper>
   <div className="mt-12 flex items-end justify-between gap-4"><div><p className="text-sm font-black tracking-[.16em] text-[#b65f38]">ÖĞRENME YOLUN</p><h2 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">10 dersin tamamı</h2></div><p className="hidden max-w-md text-right text-sm leading-6 text-blue-950/55 sm:block">Tenvinden genel uygulamaya ilerle. Her ders ayrı ekranda teori, yavaş ses ve tekrar çalışmaları içerir.</p></div>
   <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{tecvidLessons.map(lesson=>{const done=completed.includes(lesson.day);return <Card key={lesson.slug} elevation={0} className={`group !rounded-3xl ring-1 transition hover:-translate-y-1 hover:shadow-xl ${done?"!bg-emerald-50 ring-emerald-300":"!bg-white ring-blue-950/10"}`}><CardActionArea component={Link} href={`/tecvid/${lesson.slug}`} className="!min-h-80 !p-6"><div className="flex h-full flex-col"><div className="flex items-start justify-between gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl text-sm font-black text-white" style={{backgroundColor:done?"#17756a":lesson.color}}>{done?<CheckCircleRounded/>:String(lesson.day).padStart(2,"0")}</span><Chip size="small" label={done?"Tamamlandı":lesson.category} sx={{bgcolor:done?"#d9ece2":`${lesson.color}18`,color:done?"#174f47":lesson.color,fontWeight:800}}/></div><p dir="rtl" className="arabic-learning mt-5 text-5xl leading-[1.7]" style={{color:lesson.color}}>{lesson.examples[0].arabic}</p><h3 className="mt-2 font-serif text-2xl font-bold leading-tight">{lesson.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-blue-950/55">{lesson.summary}</p><div className="mt-auto flex items-center justify-between pt-6 text-sm font-extrabold" style={{color:lesson.color}}><span className="flex items-center gap-2"><GraphicEqRounded fontSize="small"/> Yavaş sesli</span><span className="flex items-center gap-1 transition group-hover:translate-x-1">Dersi aç <ArrowForwardRounded fontSize="small"/></span></div></div></CardActionArea></Card>})}</div>
  </section>
 </main>
}
