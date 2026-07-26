// Tecvid kurallarını seslendirme metnine uygulayan dönüşüm.
// Amaç: kartta yazan latin okunuş ile üretilen sesin birebir aynı olması.
//
// Uygulanan kurallar:
//  1) Tenvin, geçiş (vasl) hâlinde sâkin nûn sesi verir: ٌ → ُنْ, ٍ → ِنْ, ًا → َنْ
//  2) İdğâm (yalnızca kelime sınırında): nûn-i sâkin + ي و ن م ل ر → nûn düşer, sonraki harf şeddelenir
//     (kelime içinde gelen نْ + ي/و izhâr-ı mutlaktır, dokunulmaz: الدُّنْيَا, بُنْيَان)
//  3) İklâb: nûn-i sâkin + ب → nûn mîm'e döner (kelime içinde de geçerli)
//  4) İhfâ ve izhâr harflerinde nûn olduğu gibi bırakılır
//  5) İdğâm-ı misleyn: mîm-i sâkin + م → mîm düşer, sonraki mîm şeddelenir

const SHADDA = "ّ";
const SUKUN = "ْ";
const HARAKAT = "ً-ْٰ";

const IDGHAM_LETTERS = ["ي", "و", "ن", "م", "ل", "ر"];

export function tecvidTts(text) {
  let out = text;

  // 1) Tenvin → sâkin nûn
  out = out
    .replace(/ًا/g, "َنْ") // ًا
    .replace(/ًى/g, "َنْ") // ًى
    .replace(/ً/g, "َنْ")       // ً
    .replace(/ٌ/g, "ُنْ")       // ٌ
    .replace(/ٍ/g, "ِنْ");      // ٍ

  // 3) İklâb: نْ (+boşluk) + ب  → مْ
  out = out.replace(new RegExp(`ن${SUKUN}(\\s*)(?=ب)`, "g"), `م${SUKUN}$1`);

  // 2) İdğâm: yalnızca kelime sınırında (nûn + boşluk + harf)
  for (const letter of IDGHAM_LETTERS) {
    const re = new RegExp(`ن${SUKUN}\\s+(${letter})([${HARAKAT}]?)`, "g");
    out = out.replace(re, (_m, target, harakah) => `${target}${SHADDA}${harakah}`);
  }

  // 5) İdğâm-ı misleyn: مْ + boşluk + م
  out = out.replace(
    new RegExp(`م${SUKUN}\\s+(م)([${HARAKAT}]?)`, "g"),
    (_m, target, harakah) => `${target}${SHADDA}${harakah}`
  );

  return out.replace(/\s+/g, " ").trim();
}

// Seslendirmede kullanılacak nihai metin: veri dosyasındaki tts alanı varsa o kazanır.
export function sampleTts(sample) {
  if (sample.tts) return sample.tts;
  return tecvidTts(sample.arabic.replace(/۝/g, "").trim());
}
