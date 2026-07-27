// Basit, tutarlı bir Arapça -> Latin okunuş çevirici.
// Amaç bilimsel bir transkripsiyon değil; elifba pratik kartlarında çocuğun
// kelimeyi seslendirmesine yardımcı olacak bir okuma ipucudur. Asıl doğru
// telaffuz her zaman "Dinle" sesidir.
//
// Kurallar:
// - üstün (fetha) -> a, esre (kesra) -> ince "i" / kalın "ı", ötre (damme) -> u
// - med harfleri (aynı harekeden sonra gelen harekesiz ا/و/ي) -> â / û / î
// - şedde -> ünsüz ikilenir, cezm (sükun) -> ünlü eklenmez
// - tenvin -> hareke + sonuna "n"
// - hemze taşıyıcıları (أ إ ؤ ئ ء) -> kesme işareti (')
// - "ال" takısı: kamerî harfte "el-", şemsî harfte lâm sessiz kalır (şeddeyle ikilenme)
// - "kalın" (tafhim) harfler ve peltek harfler ayrıca işaretlenir; bu bilgi
//   pratik kartlarında altı çizili / eğik gösterim için kullanılabilir.

export type TranslitPart = { text: string; thick?: boolean; peltek?: boolean };

const FETHA = "َ";
const DAMME = "ُ";
const KESRA = "ِ";
const SHADDA = "ّ";
const TAN_FETHA = "ً";
const TAN_DAMME = "ٌ";
const TAN_KESRA = "ٍ";
const DAGGER_ALIF = "ٰ";
const MADDAH = "ٓ";

const MARK_RE = /[ً-ٰٟۖ-ۭ]/;
const ARABIC_RE = /[؀-ۿ]/;

const HAREKE_FAMILY = new Set([FETHA, KESRA, DAMME, TAN_FETHA, TAN_KESRA, TAN_DAMME]);
const FETHA_FAMILY = new Set([FETHA, TAN_FETHA]);
const KESRA_FAMILY = new Set([KESRA, TAN_KESRA]);
const DAMME_FAMILY = new Set([DAMME, TAN_DAMME]);
const TENVIN = new Set([TAN_FETHA, TAN_KESRA, TAN_DAMME]);

// Gün 4'te öğretilen 7 kalın (tafhim) harf.
const KALIN = new Set(["خ", "ص", "ض", "ط", "ظ", "غ", "ق"]);
// Gün 4'te öğretilen 3 peltek harf.
const PELTEK = new Set(["ث", "ذ", "ظ"]);
const HEMZE_CARRIERS = new Set(["أ", "إ", "ؤ", "ئ", "ء"]);

const CONSONANT: Record<string, string> = {
  ا: "",
  ب: "b",
  ت: "t",
  ث: "s",
  ج: "c",
  ح: "h",
  خ: "h",
  د: "d",
  ذ: "z",
  ر: "r",
  ز: "z",
  س: "s",
  ش: "ş",
  ص: "s",
  ض: "d",
  ط: "t",
  ظ: "z",
  ع: "’",
  غ: "ğ",
  ف: "f",
  ق: "k",
  ك: "k",
  ل: "l",
  م: "m",
  ن: "n",
  ه: "h",
  و: "v",
  ي: "y",
  ة: "t",
  ى: "",
};

function vowelFor(hareke: string | undefined, thick: boolean): string {
  if (!hareke) return "";
  if (FETHA_FAMILY.has(hareke)) return thick ? "a" : "e";
  if (KESRA_FAMILY.has(hareke)) return thick ? "ı" : "i";
  if (DAMME_FAMILY.has(hareke)) return thick ? "u" : "ü";
  return "";
}

function lastVowelIsKesra(parts: TranslitPart[]): boolean {
  for (let k = parts.length - 1; k >= 0; k--) {
    const match = parts[k].text.match(/[aeıiuüoöâîû]/gi);
    if (match?.length) return /[ıiî]/i.test(match[match.length - 1]);
  }
  return false;
}

type Tok = { base: string; marks: string[] };

const WORD_BREAK = " ";

function tokenize(text: string): Tok[] {
  const toks: Tok[] = [];
  for (const ch of Array.from(text)) {
    if (MARK_RE.test(ch) && toks.length) toks[toks.length - 1].marks.push(ch);
    else if (ARABIC_RE.test(ch)) toks.push({ base: ch, marks: [] });
    else if (/\s/.test(ch) && toks[toks.length - 1]?.base !== WORD_BREAK) toks.push({ base: WORD_BREAK, marks: [] });
  }
  while (toks.length && toks[toks.length - 1].base === WORD_BREAK) toks.pop();
  return toks;
}

function transliterateToks(toks: Tok[]): TranslitPart[] {
  const parts: TranslitPart[] = [];
  let carryThick: boolean = false;

  for (let i = 0; i < toks.length; i++) {
    const tok = toks[i];
    const { base, marks } = tok;
    const nextTok = toks[i + 1];
    const prevTok = toks[i - 1];
    const inheritThick: boolean = carryThick;
    carryThick = false;

    if (base === WORD_BREAK) { parts.push({ text: " " }); continue; }

    const hareke = marks.find((m) => HAREKE_FAMILY.has(m));
    const hasShadda = marks.includes(SHADDA);
    const hasTenvin = !!hareke && TENVIN.has(hareke);
    const hasLongMark = marks.includes(DAGGER_ALIF) || marks.includes(MADDAH);

    // Kelime başındaki "ال" takısı: harekesiz elif "el-" sesinin başlangıcı.
    // Cümle ortasında bir kelimeden sonra geldiğinde bu başlangıç sesi düşer
    // (vasl), önceki kelimenin son harekesiyle bağlanarak okunur.
    if ((i === 0 || prevTok?.base === WORD_BREAK) && base === "ا" && marks.length === 0 && nextTok?.base === "ل") {
      if (i === 0) parts.push({ text: "e" });
      continue;
    }

    // Harekesiz, şeddesiz lâm: tanım takısının lâmı.
    if (base === "ل" && marks.length === 0) {
      if (nextTok?.marks.includes(SHADDA)) continue; // şemsî: lâm sessiz kalır
      parts.push({ text: "l" }); // kamerî (sükun işaretsiz de olsa)
      continue;
    }

    // Med harfleri: kendi harekesi yok, önceki uyumlu harekeyi uzatıyor.
    if (marks.length === 0 && (base === "ا" || base === "و" || base === "ي") && prevTok) {
      const prevHareke = prevTok.marks.find((m) => HAREKE_FAMILY.has(m));
      if (base === "ا" && prevHareke === FETHA) { parts.push({ text: "â" }); continue; }
      if (base === "و" && prevHareke === DAMME) { parts.push({ text: "û" }); continue; }
      if (base === "ي" && prevHareke === KESRA) { parts.push({ text: "î" }); continue; }
    }
    if (base === "ى") { parts.push({ text: "â" }); continue; }

    if (HEMZE_CARRIERS.has(base)) {
      const text = "'" + vowelFor(hareke, false);
      parts.push({ text });
      if (hasTenvin) parts.push({ text: "n" });
      continue;
    }

    const isLafzatullahLam = base === "ل" && hasLongMark;
    // "Allah" kelimesinin başındaki hemze her zaman "a" renginde başlar.
    const isAllahOnset = base === "ا" && i === 0 && nextTok?.base === "ل" && toks[i + 2]?.base === "ل" && toks[i + 2]?.marks.includes(SHADDA);
    // Harfin kendi kalınlığı (komşu harflerden bağımsız).
    const intrinsicThick =
      KALIN.has(base) ||
      (base === "ر" && hareke !== KESRA && hareke !== TAN_KESRA) ||
      (isLafzatullahLam && !lastVowelIsKesra(parts)) ||
      isAllahOnset;
    // Görsel işaretleme (altı çizili) ve üstün/ötre için komşu kalınlık da sirayet eder;
    // ama esre zaten inceltici bir hareke olduğundan onu miras alınan kalınlık etkilemez.
    const thick: boolean = intrinsicThick || inheritThick;
    if (isLafzatullahLam) carryThick = thick;
    const peltek = PELTEK.has(base);
    const latin = CONSONANT[base];
    if (latin === undefined) continue;

    let text = hasShadda ? latin + latin : latin;
    // Bir sonraki harf bu harekeyle eşleşen bir med harfiyse, kısa ünlüyü
    // burada eklemiyoruz; uzun ünlü med adımında eklenecek.
    const medFollows =
      !!nextTok &&
      nextTok.marks.length === 0 &&
      ((hareke === FETHA && (nextTok.base === "ا" || nextTok.base === "ى")) ||
        (hareke === DAMME && nextTok.base === "و") ||
        (hareke === KESRA && nextTok.base === "ي"));
    if (!medFollows) {
      const vowelThick = hareke && KESRA_FAMILY.has(hareke) ? intrinsicThick : thick;
      let vowel = vowelFor(hareke, vowelThick);
      if (!vowel && hasLongMark) vowel = "â";
      text += vowel;
    }
    if (text) parts.push({ text, thick, peltek });
    if (hasTenvin) parts.push({ text: "n" });
  }

  return parts;
}

export function transliterateWord(word: string): TranslitPart[] {
  return transliterateToks(tokenize(word));
}

export function transliterateParts(text: string): TranslitPart[] {
  return transliterateToks(tokenize(text));
}

export function transliterate(text: string): string {
  return transliterateParts(text).map((p) => p.text).join("");
}
