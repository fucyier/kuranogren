import letters from "@/src/data/elifba.json";
import { tecvidLessons } from "@/src/data/tecvid-lessons";
import { namazSureleri } from "@/src/data/namaz-sureleri";
import { elifbaLessons } from "@/src/data/elifba-lessons";
import { transliterate } from "@/src/lib/transliterate";

export type QuizQuestion = {
  id: string;
  arabic: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  audioSrc?: string;
  srsId?: string;
  srsLabel?: string;
  srsHref?: string;
};

export type QuizTopic = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  build: () => QuizQuestion[];
};

function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildOptions(correct: string, pool: string[], count = 4): { options: string[]; answerIndex: number } {
  const distractors = shuffle(pool.filter((item) => item !== correct)).slice(0, count - 1);
  const options = shuffle([correct, ...distractors]);
  return { options, answerIndex: options.indexOf(correct) };
}

function buildHarflerQuestions(): QuizQuestion[] {
  const allNames = letters.map((letter) => letter.name);
  return shuffle(letters).slice(0, 30).map((letter) => {
    const { options, answerIndex } = buildOptions(letter.name, allNames);
    return {
      id: `harf-${letter.id}`,
      arabic: letter.arabic,
      prompt: "Bu harfin adı nedir?",
      options,
      answerIndex,
      audioSrc: letter.audio,
      srsId: `harf-${letter.id}`,
      srsLabel: `${letter.name} harfi`,
    };
  });
}

function buildTecvidQuestions(): QuizQuestion[] {
  const allTitles = tecvidLessons.map((lesson) => lesson.shortTitle);
  const pool = tecvidLessons.flatMap((lesson) =>
    [...lesson.examples, ...lesson.practice].map((sample) => ({ lesson, sample }))
  );
  return shuffle(pool).slice(0, 30).map(({ lesson, sample }) => {
    const { options, answerIndex } = buildOptions(lesson.shortTitle, allTitles);
    return {
      id: `tecvid-${lesson.slug}-${sample.id}`,
      arabic: sample.arabic,
      prompt: `"${sample.reading}" — bu örnekte hangi tecvid kuralı uygulanıyor?`,
      options,
      answerIndex,
      srsId: `tecvid-${lesson.day}`,
      srsLabel: lesson.shortTitle,
      srsHref: `/tecvid/${lesson.slug}`,
    };
  });
}

function buildSureQuestions(): QuizQuestion[] {
  const allAyahs = namazSureleri.flatMap((sure) => sure.ayahs.map((ayah) => ({ sure, ayah })));
  const allMeanings = allAyahs.map(({ ayah }) => ayah.shortMeaning);
  return shuffle(allAyahs).slice(0, 30).map(({ sure, ayah }) => {
    const { options, answerIndex } = buildOptions(ayah.shortMeaning, allMeanings);
    return {
      id: `namaz-${sure.slug}-${ayah.number}`,
      arabic: ayah.arabic,
      prompt: `${sure.name} — bu ayetin kısa anlamı nedir?`,
      options,
      answerIndex,
      srsId: `namaz-${sure.slug}-${ayah.number}`,
      srsLabel: `${sure.name}, ${ayah.number}. ayet`,
      srsHref: `/namaz-sureleri/${sure.slug}/${ayah.number}`,
    };
  });
}

const ELIFBA_HAREKE_RE = /[ً-ٰٟ]/;

function buildElifbaQuestions(): QuizQuestion[] {
  const pool = elifbaLessons.flatMap((lesson) =>
    [...lesson.examples, ...lesson.practice]
      .filter((sample) => ELIFBA_HAREKE_RE.test(sample))
      .map((sample, sampleIndex) => ({ lesson, sample, sampleIndex }))
  );
  const allReadings = pool.map(({ sample }) => transliterate(sample));
  return shuffle(pool).slice(0, 30).map(({ lesson, sample, sampleIndex }) => {
    const correct = transliterate(sample);
    const { options, answerIndex } = buildOptions(correct, allReadings);
    return {
      id: `elifba-${lesson.day}-${sampleIndex}`,
      arabic: sample,
      prompt: "Bu kelimenin okunuşu nedir?",
      options,
      answerIndex,
      srsId: `elifba-${lesson.day}-${sampleIndex}`,
      srsLabel: lesson.shortTitle,
      srsHref: `/${lesson.slug}`,
    };
  });
}

export const quizTopics: QuizTopic[] = [
  {
    slug: "harfler",
    title: "Harfleri Tanıma Testi",
    shortTitle: "Harfler",
    description: "28 Arapça harften rastgele sorularla harfleri hızlıca tanıyabildiğini test et.",
    color: "#174f47",
    build: buildHarflerQuestions,
  },
  {
    slug: "elifba",
    title: "Elifba Okuma Testi",
    shortTitle: "Elifba",
    description: "30 günlük Elifba programındaki kelimelerin doğru okunuşunu (Latince) seç.",
    color: "#a3760a",
    build: buildElifbaQuestions,
  },
  {
    slug: "tecvid-kurallari",
    title: "Tecvid Kuralları Testi",
    shortTitle: "Tecvid Kuralları",
    description: "Renkli örneklerdeki tecvid kuralını (izhâr, idğâm, ihfâ, iklâb, kalkale...) tanı.",
    color: "#244a70",
    build: buildTecvidQuestions,
  },
  {
    slug: "sureler",
    title: "Namaz Sureleri Testi",
    shortTitle: "Sureler",
    description: "Namaz surelerindeki ayetlerin kısa anlamını eşleştir.",
    color: "#b65f38",
    build: buildSureQuestions,
  },
];

export function getQuizTopic(slug: string) {
  return quizTopics.find((topic) => topic.slug === slug);
}
