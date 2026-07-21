"use client";
import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {Card,CardActionArea,Chip,LinearProgress,Paper} from "@mui/material";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import KeyboardArrowRightRounded from "@mui/icons-material/KeyboardArrowRightRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import {namazSureleri} from "@/src/data/namaz-sureleri";

export default function NamazSureleriClient(){
 const [completed,setCompleted]=useState<string[]>([]);
 useEffect(()=>{try{setCompleted(JSON.parse(localStorage.getItem("namaz-sureleri-progress")||"[]"))}catch{}},[]);
 const total=useMemo(()=>namazSureleri.reduce((sum,s)=>sum+s.ayahs.length,0),[]);
 const percent=Math.round(completed.length/total*100);
 return <main className="min-h-screen bg-[#f7f3ec] text-[#183f3a]">
  <AcademyHeader title="Namaz Sureleri"/>
  <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
   <Paper elevation={0} className="overflow-hidden !rounded-[2rem] !bg-[#244a70] !p-7 !text-white sm:!p-11">
    <div className="grid items-end gap-8 lg:grid-cols-[1fr_360px]"><div><p className="text-sm font-black tracking-[.18em] text-[#f6cf88]">FÂTİHA’DAN NÂS’A</p><h1 className="mt-3 max-w-3xl font-serif text-5xl font-bold leading-tight sm:text-6xl">Namaz sûrelerini<br/>anlayarak öğren.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">Sûreni seç; ayetleri renkli kelime gruplarıyla izle, dinle ve her ayetin anlam katmanlarını ayrıntılı biçimde keşfet.</p></div>
    <Paper elevation={0} className="!rounded-3xl !bg-white/10 !p-6 !text-white ring-1 ring-white/15"><div className="flex justify-between gap-3"><b>{completed.length} / {total} ayet</b><b className="text-[#f6cf88]">%{percent}</b></div><LinearProgress value={percent} variant="determinate" sx={{mt:2,height:11,borderRadius:8,bgcolor:"rgba(255,255,255,.18)","& .MuiLinearProgress-bar":{bgcolor:"#f6cf88",borderRadius:8}}}/></Paper></div>
   </Paper>
   <div className="mt-11"><p className="text-sm font-black tracking-[.16em] text-[#b65f38]">11 SÛRELİK ÖĞRENME KÜTÜPHANESİ</p><h2 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">Bir sûre seç</h2><p className="mt-3 max-w-2xl text-base leading-7 text-[#183f3a]/65">Her sûre kendi ayet listesine açılır. Tamamladığın ayetler bu cihazda işaretlenir.</p></div>
   <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{namazSureleri.map((sure,index)=>{const done=sure.ayahs.filter(a=>completed.includes(`${sure.slug}-${a.number}`)).length;return <Card key={sure.slug} elevation={0} className="!rounded-3xl !bg-white ring-1 ring-blue-950/10 transition hover:-translate-y-1 hover:shadow-xl"><CardActionArea component={Link} href={`/namaz-sureleri/${sure.slug}`} className="!min-h-64 !p-6"><div className="flex h-full flex-col"><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 font-black text-[#244a70]">{String(index+1).padStart(2,"0")}</span><Chip size="small" icon={done===sure.ayahs.length?<CheckCircleRounded/>:<AutoStoriesRounded/>} label={`${done}/${sure.ayahs.length} ayet`} className={done===sure.ayahs.length?"!bg-emerald-50 !font-bold !text-emerald-800":"!bg-amber-50 !font-bold !text-amber-900"}/></div><div className="mt-5 flex items-end justify-between gap-4"><div><h3 className="font-serif text-3xl font-bold">{sure.name}</h3><p className="mt-2 text-sm font-semibold text-[#b65f38]">{sure.period}</p></div><span dir="rtl" className="font-serif text-4xl text-[#244a70]">{sure.arabicName}</span></div><p className="mt-4 text-sm leading-6 text-[#183f3a]/65">{sure.theme}</p><span className="mt-auto flex items-center pt-5 text-sm font-extrabold text-[#b65f38]">Ayetleri aç <KeyboardArrowRightRounded/></span></div></CardActionArea></Card>})}</div>
  </section>
 </main>
}
