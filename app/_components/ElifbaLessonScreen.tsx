"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Card, CardActionArea, Chip } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import type { ElifbaLesson } from "@/src/data/elifba-lessons";
import { elifbaLessons } from "@/src/data/elifba-lessons";
import { getElifbaSources, getElifbaTheory } from "@/src/data/elifba-theory";
import letters from "@/src/data/elifba.json";
import AcademyHeader from "@/app/_components/AcademyHeader";

type Letter = (typeof letters)[number];
const nonJoining = new Set(["elif", "dal", "zel", "ra", "ze", "vav"]);
const makhrajGroups = [
  { title:"Boğaz harfleri", subtitle:"Boğazın farklı bölümlerinden çıkar", ids:["he","ayn","ha","gayn","hi"] },
  { title:"Dil harfleri", subtitle:"Dil ucu, ortası veya kökü kullanılır", ids:["kaf","kef","cim","sin3","ye","dal","te","ti","sad","dad","ra","lam","nun"] },
  { title:"Dudak harfleri", subtitle:"Dudakların hareketiyle çıkar", ids:["fe","be","mim","vav"] },
  { title:"Peltek harfler", subtitle:"Dil ucu üst dişlere yaklaşır", ids:["se","zel","zi"] },
];

function forms(letter: Letter) {
  const connects = !nonJoining.has(letter.id);
  return [letter.arabic, connects ? `${letter.arabic}ـ` : letter.arabic, connects ? `ـ${letter.arabic}ـ` : `ـ${letter.arabic}`, `ـ${letter.arabic}`];
}

export default function ElifbaLessonScreen({ lesson }: { lesson: ElifbaLesson }) {
  const [message,setMessage] = useState("Dinlemek istediğin karta dokun.");
  const [completed,setCompleted] = useState<number[]>([]);
  const [selectedLetter,setSelectedLetter] = useState<Letter>(letters[0]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentIndex = lesson.day - 1;
  const previous = elifbaLessons[currentIndex - 1];
  const next = elifbaLessons[currentIndex + 1];
  const theory = getElifbaTheory(lesson.day);
  const sources = getElifbaSources(lesson.day);

  useEffect(()=>{const saved=localStorage.getItem("elifba-30-progress");if(saved)setCompleted(JSON.parse(saved))},[]);

  function speak(text:string,label=text) {
    setMessage(`${label} okunuyor…`);
    window.speechSynthesis?.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = .65;
    const voice = window.speechSynthesis?.getVoices().find(item=>item.lang.startsWith("ar"));
    if(voice) utterance.voice=voice;
    window.speechSynthesis?.speak(utterance);
  }

  function playLetter(letter:Letter) {
    setSelectedLetter(letter);
    const player=audioRef.current;
    if(!player)return;
    player.pause();
    player.src=letter.audio;
    player.currentTime=0;
    player.play().then(()=>setMessage(`${letter.name} harfinin doğru telaffuzu oynatılıyor.`)).catch(()=>speak(letter.pronunciation,letter.name));
  }

  function playLessonAudio(kind:"ornek"|"pratik",index:number,fallbackText:string) {
    const player=audioRef.current;
    if(!player)return;
    player.pause();
    player.currentTime=0;
    player.playbackRate=.85;
    player.src=`/audio/elifba/dersler/gun-${String(lesson.day).padStart(2,"0")}/${kind}-${String(index+1).padStart(2,"0")}.mp3`;
    player.play().then(()=>setMessage(`${kind==="ornek"?"Ders örneği":"Pratik örneği"} oynatılıyor.`)).catch(()=>speak(fallbackText));
  }

  function finishLesson() {
    const updated=completed.includes(lesson.day)?completed:[...completed,lesson.day].sort((a,b)=>a-b);
    setCompleted(updated);localStorage.setItem("elifba-30-progress",JSON.stringify(updated));setMessage(`${lesson.day}. gün tamamlandı. Tebrikler!`);
  }

  return <main className="min-h-screen bg-[#fbf7ef] text-[#163f3a]">
    <audio ref={audioRef} preload="auto" />
    <AcademyHeader title="30 Günlük Elifba Programı"/>

    <div className="mx-auto grid max-w-[1450px] gap-7 px-4 py-7 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-7">
      <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
        <div className="rounded-3xl border border-emerald-900/10 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-3 px-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-orange-700"><MenuBookRounded/></span><div><b className="block text-base">Öğrenme yolun</b><small className="text-emerald-900/55">30 günlük Elifba programı</small></div></div>
          <nav className="max-h-[calc(100vh-12rem)] space-y-1 overflow-y-auto pr-1">
            {elifbaLessons.map(item=><Link key={item.slug} href={`/${item.slug}`} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition ${item.day===lesson.day?"bg-emerald-800 font-bold text-white shadow-md":"hover:bg-emerald-50"}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black ${completed.includes(item.day)?"bg-orange-400 text-white":item.day===lesson.day?"bg-white/15":"bg-stone-100 text-emerald-800"}`}>{completed.includes(item.day)?"✓":String(item.day).padStart(2,"0")}</span><span className="leading-5">{item.shortTitle}</span></Link>)}
          </nav>
        </div>
      </aside>

      <section className="min-w-0 space-y-6">
        <div className="overflow-hidden rounded-[2rem] bg-emerald-800 text-white shadow-xl shadow-emerald-950/10">
          <div className="grid gap-8 p-7 sm:p-10 xl:grid-cols-[1fr_290px]">
            <div><Chip label={lesson.category.toUpperCase()} className="!bg-amber-200 !font-extrabold !tracking-wider !text-emerald-950"/><p className="mt-6 text-sm font-bold text-emerald-200">GÜN {String(lesson.day).padStart(2,"0")}</p><h1 className="mt-2 font-serif text-4xl font-bold leading-tight sm:text-6xl">{lesson.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50">{lesson.summary}</p></div>
            <div className="grid place-items-center rounded-3xl bg-white/10 p-6 text-center ring-1 ring-white/15"><span className="text-sm font-bold text-amber-200">BUGÜNKÜ HEDEF</span><b className="my-4 font-serif text-6xl">{lesson.day<5?"28":lesson.day<17?"12":"8"}</b><span className="text-sm text-emerald-100">sesli tekrar</span></div>
          </div>
        </div>

        <Alert severity="info" icon={false} className="!rounded-2xl !bg-sky-50 !px-5 !py-3 !text-base !font-semibold !text-sky-950">👂 {lesson.instruction}</Alert>

        <article className="rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-4xl"><p className="text-xs font-black tracking-[.18em] text-orange-700">AYRINTILI TEORİ</p><h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Konuyu anlayalım</h2><p className="mt-3 text-sm leading-6 text-emerald-900/55">Bu bölüm güvenilir öğretim kaynakları esas alınarak özgün biçimde hazırlanmış bir açıklamadır; kaynak metinlerden doğrudan uzun alıntı yapılmamıştır.</p></div>
          <div className="mt-7 grid gap-x-9 gap-y-5 xl:grid-cols-2">{theory.map((paragraph,index)=><div key={index} className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-sm font-black text-emerald-800">{index+1}</span><p className="text-[16px] leading-8 text-emerald-950/80">{paragraph}</p></div>)}</div>
          <div className="mt-8 border-t border-emerald-900/10 pt-4"><p className="text-[11px] font-black uppercase tracking-wider text-emerald-900/50">Kaynakça</p><div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">{sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:text-orange-700">{source.publisher}: {source.title}</a>)}</div></div>
        </article>

        <div className="grid gap-5 xl:grid-cols-[1fr_330px]">
          <div className="rounded-3xl border border-emerald-900/10 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-black tracking-[.18em] text-orange-700">DİNLE VE TEKRAR ET</p><h2 className="mt-1 font-serif text-3xl font-bold">Ders çalışması</h2></div><VolumeUpRounded className="text-emerald-700" fontSize="large"/></div>
            {lesson.mode==="letters" && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">{letters.map(letter=><Card key={letter.id} elevation={selectedLetter.id===letter.id?5:0} className={`!rounded-2xl ring-2 ${selectedLetter.id===letter.id?"ring-orange-400":"ring-emerald-900/10"}`}><CardActionArea onClick={()=>playLetter(letter)} className="!p-4 !text-center"><span dir="rtl" className="block font-serif text-6xl text-emerald-800">{letter.arabic}</span><b className="mt-1 block text-sm">{letter.name}</b>{lesson.day===3&&<span className="mt-3 grid grid-cols-4 gap-1 border-t pt-2">{forms(letter).map((form,index)=><span key={index} dir="rtl" className="font-serif text-xl">{form}</span>)}</span>}<small className="mt-2 block font-bold text-orange-700">▶ Dinle</small></CardActionArea></Card>)}</div>}
            {lesson.mode==="makhraj" && <div className="space-y-4">{makhrajGroups.map(group=><div key={group.title} className="rounded-2xl bg-stone-50 p-4 ring-1 ring-stone-200"><div className="mb-3"><b className="text-lg">{group.title}</b><p className="text-sm text-emerald-900/60">{group.subtitle}</p></div><div className="flex flex-wrap gap-2">{group.ids.map(id=>{const letter=letters.find(item=>item.id===id);return letter?<Button key={id} onClick={()=>playLetter(letter)} startIcon={<VolumeUpRounded/>} variant="outlined" sx={{borderRadius:3,borderColor:"#9bb8af",color:"#174f47",fontSize:"1.35rem",fontFamily:"serif",fontWeight:700}}>{letter.arabic}</Button>:null})}</div></div>)}</div>}
            {lesson.mode==="reading" && <div className="grid gap-3 sm:grid-cols-2">{lesson.examples.map((example,index)=><button key={index} onClick={()=>playLessonAudio("ornek",index,example)} className="group flex min-h-32 items-center justify-between rounded-2xl border-2 border-emerald-900/10 bg-[#fffcf7] px-5 text-right transition hover:border-orange-400 hover:shadow-md"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-800 text-white group-hover:bg-orange-600">▶</span><span dir="rtl" className="font-serif text-4xl leading-relaxed text-emerald-950">{example}</span></button>)}</div>}
          </div>
          <aside className="space-y-5"><div className="rounded-3xl bg-[#f1dfc7] p-6"><p className="text-xs font-black tracking-[.16em] text-orange-800">AKLINDA KALSIN</p><ul className="mt-4 space-y-4">{lesson.points.map((point,index)=><li key={point} className="flex gap-3 text-sm font-semibold leading-6"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-orange-700">{index+1}</span>{point}</li>)}</ul></div><div className="rounded-3xl bg-emerald-800 p-6 text-white"><p className="text-xs font-black tracking-[.16em] text-amber-200">SESLİ DURUM</p><p aria-live="polite" className="mt-3 min-h-12 text-sm leading-6 text-emerald-50">{message}</p></div></aside>
        </div>

        <div className="rounded-3xl border border-orange-200 bg-orange-50 p-5 sm:p-7"><p className="text-xs font-black tracking-[.18em] text-orange-700">BOL PRATİK</p><h2 className="mt-2 font-serif text-3xl font-bold">Şimdi sıra sende</h2><p className="mt-2 text-emerald-900/65">Kartlara dokun, dinle ve aynı örneği üç defa sesli oku.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{lesson.practice.map((example,index)=><button key={index} onClick={()=>playLessonAudio("pratik",index,example)} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-orange-200 transition hover:-translate-y-1 hover:shadow-md"><span dir="rtl" className="block font-serif text-3xl leading-relaxed">{example}</span><small className="mt-2 block font-extrabold text-orange-700">▶ Örneği dinle</small></button>)}</div></div>

        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-emerald-900/10 sm:flex-row"><div className="flex gap-2"><Button component={Link} href="/" startIcon={<HomeRounded/>} sx={{color:"#174f47",fontWeight:700}}>Ana sayfa</Button>{previous&&<Button component={Link} href={`/${previous.slug}`} startIcon={<ArrowBackRounded/>} sx={{color:"#174f47",fontWeight:700}}>Önceki gün</Button>}</div><Button onClick={finishLesson} variant="contained" endIcon={completed.includes(lesson.day)?<CheckCircleRounded/>:<ArrowForwardRounded/>} sx={{borderRadius:3,bgcolor:"#174f47",px:3,py:1.4,fontWeight:800,"&:hover":{bgcolor:"#0f3f38"}}}>{completed.includes(lesson.day)?"Ders tamamlandı":next?"Dersi tamamla":"Programı tamamla"}</Button>{next&&<Button component={Link} href={`/${next.slug}`} endIcon={<ArrowForwardRounded/>} sx={{color:"#c26732",fontWeight:800}}>Sonraki gün</Button>}</div>
      </section>
    </div>
  </main>;
}
