import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EdgeTTS } from "node-edge-tts";
import { elifbaLessons } from "../src/data/elifba-lessons.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const onlyDay = process.argv[2] ? Number(process.argv[2]) : null;
const jobs = [];

// Mukattaa harflerinin tam adları: TTS izole harf+med işaretini seslendiremediği
// için harfin adını gerçek bir kelime gibi yazıyoruz. "نقص عسلكم" harflerinin
// (ن ق ص ع س ل ك م) adında med harfi + sakin harf olduğundan doğal olarak uzun
// okunur; "حي طهر" harfleri (ح ي ط ه ر) kısa med ile, elif ise hiç uzatmadan okunur.
const MUKATTAA_NAMES = {
  "ا": "أَلِف",
  "ح": "حَا",
  "ي": "يَا",
  "ط": "طَا",
  "ه": "هَا",
  "ر": "رَا",
  "ن": "نُون",
  "ق": "قَاف",
  "ص": "صَاد",
  "ع": "عَيْن",
  "س": "سِين",
  "ل": "لَام",
  "ك": "كَاف",
  "م": "مِيم",
};

// Gün 29: vakf işaretli (ۙ) kelimelerde durakta son harekeyi düşür,
// mukattaa harflerini (medli/üstü elif işaretli) adlarıyla tek tek okut.
function prepareVakfMukattaa(text) {
  const stopped = text.replace(/[ً-ْ]ۙ$/u, "");
  if (stopped !== text) return stopped;
  if (/[ٰٓ]/u.test(text)) {
    const bases = text.match(/[ء-ي]/gu) || [];
    return bases.map(ch => MUKATTAA_NAMES[ch] || ch).join("، ");
  }
  return text;
}

const forceAll = process.env.FORCE_REGEN === "1";

for (const lesson of elifbaLessons) {
  if (onlyDay && lesson.day !== onlyDay) continue;
  const folder = path.join(root, "public", "audio", "elifba", "dersler", `gun-${String(lesson.day).padStart(2, "0")}`);
  await mkdir(folder, { recursive: true });
  const teachingText = text => lesson.day === 24 ? text.replaceAll("ًا", "َنْ") : lesson.day === 25 ? text.replaceAll("ٍ", "ِنْ") : lesson.day === 26 ? text.replaceAll("ٌ", "ُنْ") : lesson.day === 29 ? prepareVakfMukattaa(text) : text;
  const forceFor = text => (lesson.day>=24&&lesson.day<=26) || (lesson.day===29 && /[ٰٓ]/u.test(text));
  // UI'de sadece kullanılan sesler üretilir: "letters_with_vowel" modunda örnekler
  // "harf-XX" olarak, "reading" modunda "ornek-XX" olarak çalınır.
  if (lesson.mode === "letters_with_vowel") {
    for (const [index, text] of lesson.examples.entries()) jobs.push({ text:teachingText(text), force:forceFor(text), output: path.join(folder, `harf-${String(index + 1).padStart(2, "0")}.mp3`) });
  } else if (lesson.mode === "reading") {
    for (const [index, text] of lesson.examples.entries()) jobs.push({ text:teachingText(text), force:forceFor(text), output: path.join(folder, `ornek-${String(index + 1).padStart(2, "0")}.mp3`) });
  }
  if (lesson.day !== 1) {
    for (const [index, text] of lesson.practice.entries()) jobs.push({ text:teachingText(text), force:forceFor(text), output: path.join(folder, `pratik-${String(index + 1).padStart(2, "0")}.mp3`) });
  }
}

async function exists(file) {
  try { return (await stat(file)).size > 1000; } catch { return false; }
}

async function generate(job) {
  if (!forceAll && !job.force && await exists(job.output)) return;
  const tts = new EdgeTTS({ voice: "ar-SA-ZariyahNeural", lang: "ar-SA", rate: "-20%" });
  await tts.ttsPromise(job.text, job.output);
}

let cursor = 0;
async function worker() {
  while (cursor < jobs.length) {
    const job = jobs[cursor++];
    await generate(job);
  }
}

await Promise.all(Array.from({ length: 4 }, () => worker()));
console.log(`${jobs.length} ders sesi hazır.`);
