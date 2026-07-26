// Tecvid derslerinin seslendirmesi.
// Okunacak metin tecvid kurallarına göre üretilir (bkz. tecvid-tajweed.mjs),
// böylece ses, kartta yazan latin okunuşla birebir aynı olur.
//
// Kullanım:
//   node scripts/generate-tecvid-audio.mjs           -> eksik olanları üretir
//   node scripts/generate-tecvid-audio.mjs --force   -> hepsini yeniden üretir
//   node scripts/generate-tecvid-audio.mjs tecvid-ihfa --force -> tek dersi yeniler

import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EdgeTTS } from "node-edge-tts";
import { tecvidLessons } from "../src/data/tecvid-lessons.ts";
import { sampleTts } from "./tecvid-tajweed.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const force = args.includes("--force");
const onlySlug = args.find(arg => !arg.startsWith("--")) ?? null;

const VOICE = "ar-SA-HamedNeural";
const RATE = "-35%";
const jobs = [];

for (const lesson of tecvidLessons) {
  if (onlySlug && lesson.slug !== onlySlug) continue;
  const folder = path.join(root, "public", "audio", "tecvid", lesson.slug);
  await mkdir(folder, { recursive: true });
  for (const sample of [...lesson.examples, ...lesson.practice]) {
    jobs.push({ text: sampleTts(sample), output: path.join(folder, `${sample.id}.mp3`) });
  }
}

async function isReady(file) {
  try { return (await stat(file)).size > 1000; } catch { return false; }
}

async function generate(job) {
  if (!force && await isReady(job.output)) return false;
  const tts = new EdgeTTS({ voice: VOICE, lang: "ar-SA", rate: RATE, pitch: "-2Hz" });
  await tts.ttsPromise(job.text, job.output);
  if (!await isReady(job.output)) throw new Error(`Geçersiz ses dosyası: ${job.output}`);
  return true;
}

let cursor = 0;
let written = 0;
async function worker() {
  while (cursor < jobs.length) {
    const job = jobs[cursor++];
    if (await generate(job)) written++;
  }
}

await Promise.all(Array.from({ length: 6 }, () => worker()));
console.log(`${jobs.length} kayıt tarandı, ${written} ses dosyası yazıldı.`);
