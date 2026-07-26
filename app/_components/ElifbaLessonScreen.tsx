"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Card, CardActionArea, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import type { ElifbaLesson } from "@/src/data/elifba-lessons";
import { elifbaLessons } from "@/src/data/elifba-lessons";
import { getElifbaSources, getElifbaTheory } from "@/src/data/elifba-theory";
import letters from "@/src/data/elifba.json";
import AcademyHeader from "@/app/_components/AcademyHeader";
import { logActivity, scheduleReview } from "@/src/lib/progress";

type Letter = (typeof letters)[number];
const nonJoining = new Set(["elif", "dal", "zel", "ra", "ze", "vav"]);
const makhrajGroups = [
  { title:"Boğaz harfleri", subtitle:"Boğazın farklı bölümlerinden çıkar", ids:["he","ayn","ha","gayn","hi"] },
  { title:"Dil harfleri", subtitle:"Dil ucu, ortası veya kökü kullanılır", ids:["kaf","kef","cim","sin3","ye","dal","te","ti","sad","dad","ra","lam","nun"] },
  { title:"Dudak harfleri", subtitle:"Dudakların hareketiyle çıkar", ids:["fe","be","mim","vav"] },
  { title:"Peltek harfler", subtitle:"Dil ucu üst dişlere yaklaşır", ids:["se","zel","zi"] },
];

const soundGroups = [
  { title:"Kalın sesli harfler", subtitle:"Sesi dolgun ve kalın duyur", badge:"7 harf", ids:["hi","sad","dad","ti","zi","gayn","kaf"], shell:"bg-orange-50 ring-orange-200", accent:"bg-orange-600", text:"text-orange-800" },
  { title:"Peltek harfler", subtitle:"Dil ucunu üst ön dişlere yaklaştır", badge:"3 harf", ids:["se","zel","zi"], shell:"bg-violet-50 ring-violet-200", accent:"bg-violet-600", text:"text-violet-800" },
  { title:"İnce sesli harfler", subtitle:"Sesi kalınlaştırmadan açık söyle", badge:"19 harf", ids:["elif","be","te","cim","ha","dal","ra","ze","sin","sin3","ayn","fe","kef","lam","mim","nun","he","vav","ye"], shell:"bg-sky-50 ring-sky-200", accent:"bg-sky-700", text:"text-sky-800" },
];

const contrastPairs = [
  {thin:"sin",thick:"sad",label:"İnce s · Kalın s"},
  {thin:"te",thick:"ti",label:"İnce t · Kalın t"},
  {thin:"dal",thick:"dad",label:"İnce d · Kalın d"},
  {thin:"kef",thick:"kaf",label:"İnce k · Kalın k"},
];

function forms(letter: Letter) {
  const connects = !nonJoining.has(letter.id);
  return [letter.arabic, connects ? `${letter.arabic}ـ` : letter.arabic, connects ? `ـ${letter.arabic}ـ` : `ـ${letter.arabic}`, `ـ${letter.arabic}`];
}

export default function ElifbaLessonScreen({ lesson }: { lesson: ElifbaLesson }) {
  const [message,setMessage] = useState("Dinlemek istediğin karta dokun.");
  const [completed,setCompleted] = useState<number[]>([]);
  const [selectedLetter,setSelectedLetter] = useState<Letter>(letters[0]);
  const [letterDialogOpen,setLetterDialogOpen] = useState(false);
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
    player.currentTime=0;
    let fellBack=false;
    const fallback=()=>{if(fellBack)return;fellBack=true;speak(letter.pronunciation,letter.name);};
    player.onerror=fallback;
    player.src=letter.audio;
    player.play().then(()=>setMessage(`${letter.name} harfinin doğru telaffuzu oynatılıyor.`)).catch(fallback);
  }

  function selectLetter(letter:Letter) {
    playLetter(letter);
    if(lesson.day===3)setLetterDialogOpen(true);
  }

  function playLessonAudio(kind:"ornek"|"pratik"|"harf",index:number,fallbackText:string) {
    const player=audioRef.current;
    if(!player)return;
    player.pause();
    player.currentTime=0;
    player.playbackRate=.85;
    let fellBack=false;
    const fallback=()=>{if(fellBack)return;fellBack=true;speak(fallbackText);};
    player.onerror=fallback;
    player.src=`/audio/elifba/dersler/gun-${String(lesson.day).padStart(2,"0")}/${kind}-${String(index+1).padStart(2,"0")}.mp3`;
    player.play().then(()=>setMessage(`${kind==="ornek"?"Ders örneği":kind==="pratik"?"Pratik örneği":"Harf okunuşu"} oynatılıyor.`)).catch(fallback);
  }

  function finishLesson() {
    const updated=completed.includes(lesson.day)?completed:[...completed,lesson.day].sort((a,b)=>a-b);
    setCompleted(updated);localStorage.setItem("elifba-30-progress",JSON.stringify(updated));setMessage(`${lesson.day}. gün tamamlandı. Tebrikler!`);
    logActivity();
    scheduleReview(`elifba-${lesson.day}`,"elifba",lesson.shortTitle,`/${lesson.slug}`);
  }

  return <main className="min-h-screen bg-[#fbf7ef] text-[#163f3a]">
    <audio ref={audioRef} preload="auto" />
    <p aria-live="polite" className="sr-only">{message}</p>
    <Dialog open={letterDialogOpen} onClose={()=>setLetterDialogOpen(false)} fullWidth maxWidth="md" aria-labelledby="letter-forms-title" slotProps={{paper:{sx:{borderRadius:4,overflow:"hidden"}}}}>
      <DialogTitle id="letter-forms-title" className="!bg-emerald-800 !px-6 !py-5 !text-white sm:!px-8">
        <span className="block text-sm font-bold tracking-wider text-emerald-200">HARFİN YAZILIŞ BİÇİMLERİ</span>
        <span className="mt-1 block font-serif text-3xl font-bold">{selectedLetter.name} harfi</span>
      </DialogTitle>
      <DialogContent className="!bg-[#fbf7ef] !p-5 sm:!p-8">
        <div className="rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-emerald-900/10">
          <span className="text-sm font-black uppercase tracking-widest text-orange-700">Yalın biçimi</span>
          <span dir="rtl" className="arabic-learning mt-2 block text-[7rem] leading-none text-emerald-800 sm:text-[9rem]">{selectedLetter.arabic}</span>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {forms(selectedLetter).slice(1).map((form,index)=><div key={index} className="rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-emerald-900/10"><span className="text-sm font-black text-emerald-900/60">{["Başta","Ortada","Sonda"][index]}</span><span dir="rtl" className="arabic-learning mt-3 block text-6xl leading-[1.4] text-emerald-900 sm:text-7xl">{form}</span></div>)}
        </div>
        <p className="mt-5 text-center text-sm font-semibold leading-6 text-emerald-900/60">Harf, kelimedeki yerine göre farklı görünür; noktalarının ve temel gövdesinin aynı kaldığına dikkat et.</p>
      </DialogContent>
      <DialogActions className="!gap-2 !bg-white !px-6 !py-4 sm:!px-8">
        <Button onClick={()=>playLetter(selectedLetter)} startIcon={<VolumeUpRounded/>} sx={{mr:"auto",color:"#174f47",fontWeight:800}}>Telaffuzu dinle</Button>
        <Button onClick={()=>setLetterDialogOpen(false)} variant="contained" sx={{borderRadius:3,bgcolor:"#174f47",fontWeight:800,"&:hover":{bgcolor:"#0f3f38"}}}>Kapat</Button>
      </DialogActions>
    </Dialog>
    <AcademyHeader title="30 Günlük Elifba Programı" activeLesson={`Gün ${String(lesson.day).padStart(2, "0")} · ${lesson.shortTitle}`}/>

    <div className="mx-auto grid max-w-[1450px] gap-7 px-4 py-7 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-7">
      <aside className="order-2 lg:order-none lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
        <div className="rounded-3xl border border-emerald-900/10 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-3 px-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-orange-700"><MenuBookRounded/></span><div><b className="block text-base">Öğrenme yolun</b><small className="text-emerald-900/55">30 günlük Elifba programı</small></div></div>
          <nav className="max-h-72 space-y-1 overflow-y-auto pr-1 lg:max-h-[calc(100vh-12rem)]">
            {elifbaLessons.map(item=><Link key={item.slug} href={`/${item.slug}`} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition ${item.day===lesson.day?"bg-emerald-800 font-bold text-white shadow-md":"hover:bg-emerald-50"}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black ${completed.includes(item.day)?"bg-orange-400 text-white":item.day===lesson.day?"bg-white/15":"bg-stone-100 text-emerald-800"}`}>{completed.includes(item.day)?"✓":String(item.day).padStart(2,"0")}</span><span className="leading-5">{item.shortTitle}</span></Link>)}
          </nav>
        </div>
      </aside>

      <section className="order-1 min-w-0 space-y-6 lg:order-none">
        <div className="overflow-hidden rounded-[2rem] bg-emerald-800 text-white shadow-xl shadow-emerald-950/10">
          <div className="grid gap-8 p-7 sm:p-10 xl:grid-cols-[1fr_290px]">
            <div><Chip label={lesson.category.toUpperCase()} className="!bg-amber-200 !font-extrabold !tracking-wider !text-emerald-950"/><p className="mt-6 text-sm font-bold text-emerald-200">GÜN {String(lesson.day).padStart(2,"0")}</p><h1 className="mt-2 font-serif text-4xl font-bold leading-tight sm:text-6xl">{lesson.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50">{lesson.summary}</p></div>
            <div className="grid place-items-center rounded-3xl bg-white/10 p-6 text-center ring-1 ring-white/15"><span className="text-sm font-bold text-amber-200">BUGÜNKÜ HEDEF</span><b className="my-4 font-serif text-6xl">{lesson.day<5?"28":lesson.day<17?"12":"8"}</b><span className="text-sm text-emerald-100">sesli tekrar</span></div>
          </div>
        </div>

        {lesson.mode!=="practice_only" && <Alert severity="info" icon={false} className="!rounded-2xl !bg-sky-50 !px-5 !py-3 !text-base !font-semibold !text-sky-950">👂 {lesson.instruction}</Alert>}

        {lesson.mode!=="practice_only" && <article className="rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-4xl"><p className="text-xs font-black tracking-[.18em] text-orange-700">AYRINTILI TEORİ</p><h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Konuyu anlayalım</h2><p className="mt-3 text-sm leading-6 text-emerald-900/55">Bu bölüm güvenilir öğretim kaynakları esas alınarak özgün biçimde hazırlanmış bir açıklamadır; kaynak metinlerden doğrudan uzun alıntı yapılmamıştır.</p></div>
          <div className="mt-7 grid gap-x-9 gap-y-5 xl:grid-cols-2">{theory.map((paragraph,index)=><div key={index} className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-sm font-black text-emerald-800">{index+1}</span><p className="text-[16px] leading-8 text-emerald-950/80">{paragraph}</p></div>)}</div>
          <div className="mt-8 border-t border-emerald-900/10 pt-4"><p className="text-[11px] font-black uppercase tracking-wider text-emerald-900/50">Kaynakça</p><div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">{sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:text-orange-700">{source.publisher}: {source.title}</a>)}</div></div>
        </article>}

        {lesson.mode!=="practice_only" && <div className="space-y-5">
          <div className="rounded-3xl bg-[#f1dfc7] p-5 sm:p-7"><div className="flex flex-wrap items-end justify-between gap-2"><div><p className="text-xs font-black tracking-[.16em] text-orange-800">AKLINDA KALSIN</p><h2 className="mt-1 font-serif text-2xl font-bold sm:text-3xl">Derse başlamadan önce</h2></div><span className="rounded-full bg-white/70 px-4 py-2 text-xs font-extrabold text-orange-800">{lesson.points.length} önemli ipucu</span></div><ul className="mt-5 grid gap-3 md:grid-cols-3">{lesson.points.map((point,index)=><li key={point} className="flex min-h-24 gap-4 rounded-2xl bg-white/70 p-5 text-base font-semibold leading-7 ring-1 ring-orange-900/5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-sm font-black text-orange-700 shadow-sm">{index+1}</span><span>{point}</span></li>)}</ul></div>
          <div className="rounded-3xl border border-emerald-900/10 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-black tracking-[.18em] text-orange-700">DİNLE VE TEKRAR ET</p><h2 className="mt-1 font-serif text-3xl font-bold">Ders çalışması</h2></div><VolumeUpRounded className="text-emerald-700" fontSize="large"/></div>
            {lesson.mode==="letters" && <div dir="rtl" className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${lesson.day===3?"xl:grid-cols-3":"xl:grid-cols-4"}`}>{letters.map(letter=><Card key={letter.id} elevation={selectedLetter.id===letter.id?5:0} className={`!rounded-2xl ring-2 ${selectedLetter.id===letter.id?"ring-orange-400":"ring-emerald-900/10"}`}><CardActionArea onClick={()=>selectLetter(letter)} className="!h-full !p-4 !text-center"><span dir="rtl" className="arabic-learning block text-7xl leading-none text-emerald-800">{letter.arabic}</span><b className="mt-2 block text-base">{letter.name}</b>{lesson.day===3&&<span className="mt-4 grid grid-cols-2 gap-2 border-t border-emerald-900/10 pt-4">{forms(letter).map((form,index)=><span key={index} className="rounded-xl bg-emerald-50/70 px-1 py-2"><small className="block text-[11px] font-extrabold text-emerald-900/55">{["Yalın","Başta","Ortada","Sonda"][index]}</small><span dir="rtl" className="arabic-learning mt-1 block text-3xl leading-none text-emerald-900">{form}</span></span>)}</span>}<small className="mt-3 block font-bold text-orange-700">{lesson.day===3?"Büyüt ve dinle":"▶ Dinle"}</small></CardActionArea></Card>)}</div>}
            {lesson.mode==="makhraj" && lesson.day!==4 && <div className="space-y-4">{makhrajGroups.map(group=><div key={group.title} className="rounded-2xl bg-stone-50 p-4 ring-1 ring-stone-200"><div className="mb-3"><b className="text-lg">{group.title}</b><p className="text-sm text-emerald-900/60">{group.subtitle}</p></div><div className="flex flex-wrap gap-2">{group.ids.map(id=>{const letter=letters.find(item=>item.id===id);return letter?<Button key={id} onClick={()=>playLetter(letter)} startIcon={<VolumeUpRounded/>} variant="outlined" sx={{borderRadius:3,borderColor:"#9bb8af",color:"#174f47",fontSize:"1.35rem",fontFamily:"serif",fontWeight:700}}>{letter.arabic}</Button>:null})}</div></div>)}</div>}
            {lesson.day===4 && <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-3">{[{no:"1",title:"Dinle",text:"Harfe dokun ve sesi dikkatle dinle."},{no:"2",title:"Fark et",text:"İnce, kalın veya peltek oluşuna bak."},{no:"3",title:"Tekrar et",text:"Aynı sesi tane tane üç kez söyle."}].map(step=><div key={step.no} className="flex gap-3 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-800 text-sm font-black text-white">{step.no}</span><div><b className="block text-sm">{step.title}</b><p className="mt-1 text-xs leading-5 text-emerald-900/60">{step.text}</p></div></div>)}</div>
              <div className="grid gap-4 lg:grid-cols-3">{soundGroups.map(group=><section key={group.title} className={`rounded-3xl p-5 ring-1 ${group.shell}`}><div className="flex items-start justify-between gap-3"><div><h3 className={`font-serif text-2xl font-bold ${group.text}`}>{group.title}</h3><p className="mt-1 text-sm leading-6 text-emerald-950/60">{group.subtitle}</p></div><span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black text-white ${group.accent}`}>{group.badge}</span></div><div className="mt-5 grid grid-cols-3 gap-2">{group.ids.map(id=>{const letter=letters.find(item=>item.id===id);return letter?<button key={id} onClick={()=>playLetter(letter)} aria-label={`${letter.name} harfini dinle`} className={`group rounded-2xl bg-white px-2 py-3 text-center shadow-sm ring-2 transition hover:-translate-y-1 hover:shadow-md ${selectedLetter.id===letter.id?"ring-orange-400":"ring-white"}`}><span dir="rtl" className={`arabic-learning block text-5xl leading-none ${group.text}`}>{letter.arabic}</span><span className="mt-2 block text-xs font-extrabold text-emerald-950/65">{letter.name}</span><VolumeUpRounded className={`mt-1 !text-base ${group.text}`}/></button>:null})}</div></section>)}</div>
              <section className="rounded-3xl bg-[#183f3a] p-5 text-white sm:p-6"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black tracking-[.16em] text-amber-200">DUY VE KARŞILAŞTIR</p><h3 className="mt-1 font-serif text-3xl font-bold">İnce mi, kalın mı?</h3></div><p className="max-w-sm text-sm leading-6 text-emerald-100">İki harfi sırayla dinle. Ağız içindeki ses renginin nasıl değiştiğini fark et.</p></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{contrastPairs.map(pair=>{const thin=letters.find(item=>item.id===pair.thin)!;const thick=letters.find(item=>item.id===pair.thick)!;return <div key={pair.label} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15"><p className="text-center text-xs font-bold text-emerald-100">{pair.label}</p><div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2"><button onClick={()=>playLetter(thin)} className="rounded-2xl bg-sky-100 p-3 text-sky-900"><span dir="rtl" className="arabic-learning block text-6xl leading-none">{thin.arabic}</span><small className="mt-2 block font-extrabold">{thin.name} · Dinle</small></button><span className="text-xs font-black text-amber-200">SONRA</span><button onClick={()=>playLetter(thick)} className="rounded-2xl bg-orange-100 p-3 text-orange-900"><span dir="rtl" className="arabic-learning block text-6xl leading-none">{thick.arabic}</span><small className="mt-2 block font-extrabold">{thick.name} · Dinle</small></button></div></div>})}</div></section>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5"><b className="text-violet-900">Peltek okuma ipucu</b><p className="mt-2 text-sm leading-6 text-violet-950/70">ث · ذ · ظ harflerinde dil ucunu üst ön dişlere hafifçe yaklaştır. ظ aynı zamanda kalın okunur. Dili zorlamadan sesi dinle ve taklit et.</p></div>
            </div>}
            {lesson.mode==="reading" && <div className="grid gap-3 sm:grid-cols-2">{lesson.examples.map((example,index)=><button key={index} onClick={()=>playLessonAudio("ornek",index,example)} className="group flex min-h-32 items-center justify-between rounded-2xl border-2 border-emerald-900/10 bg-[#fffcf7] px-5 text-right transition hover:border-orange-400 hover:shadow-md"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-800 text-white group-hover:bg-orange-600">▶</span><span dir="rtl" className="font-serif text-4xl leading-relaxed text-emerald-950">{example}</span></button>)}</div>}
            {lesson.mode==="letters_with_vowel" && <div dir="rtl" className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">{lesson.examples.map((example,index)=><Card key={index} elevation={0} className="!rounded-2xl ring-2 ring-emerald-900/10 transition hover:border-orange-400 hover:shadow-md"><CardActionArea onClick={()=>playLessonAudio("harf",index,example)} className="!h-full !p-4 !text-center"><span dir="rtl" className="arabic-learning block text-7xl leading-none text-emerald-800">{example}</span><small className="mt-3 block font-bold text-orange-700">▶ Dinle</small></CardActionArea></Card>)}</div>}
          </div>
        </div>}

        {lesson.day !== 1 && lesson.practice.length > 0 && (
          <div className="rounded-3xl border border-orange-200 bg-orange-50 p-5 sm:p-7">
            <p className="text-xs font-black tracking-[.18em] text-orange-700">BOL PRATİK</p>
            <h2 className="mt-2 font-serif text-3xl font-bold">Şimdi sıra sende</h2>
            <p className="mt-2 text-emerald-900/65">Kartlara dokun, dinle ve aynı örneği üç defa sesli oku.</p>
            <div dir="rtl" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {lesson.practice.map((word,index)=>
                <Card key={index} elevation={0} className="group relative !rounded-2xl ring-1 ring-orange-900/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:ring-orange-400 active:scale-95">
                  <span className="pointer-events-none absolute right-2 top-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-orange-600 text-[11px] font-black text-white shadow-sm">{index+1}</span>
                  <CardActionArea onClick={()=>playLessonAudio("pratik",index,word)} className="!flex !min-h-[132px] !flex-col !items-center !justify-center !gap-2 !p-4 !text-center sm:!min-h-[152px]">
                    <span dir="rtl" className="arabic-learning block w-full break-words text-center leading-snug text-emerald-950 text-4xl sm:text-5xl">{word}</span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-orange-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">▶ Dinle</span>
                  </CardActionArea>
                </Card>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-emerald-900/10 sm:grid-cols-3">
          <div className="flex justify-center sm:justify-start">{previous&&<Button component={Link} href={`/${previous.slug}`} startIcon={<ArrowBackRounded/>} sx={{color:"#174f47",fontWeight:700}}>Önceki gün</Button>}</div>
          <div className="flex justify-center"><Button onClick={finishLesson} variant="contained" endIcon={<CheckCircleRounded/>} sx={{borderRadius:3,bgcolor:"#174f47",px:3,py:1.4,fontWeight:800,"&:hover":{bgcolor:"#0f3f38"}}}>{completed.includes(lesson.day)?"Ders tamamlandı":next?"Dersi tamamla":"Programı tamamla"}</Button></div>
          <div className="flex justify-center sm:justify-end">{next&&<Button component={Link} href={`/${next.slug}`} endIcon={<ArrowForwardRounded/>} sx={{color:"#c26732",fontWeight:800}}>Sonraki gün</Button>}</div>
        </div>
      </section>
    </div>
  </main>;
}
