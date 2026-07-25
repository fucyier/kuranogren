"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import HomeRounded from "@mui/icons-material/HomeRounded";
import LocalFireDepartmentRounded from "@mui/icons-material/LocalFireDepartmentRounded";
import { computeStreak } from "@/src/lib/progress";

export default function AcademyHeader({
  title,
  activeLesson,
}: {
  title: string;
  activeLesson?: string;
}) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    try {
      setStreak(computeStreak());
    } catch {}
  }, []);

  return (
    <header
      className="academy-header sticky top-0 z-40 border-b border-[#183f3a]/10 bg-white/90 backdrop-blur-xl transition-all"
      style={{ height: "auto", maxWidth: "none", margin: 0, padding: 0, display: "block" }}
    >
      <div className="mx-auto flex min-h-20 w-full max-w-[1500px] items-center justify-between px-4 py-2.5 sm:px-7">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-base font-black text-[#183f3a] transition hover:opacity-80 sm:text-lg"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#244a70] text-[#f6cf88] shadow-sm sm:h-11 sm:w-11">
            <HomeRounded />
          </span>
          <span className="hidden sm:inline">Anasayfa</span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-center px-2">
          <div className="flex max-w-full items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 shadow-sm ring-1 ring-blue-900/10 sm:px-5 sm:py-2">
            <span className="truncate text-xs font-black text-[#244a70] sm:text-sm md:text-base">
              {title}
            </span>
            {activeLesson && (
              <>
                <span className="text-xs font-bold text-[#244a70]/30 sm:text-sm">/</span>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#17594f] px-2.5 py-0.5 text-xs font-extrabold text-white shadow-sm sm:px-3.5 sm:py-1 sm:text-sm">
                  <span className="text-[#f6cf88]">✦</span>
                  <span className="truncate max-w-[130px] sm:max-w-[200px] md:max-w-[320px] lg:max-w-none">
                    {activeLesson}
                  </span>
                </span>
              </>
            )}
          </div>
        </div>

        <Link
          href="/basarilar"
          aria-label="Aktivite ve Başarılarım"
          className="flex h-[42px] min-w-[42px] shrink-0 items-center justify-center gap-1 rounded-full bg-[#e8c898] px-2.5 font-black text-[#17594f] shadow-sm transition-all hover:scale-105 hover:bg-[#dfb983] active:scale-95 sm:px-3.5"
        >
          <LocalFireDepartmentRounded sx={{ color: "#c2410c", fontSize: 24 }} />
          {streak > 0 && (
            <span className="pr-1 text-sm font-extrabold sm:text-base">{streak}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
