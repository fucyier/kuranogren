"use client";
import Link from "next/link";
import { Card, CardActionArea, Paper } from "@mui/material";
import KeyboardArrowRightRounded from "@mui/icons-material/KeyboardArrowRightRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import { namazSureleri } from "@/src/data/namaz-sureleri";

export default function TefsirClient() {
  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#183f3a]">
      <AcademyHeader title="Tefsir" />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <Paper elevation={0} className="!rounded-[2rem] !bg-[#244a70] !p-7 !text-white sm:!p-10">
          <p className="text-sm font-black tracking-[.18em] text-[#f6cf88]">FÂTİHA’DAN NÂS’A TEFSİR</p>
          <h1 className="mt-3 max-w-2xl font-serif text-5xl font-bold leading-tight sm:text-6xl">Sûrenin mesajını bütün olarak oku.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Her sûrenin iniş sebebini, ayet ayet anlam katmanlarını ve günlük hayattan bir bağlantı notunu tek sayfada
            oku. Ayet ayet dinleyip pratik yapmak istersen Namaz Sureleri bölümüne geçebilirsin.
          </p>
        </Paper>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {namazSureleri.map((sure, index) => (
            <Card key={sure.slug} elevation={0} className="!rounded-3xl !bg-white ring-1 ring-blue-950/10 transition hover:-translate-y-1 hover:shadow-xl">
              <CardActionArea component={Link} href={`/tefsir/${sure.slug}`} className="!min-h-56 !p-6">
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 font-black text-[#244a70]">{String(index + 1).padStart(2, "0")}</span>
                    <span dir="rtl" className="font-serif text-3xl text-[#244a70]">
                      {sure.arabicName}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-bold leading-tight">{sure.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#b65f38]">{sure.theme}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#183f3a]/60">{sure.context[0]}</p>
                  <span className="mt-auto flex items-center gap-1 pt-6 text-sm font-extrabold text-[#b65f38]">
                    <MenuBookRounded fontSize="small" /> Tefsiri oku <KeyboardArrowRightRounded fontSize="small" />
                  </span>
                </div>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
