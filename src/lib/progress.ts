// Paylaşılan ilerleme/istatistik yardımcıları. Mevcut üç anahtar (elifba-30-progress,
// tecvid-10-progress, namaz-sureleri-progress) buradan da okunur ama biçimleri değiştirilmez;
// yeni özellikler kendi anahtarlarını kullanır.

export const KEYS = {
  elifba: "elifba-30-progress",
  tecvid: "tecvid-10-progress",
  namaz: "namaz-sureleri-progress",
  activity: "activity-log",
  quiz: "quiz-results",
  srs: "srs-state",
  yazi: "yazi-pratigi-progress",
} as const;

export function readArray<T>(key: string): T[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function writeArray(key: string, value: unknown[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function readObject<T extends Record<string, unknown>>(key: string): T {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? (value as T) : ({} as T);
  } catch {
    return {} as T;
  }
}

export function writeObject(key: string, value: Record<string, unknown>) {
  localStorage.setItem(key, JSON.stringify(value));
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

// --- Günlük seri (streak) ---------------------------------------------------

export function logActivity() {
  const log = readArray<string>(KEYS.activity);
  const today = todayKey();
  if (!log.includes(today)) writeArray(KEYS.activity, [...log, today].sort());
}

export function computeStreak(): number {
  const log = new Set(readArray<string>(KEYS.activity));
  if (log.size === 0) return 0;
  const cursor = new Date();
  if (!log.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (log.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function studiedToday(): boolean {
  return readArray<string>(KEYS.activity).includes(todayKey());
}

// --- Rozetler ----------------------------------------------------------------

export type Badge = { id: string; title: string; description: string; earned: boolean };

export type QuizResult = { konu: string; date: string; score: number; total: number };

export function computeBadges(): Badge[] {
  const elifba = readArray<number>(KEYS.elifba);
  const tecvid = readArray<number>(KEYS.tecvid);
  const namaz = readArray<string>(KEYS.namaz);
  const yazi = readArray<string>(KEYS.yazi);
  const quiz = readArray<QuizResult>(KEYS.quiz);
  const streak = computeStreak();

  return [
    { id: "ilk-adim", title: "İlk Adım", description: "İlk dersini tamamladın.", earned: elifba.length + tecvid.length + namaz.length > 0 },
    { id: "bir-hafta", title: "Bir Hafta Kararlılık", description: "7 gün üst üste çalıştın.", earned: streak >= 7 },
    { id: "harf-ustasi", title: "Harf Ustası", description: "30 günlük Elifba programını tamamladın.", earned: elifba.length >= 30 },
    { id: "tecvid-ustasi", title: "Tecvid Ustası", description: "10 derslik Tecvid programını tamamladın.", earned: tecvid.length >= 10 },
    { id: "kalkale-ustasi", title: "Kalkale Ustası", description: "Kalkale dersini tamamladın.", earned: tecvid.includes(9) },
    { id: "sure-hafizi", title: "Sûre Hafızı", description: "Namaz surelerindeki tüm ayetleri tamamladın.", earned: namaz.length >= 55 },
    { id: "kucuk-hattat", title: "Küçük Hattat", description: "Yazı pratiğinde 5 harfi tamamladın.", earned: yazi.length >= 5 },
    { id: "test-ustasi", title: "Test Ustası", description: "Bir testte tam puan aldın.", earned: quiz.some((q) => q.total > 0 && q.score === q.total) },
  ];
}

export function saveQuizResult(result: QuizResult) {
  const results = readArray<QuizResult>(KEYS.quiz);
  writeArray(KEYS.quiz, [...results, result].slice(-100));
  logActivity();
}

// --- Aralıklı tekrar (spaced repetition) -------------------------------------

export type SrsKind = "elifba" | "tecvid" | "namaz" | "harf";

export type SrsEntry = { kind: SrsKind; label: string; href?: string; due: string; interval: number; reps: number };

const REVIEW_STEPS = [1, 3, 7, 16, 35, 60];

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return todayKey(date);
}

export function scheduleReview(id: string, kind: SrsKind, label: string, href?: string) {
  const state = readObject<Record<string, SrsEntry>>(KEYS.srs);
  const existing = state[id];
  state[id] = { kind, label, href, due: addDays(3), interval: 3, reps: existing?.reps ?? 0 };
  writeObject(KEYS.srs, state);
}

export function reviewResult(id: string, correct: boolean) {
  const state = readObject<Record<string, SrsEntry>>(KEYS.srs);
  const entry = state[id];
  if (!entry) return;
  if (correct) {
    const stepIndex = Math.min(REVIEW_STEPS.findIndex((step) => step > entry.interval), REVIEW_STEPS.length - 1);
    const interval = REVIEW_STEPS[stepIndex === -1 ? REVIEW_STEPS.length - 1 : stepIndex];
    state[id] = { ...entry, interval, reps: entry.reps + 1, due: addDays(interval) };
  } else {
    state[id] = { ...entry, interval: 1, due: addDays(1) };
  }
  writeObject(KEYS.srs, state);
}

export function dueReviews(): (SrsEntry & { id: string })[] {
  const state = readObject<Record<string, SrsEntry>>(KEYS.srs);
  const today = todayKey();
  return Object.entries(state)
    .filter(([, entry]) => entry.due <= today)
    .map(([id, entry]) => ({ id, ...entry }))
    .sort((a, b) => a.due.localeCompare(b.due));
}

export function totalScheduled(): number {
  return Object.keys(readObject<Record<string, SrsEntry>>(KEYS.srs)).length;
}
