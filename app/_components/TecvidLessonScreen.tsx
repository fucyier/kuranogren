"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {Alert,Button,Card,CardActionArea,Chip,LinearProgress,Paper} from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import {tecvidAudioPath,tecvidLessons,type TecvidLesson,type TecvidSample} from "@/src/data/tecvid-lessons";
import {logActivity,scheduleReview} from "@/src/lib/progress";

function ColoredArabic({sample,color}:{sample:TecvidSample;color:string}){
 const index=sample.arabic.indexOf(sample.highlight);if(index<0)return <>{sample.arabic}</>;
 return <>{sample.arabic.slice(0,index)}<span className="rounded-lg px-1.5" style={{color,backgroundColor:`${color}18`}}>{sample.highlight}</span>{sample.arabic.slice(index+sample.highlight.length)}</>;
}

export default function TecvidLessonScreen({lesson}:{lesson:TecvidLesson}){
 const audio=useRef<HTMLAudioElement>(null);const [playing,setPlaying]=useState<string|null>(null);const [completed,setCompleted]=useState<number[]>([]);const [error,setError]=useState("");const previous=tecvidLessons[lesson.day-2];const next=tecvidLessons[lesson.day];
 useEffect(()=>{try{setCompleted(JSON.parse(localStorage.getItem("tecvid-10-progress")||"[]"))}catch{}},[]);
 function play(sample:TecvidSample){const player=audio.current;if(!player)return;if(playing===sample.id){player.pause();setPlaying(null);return}setError("");player.src=tecvidAudioPath(lesson,sample);player.playbackRate=1;player.play().then(()=>setPlaying(sample.id)).catch(()=>{setPlaying(null);setError("Ses başlatılamadı. Dosyanın yüklenmesini bekleyip tekrar deneyin.")});player.onended=()=>setPlaying(null);player.onerror=()=>{setPlaying(null);setError("Bu çalışma kaydı yüklenemedi.")}}
 function finish(){const values=completed.includes(lesson.day)?completed:[...completed,lesson.day].sort((a,b)=>a-b);setCompleted(values);localStorage.setItem("tecvid-10-progress",JSON.stringify(values));logActivity();scheduleReview(`tecvid-${lesson.day}`,"tecvid",lesson.shortTitle,`/tecvid/${lesson.slug}`)}
 const progress=Math.round(completed.length/tecvidLessons.length*100);
 return <main className="min-h-screen bg-[#f7f3ec] text-[#183f3a]"><audio ref={audio} preload="metadata"/><AcademyHeader title="10 Derslik Tecvid Programı" activeLesson={`Ders ${String(lesson.day).padStart(2, "0")} · ${lesson.shortTitle}`}/>
  <div className="mx-auto grid max-w-[1450px] gap-7 px-4 py-7 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-7"><aside className="order-2 lg:order-none lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]"><Paper elevation={0} className="!rounded-3xl !p-4 ring-1 ring-blue-950/10"><div className="mb-4 px-2"><p className="text-xs font-black tracking-[.15em] text-[#b65f38]">ÖĞRENME YOLUN</p><b className="mt-1 block text-lg">10 derslik Tecvid</b><div className="mt-3 flex items-center gap-3"><LinearProgress variant="determinate" value={progress} className="flex-1" sx={{height:8,borderRadius:5,bgcolor:"#e7e2da","& .MuiLinearProgress-bar":{bgcolor:"#244a70"}}}/><span className="text-xs font-black">%{progress}</span></div></div><nav aria-label="Tecvid dersleri" className="max-h-72 space-y-1 overflow-y-auto pr-1 lg:max-h-[calc(100vh-12rem)]">{tecvidLessons.map(item=><Link key={item.slug} href={`/tecvid/${item.slug}`} className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition ${item.day===lesson.day?"bg-blue-50 text-[#244a70]":"text-blue-950/55 hover:bg-stone-50"}`}><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-black text-white" style={{backgroundColor:completed.includes(item.day)?"#17756a":item.color}}>{completed.includes(item.day)?"✓":String(item.day).padStart(2,"0")}</span><span className="line-clamp-1">{item.shortTitle}</span></Link>)}</nav></Paper></aside>
   <section className="order-1 min-w-0 space-y-6 lg:order-none"><Paper elevation={0} className="!rounded-[2rem] !bg-[#244a70] !p-7 !text-white sm:!p-10"><div className="flex flex-wrap items-center justify-between gap-3"><Chip label={`DERS ${String(lesson.day).padStart(2,"0")} · ${lesson.category.toUpperCase()}`} sx={{bgcolor:"#f6cf88",color:"#183f3a",fontWeight:900}}/><Link href="/tecvid" className="inline-flex items-center gap-2 text-sm font-bold text-blue-100"><ArrowBackRounded fontSize="small"/> Ders kartları</Link></div><h1 className="mt-5 font-serif text-4xl font-bold sm:text-6xl">{lesson.title}</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-blue-100">{lesson.summary}</p><div className="mt-7 rounded-3xl bg-white/10 p-6 ring-1 ring-white/15"><p className="text-xs font-black tracking-[.16em] text-[#f6cf88]">BUGÜNÜN KURALI</p><p className="mt-3 text-lg font-semibold leading-8">{lesson.rule}</p></div></Paper>
    {error&&<Alert severity="error" className="!rounded-2xl">{error}</Alert>}
    <Paper component="article" elevation={0} className="!rounded-3xl !p-7 ring-1 ring-blue-950/10 sm:!p-9"><p className="text-xs font-black tracking-[.18em]" style={{color:lesson.color}}>AYRINTILI ANLATIM</p><h2 className="mt-2 font-serif text-4xl font-bold">Kuralı anlayalım</h2><div className="mt-7 space-y-6">{lesson.theory.map((paragraph,index)=><div key={paragraph} className="grid gap-4 sm:grid-cols-[48px_1fr]"><span className="grid h-12 w-12 place-items-center rounded-2xl text-sm font-black text-white" style={{backgroundColor:lesson.color}}>{index+1}</span><p className="text-[17px] leading-8 text-blue-950/75">{paragraph}</p></div>)}</div></Paper>
    <Paper elevation={0} className="!rounded-3xl !p-7 ring-1 ring-blue-950/10 sm:!p-9"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[.18em]" style={{color:lesson.color}}>RENKLİ ÖRNEKLER</p><h2 className="mt-2 font-serif text-4xl font-bold">Dinle ve fark et</h2></div><Chip icon={<HeadphonesRounded/>} label="Yavaş öğrenme kaydı" sx={{bgcolor:`${lesson.color}14`,color:lesson.color,fontWeight:800}}/></div><p className="mt-3 text-base leading-7 text-blue-950/60">{lesson.instruction}</p>
     <div className="mt-7 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {lesson.examples.map(sample=>
       <Card key={sample.id} elevation={0} className="!rounded-3xl border border-blue-950/10 !bg-[#fbfaf7] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]">
        <CardActionArea onClick={()=>play(sample)} className="!min-h-[200px] !p-5 !text-left">
         <div className="flex items-center justify-between"><span className="text-xs font-black" style={{color:lesson.color}}>{sample.reading}</span><span className="grid h-11 w-11 place-items-center rounded-full text-white" style={{backgroundColor:lesson.color}}>{playing===sample.id?<PauseRounded/>:<PlayArrowRounded/>}</span></div>
         <p dir="rtl" className="arabic-learning mt-5 break-words text-right text-5xl leading-[1.7] text-[#173f3a] sm:text-6xl"><ColoredArabic sample={sample} color={lesson.color}/></p>
         <p className="mt-3 text-sm font-semibold leading-6 text-blue-950/55">{sample.note}</p>
        </CardActionArea>
       </Card>
      )}
     </div>
    </Paper>
    <Paper elevation={0} className="!rounded-3xl !p-6 ring-1 ring-blue-950/10"><div className="flex flex-wrap items-center gap-x-6 gap-y-3"><p className="shrink-0 text-xs font-black tracking-[.16em] text-[#b65f38]">3 ADIMDA ÇALIŞ</p><div className="grid flex-1 gap-3 sm:grid-cols-3">{["Önce yalnız dinle.","Renkli bölümü izleyerek tekrar et.","Ekrana bakmadan üç kez oku."].map((text,index)=><div key={text} className="rounded-2xl bg-blue-50 p-4 text-sm font-bold leading-6"><span className="mr-2 text-[#b65f38]">{index+1}.</span>{text}</div>)}</div></div></Paper>
    <Paper elevation={0} className="!rounded-3xl !bg-[#fff7e8] !p-7 ring-1 ring-amber-200 sm:!p-9"><p className="text-xs font-black tracking-[.18em] text-amber-800">BOL PRATİK</p><h2 className="mt-2 font-serif text-4xl font-bold">Yavaş oku, üç kez tekrar et</h2>
     <div dir="rtl" className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {lesson.practice.map((sample,index)=>
       <Card key={sample.id} elevation={0} className="relative !rounded-3xl !bg-white ring-1 ring-amber-200 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]">
        <span className="pointer-events-none absolute right-2 top-2 z-10 grid h-6 w-6 place-items-center rounded-full text-[11px] font-black text-white shadow-sm" style={{backgroundColor:lesson.color}}>{index+1}</span>
        <CardActionArea onClick={()=>play(sample)} className="!flex !h-full !min-h-[196px] !flex-col !items-center !justify-between !gap-3 !p-5 !text-center">
         <p dir="rtl" className="arabic-learning flex flex-1 items-center break-words text-center text-3xl leading-[1.6] text-[#173f3a] sm:text-4xl"><ColoredArabic sample={sample} color={lesson.color}/></p>
         <div className="w-full"><b className="block text-xs" style={{color:lesson.color}}>{sample.reading}</b><span className="mt-1 block text-[11px] leading-4 text-blue-950/50">{sample.note}</span></div>
         <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{backgroundColor:lesson.color}}>{playing===sample.id?<PauseRounded/>:<PlayArrowRounded/>}</span>
        </CardActionArea>
       </Card>
      )}
     </div>
    </Paper>
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl bg-white/70 px-5 py-3 ring-1 ring-blue-950/10"><p className="text-[11px] font-black uppercase tracking-wider text-blue-950/45">Kaynakça</p><a href="https://kuran.diyanet.gov.tr/kuran-sozlugu/detay/51-tecvid" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#244a70] underline decoration-blue-200 underline-offset-4">Diyanet Kur’an Sözlüğü · Tecvid maddesi</a><a href="https://kurul.diyanet.gov.tr/tr/fetvalar/kuranin-kiraati/e4c6b440-d8da-48b0-a0dc-aeb000d9620d/tecvid-kurallari/01933666-3c40-7a54-2426-1fb669131440" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#244a70] underline decoration-blue-200 underline-offset-4">Din İşleri Yüksek Kurulu · Tecvid kuralları ve tertîl</a></div>
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-5 ring-1 ring-blue-950/10"><div>{previous&&<Button component={Link} href={`/tecvid/${previous.slug}`} startIcon={<ArrowBackRounded/>} sx={{color:"#244a70",fontWeight:800}}>Önceki ders</Button>}</div><Button onClick={finish} variant="contained" startIcon={<CheckCircleRounded/>} sx={{borderRadius:3,bgcolor:completed.includes(lesson.day)?"#17756a":"#244a70",fontWeight:900,px:3,py:1.3}}>{completed.includes(lesson.day)?"Tamamlandı":"Dersi tamamla"}</Button><div>{next&&<Button component={Link} href={`/tecvid/${next.slug}`} endIcon={<ArrowForwardRounded/>} sx={{color:"#b65f38",fontWeight:800}}>Sonraki ders</Button>}</div></div>
   </section></div>
 </main>
}
