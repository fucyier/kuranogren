"use client";
import Link from "next/link";
import { Button, Chip, Paper } from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import HeadphonesRounded from "@mui/icons-material/HeadphonesRounded";
import AcademyHeader from "@/app/_components/AcademyHeader";
import { namazSureleri, sureSourceUrl, type NamazSuresi } from "@/src/data/namaz-sureleri";
import type { TefsirNote } from "@/src/data/tefsir-notes";

export default function SureTefsiriClient({ sure, note }: { sure: NamazSuresi; note?: TefsirNote }) {
  const index = namazSureleri.findIndex((item) => item.slug === sure.slug);
  const previous = namazSureleri[index - 1];
  const next = namazSureleri[index + 1];

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#183f3a]">
      <AcademyHeader title="Namaz Sureleri Tefsiri" />
      <section className="mx-auto max-w-4xl space-y-6 px-5 py-8 sm:px-8">
        <Link href="/tefsir" className="inline-flex items-center gap-2 font-extrabold text-[#244a70]">
          <ArrowBackRounded /> Tefsir listesi
        </Link>

        <Paper elevation={0} className="!rounded-[2rem] !bg-[#244a70] !p-7 !text-white sm:!p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Chip label={sure.period} className="!bg-[#f6cf88] !font-black !text-blue-950" />
            <span dir="rtl" className="font-serif text-5xl text-[#f6cf88]">
              {sure.arabicName}
            </span>
          </div>
          <h1 className="mt-5 font-serif text-5xl font-bold sm:text-6xl">{sure.name} Tefsiri</h1>
          <p className="mt-3 text-lg text-blue-100">{sure.theme}</p>
        </Paper>

        {note && (
          <Paper elevation={0} className="!rounded-3xl !bg-[#fff7e8] !p-6 ring-1 ring-amber-200 sm:!p-8">
            <p className="text-xs font-black tracking-[.18em] text-amber-800">İNİŞ SEBEBİ</p>
            <p className="mt-2 text-[16px] leading-8 text-amber-950/80">{note.nuzulNotu}</p>
          </Paper>
        )}

        <Paper component="article" elevation={0} className="!rounded-3xl !p-7 ring-1 ring-blue-950/10 sm:!p-9">
          <p className="text-xs font-black tracking-[.18em] text-[#b65f38]">SÛRENİN BAĞLAMI</p>
          <h2 className="mt-2 font-serif text-3xl font-bold">Genel çerçeve</h2>
          <div className="mt-6 space-y-5">
            {sure.context.map((paragraph) => (
              <p key={paragraph} className="text-[16px] leading-8 text-blue-950/75">
                {paragraph}
              </p>
            ))}
          </div>
        </Paper>

        <Paper component="article" elevation={0} className="!rounded-3xl !p-7 ring-1 ring-blue-950/10 sm:!p-9">
          <p className="text-xs font-black tracking-[.18em] text-[#b65f38]">AYET AYET TEFSİR</p>
          <h2 className="mt-2 font-serif text-3xl font-bold">Anlam katmanları</h2>
          <div className="mt-7 space-y-7">
            {sure.ayahs.map((ayah) => (
              <div key={ayah.number} className="grid gap-4 sm:grid-cols-[48px_1fr]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 font-black text-[#244a70]">{ayah.number}</span>
                <div>
                  <p dir="rtl" className="font-serif text-3xl leading-[1.9] text-[#173f3a]">
                    {ayah.arabic}
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#b65f38]">{ayah.shortMeaning}</p>
                  <p className="mt-2 text-[15px] leading-7 text-blue-950/75">{ayah.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </Paper>

        {note && (
          <Paper elevation={0} className="!rounded-3xl !bg-emerald-50 !p-6 ring-1 ring-emerald-200 sm:!p-8">
            <p className="text-xs font-black tracking-[.18em] text-emerald-800">GÜNLÜK HAYATTAN BAĞLANTI</p>
            <p className="mt-2 text-[16px] leading-8 text-emerald-950/80">{note.gunlukHayat}</p>
          </Paper>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Paper elevation={0} className="!rounded-3xl !p-6 ring-1 ring-blue-950/10">
            <Button component={Link} href={`/namaz-sureleri/${sure.slug}`} startIcon={<HeadphonesRounded />} fullWidth variant="contained" sx={{ borderRadius: 3, bgcolor: "#244a70", fontWeight: 800, py: 1.3 }}>
              Ayet ayet dinle ve pratik yap
            </Button>
          </Paper>
          <Paper elevation={0} className="!rounded-3xl !p-6 ring-1 ring-blue-950/10">
            <p className="text-[11px] font-black uppercase tracking-wider text-blue-950/45">Kaynakça</p>
            <a href={sureSourceUrl(sure)} target="_blank" rel="noreferrer" className="mt-2 block text-xs font-bold leading-5 text-[#244a70] underline decoration-blue-200 underline-offset-4">
              Diyanet İşleri Başkanlığı
              <br />
              <span className="font-medium">Kur’an Yolu · {sure.name} tefsiri</span>
            </a>
          </Paper>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-5 ring-1 ring-blue-950/10">
          <div>{previous && <Button component={Link} href={`/tefsir/${previous.slug}`} startIcon={<ArrowBackRounded />} sx={{ color: "#244a70", fontWeight: 800 }}>Önceki sûre</Button>}</div>
          <div>{next && <Button component={Link} href={`/tefsir/${next.slug}`} endIcon={<ArrowForwardRounded />} sx={{ color: "#b65f38", fontWeight: 800 }}>Sonraki sûre</Button>}</div>
        </div>
      </section>
    </main>
  );
}
