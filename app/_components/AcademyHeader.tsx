import Link from "next/link";
import HomeRounded from "@mui/icons-material/HomeRounded";

export default function AcademyHeader({title}:{title:string}) {
  return <header
    className="academy-header sticky top-0 z-40 border-b border-[#183f3a]/10 bg-white/90 backdrop-blur-xl"
    style={{height:"auto",maxWidth:"none",margin:0,padding:0,display:"block"}}
  >
    <div className="relative min-h-20 w-full px-4 sm:px-8">
      <Link href="/" className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-3 text-base font-black text-[#183f3a] sm:left-8 sm:text-lg">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#244a70] text-[#f6cf88]"><HomeRounded/></span>
        <span className="hidden sm:inline">Anasayfa</span>
      </Link>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-blue-50 px-4 py-2 text-center text-sm font-black text-[#244a70] sm:px-6 sm:text-base">{title}</div>
    </div>
  </header>;
}
