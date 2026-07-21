"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {Button,Card,CardActionArea,Chip,Paper} from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import {ayetAudioPath,type NamazSuresi} from "@/src/data/namaz-sureleri";

const colors=["#f6cf88","#b9e3d4","#ffc2a5","#c8d9ff","#f4b9cf"];
export default function SureAyetleriClient({sure}:{sure:NamazSuresi}){
 const audio=useRef<HTMLAudioElement>(null);const [playing,setPlaying]=useState<number|null>(null);const [completed,setCompleted]=useState<string[]>([]);
 useEffect(()=>{try{setCompleted(JSON.parse(localStorage.getItem("namaz-sureleri-progress")||"[]"))}catch{}},[]);
 function toggle(number:number){const player=audio.current;if(!player)return;if(playing===number){player.pause();setPlaying(null);return}player.src=ayetAudioPath(sure,number);player.play().then(()=>setPlaying(number)).catch(()=>setPlaying(null));player.onended=()=>setPlaying(null)}
 return <main className="min-h-screen bg-[#f7f3ec] text-[#183f3a]"><audio ref={audio} preload="metadata"/><AcademyHeader title="Namaz Sureleri"/>
  <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8"><Link href="/namaz-sureleri" className="inline-flex items-center gap-2 font-extrabold text-[#244a70]"><ArrowBackRounded/> Sûre listesi</Link>
   <Paper elevation={0} className="mt-5 !rounded-[2rem] !bg-[#244a70] !p-7 !text-white sm:!p-10"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><div><Chip label={sure.period} className="!bg-[#f6cf88] !font-black !text-blue-950"/><h1 className="mt-5 font-serif text-5xl font-bold sm:text-6xl">{sure.name}</h1><p className="mt-3 text-lg text-blue-100">{sure.theme}</p></div><p dir="rtl" className="font-serif text-7xl text-[#f6cf88]">{sure.arabicName}</p></div></Paper>
   <div className="mt-8 grid gap-5">{sure.ayahs.map(ayah=>{const done=completed.includes(`${sure.slug}-${ayah.number}`);return <Card key={ayah.number} elevation={0} className={`!rounded-3xl ring-1 ${done?"!bg-emerald-50 ring-emerald-200":"!bg-white ring-blue-950/10"}`}><div className="grid items-stretch md:grid-cols-[1fr_auto]"><CardActionArea component={Link} href={`/namaz-sureleri/${sure.slug}/${ayah.number}`} className="!p-6 sm:!p-8"><div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#244a70] font-black text-white">{ayah.number}</span><div className="min-w-0 flex-1"><p dir="rtl" className="font-serif text-4xl leading-[2] sm:text-5xl">{ayah.arabic.split(" ").map((word,i)=><span key={i} style={{color:colors[i%colors.length]}} className="mx-1 rounded-lg bg-[#244a70] px-2 py-1">{word}</span>)}</p><p className="mt-4 text-base font-semibold leading-7 text-[#183f3a]/75">{ayah.shortMeaning}</p><span className="mt-4 inline-block text-sm font-black text-[#b65f38]">Ayrıntılı açıklamayı aç →</span></div></div></CardActionArea><div className="flex items-center justify-center border-t border-blue-950/10 p-4 md:border-l md:border-t-0"><Button onClick={()=>toggle(ayah.number)} startIcon={playing===ayah.number?<PauseRounded/>:<PlayArrowRounded/>} variant="contained" sx={{borderRadius:3,bgcolor:"#f6cf88",color:"#183f3a",fontWeight:900,"&:hover":{bgcolor:"#ffe1a7"}}}>{playing===ayah.number?"Duraklat":"Dinle"}</Button></div></div></Card>})}</div>
  </section>
 </main>
}
