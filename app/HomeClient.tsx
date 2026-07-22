"use client";

import { useEffect, useState } from "react";
import "./home.css";
import { computeStreak } from "@/src/lib/progress";

function readCompletedLessons(key: string) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(saved) ? saved.length : 0;
  } catch {
    return 0;
  }
}

const toolLinks = [
  { href: "/pratik", title: "Pratik Testleri", desc: "Harf, tecvid ve sure bilgini çoktan seçmeli sorularla ölç.", icon: "✅" },
  { href: "/tekrar", title: "Tekrar Zamanı", desc: "Aralıklı tekrarla öğrendiklerini unutma.", icon: "🔁" },
  { href: "/yazi-pratigi", title: "Yazı Pratiği", desc: "Harfleri parmağınla veya fareyle iz sürerek yaz.", icon: "✍️" },
  { href: "/mahrec-haritasi", title: "Mahreç Haritası", desc: "Harflerin ağızda çıktığı yeri interaktif haritada gör.", icon: "🗺️" },
  { href: "/tefsir", title: "Tefsir", desc: "Namaz surelerinin iniş sebebini ve günlük hayat bağlantısını oku.", icon: "📖" },
  { href: "/basarilar", title: "Başarılarım", desc: "Günlük serini ve kazandığın rozetleri gör.", icon: "🏆" },
];

export default function HomeClient() {
  const [elifbaCompleted, setElifbaCompleted] = useState(0);
  const [tecvidCompleted, setTecvidCompleted] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setElifbaCompleted(readCompletedLessons("elifba-30-progress"));
    setTecvidCompleted(readCompletedLessons("tecvid-10-progress"));
    setStreak(computeStreak());
  }, []);

  const elifbaProgress = Math.round((elifbaCompleted / 30) * 100);
  const tecvidProgress = Math.round((tecvidCompleted / 10) * 100);

  return (
    <main>
      <header>
        <a className="brand" href="#ana"><span>ق</span><b>Kur&apos;an Öğren</b></a>
        <nav>
          <a href="/elifba">Elifba Dersi</a>
          <a href="/tecvid">Tecvid Dersi</a>
          <a href="/namaz-sureleri">Namaz Sureleri</a>
          <a href="/pratik">Pratik</a>
          <a href="#ilerleme">İlerlemem</a>
        </nav>
        <a className="user" aria-label="Başarılarım" href="/basarilar" style={{display:"grid",placeItems:"center",textDecoration:"none"}}>{streak>0?`🔥${streak}`:"N"}</a>
      </header>

      <section className="hero" id="ana">
        <div className="hero-copy">
          <span className="eyebrow">KUR&apos;AN YOLCULUĞUN BAŞLIYOR</span>
          <h1>Oku, dinle,<br/><em>kalbine yerleştir.</em></h1>
          <p>Elifba&apos;dan tecvide; adım adım, doğru telaffuzla ve kendi hızında öğren.</p>
          <div className="actions">
            <a className="primary" href="/elifba">Elifba Dersi <b>→</b></a>
            <a className="text-btn course-link" href="/tecvid">Tecvid Dersi <b>→</b></a>
          </div>
          <div className="hero-stats">
            <b>30</b><span>Elifba dersi</span><i></i><b>10</b><span>Tecvid dersi seni bekliyor</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="ornament">۞</div>
          <div className="arch"><span>اقْرَأْ</span><small>Rabb&apos;inin adıyla oku</small></div>
          <div className="leaf l1">❋</div><div className="leaf l2">✦</div>
        </div>
      </section>

      <section className="dashboard" id="ilerleme">
        <div className="dashboard-title">
          <span>ÖĞRENME İLERLEMEN</span>
          <strong>Kaldığın yerden devam et.</strong>
        </div>
        <div className="lesson-progress">
          <div className="ring" style={{"--p": `${elifbaProgress}%`} as React.CSSProperties}><b>{elifbaProgress}%</b></div>
          <p><b>{elifbaCompleted} / 30 ders tamamlandı</b><br/><small>Elifba Programı</small></p>
          <a href="/elifba">Devam et →</a>
        </div>
        <div className="lesson-progress tecvid-progress">
          <div className="ring" style={{"--p": `${tecvidProgress}%`} as React.CSSProperties}><b>{tecvidProgress}%</b></div>
          <p><b>{tecvidCompleted} / 10 ders tamamlandı</b><br/><small>Tecvid Programı</small></p>
          <a href="/tecvid">Devam et →</a>
        </div>
      </section>

      <section className="tools-panel" id="araclar">
        <div className="dashboard-title">
          <span>YENİ ARAÇLAR</span>
          <strong>Öğrendiğini pekiştirecek ekranlar.</strong>
        </div>
        <div className="tools-grid">
          {toolLinks.map((tool) => (
            <a key={tool.href} href={tool.href}>
              <span className="tool-icon">{tool.icon}</span>
              <b>{tool.title}</b>
              <small>{tool.desc}</small>
            </a>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <a className="brand" href="#ana"><span>ق</span><b>Kur&apos;an Öğren</b></a>
        <p>Her gün biraz daha yakın.</p>
        <div><a href="/elifba">Elifba Dersi</a><a href="/tecvid">Tecvid Dersi</a><a href="/namaz-sureleri">Namaz Sureleri</a><a href="/pratik">Pratik</a><a href="/tekrar">Tekrar Zamanı</a><a href="/basarilar">Başarılarım</a></div>
      </footer>
    </main>
  );
}
