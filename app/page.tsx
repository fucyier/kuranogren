"use client";

import { useEffect, useState } from "react";
import "./home.css";

function readCompletedLessons(key: string) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(saved) ? saved.length : 0;
  } catch {
    return 0;
  }
}

export default function Home() {
  const [elifbaCompleted, setElifbaCompleted] = useState(0);
  const [tecvidCompleted, setTecvidCompleted] = useState(0);

  useEffect(() => {
    setElifbaCompleted(readCompletedLessons("elifba-30-progress"));
    setTecvidCompleted(readCompletedLessons("tecvid-10-progress"));
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
          <a href="#ilerleme">İlerlemem</a>
        </nav>
        <button className="user" aria-label="Profil">N</button>
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

      <footer className="home-footer">
        <a className="brand" href="#ana"><span>ق</span><b>Kur&apos;an Öğren</b></a>
        <p>Her gün biraz daha yakın.</p>
        <div><a href="/elifba">Elifba Dersi</a><a href="/tecvid">Tecvid Dersi</a><a href="/namaz-sureleri">Namaz Sureleri</a></div>
      </footer>
    </main>
  );
}
