import { mkdir, stat } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { elifbaLessons } from "../src/data/elifba-lessons.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const python = "C:\\Users\\caner\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";
const jobs = [];

for (const lesson of elifbaLessons) {
  const folder = path.join(root, "public", "audio", "elifba", "dersler", `gun-${String(lesson.day).padStart(2, "0")}`);
  await mkdir(folder, { recursive: true });
  const teachingText = text => lesson.day === 24 ? text.replaceAll("ًا", "َنْ") : lesson.day === 25 ? text.replaceAll("ٍ", "ِنْ") : lesson.day === 26 ? text.replaceAll("ٌ", "ُنْ") : text;
  for (const [index, text] of lesson.examples.entries()) jobs.push({ text:teachingText(text), force:lesson.day>=24&&lesson.day<=26, output: path.join(folder, `ornek-${String(index + 1).padStart(2, "0")}.mp3`) });
  for (const [index, text] of lesson.practice.entries()) jobs.push({ text:teachingText(text), force:lesson.day>=24&&lesson.day<=26, output: path.join(folder, `pratik-${String(index + 1).padStart(2, "0")}.mp3`) });
}

async function exists(file) {
  try { return (await stat(file)).size > 1000; } catch { return false; }
}

async function generate(job) {
  if (!job.force && await exists(job.output)) return;
  await new Promise((resolve, reject) => {
    const child = spawn(python, ["-m", "edge_tts", "--voice", "ar-SA-HamedNeural", "--rate=-20%", "--text", job.text, "--write-media", job.output], { stdio: "ignore" });
    child.on("error", reject);
    child.on("exit", code => code === 0 ? resolve() : reject(new Error(`Audio generation failed with ${code}`)));
  });
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
