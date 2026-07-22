// Klasik tecvid kaynaklarındaki beş ana mahreç bölgesine göre basitleştirilmiş harita verisi.
// Amaç anatomik kesinlik değil, harflerin ağızda hangi bölgeden çıktığını görsel olarak
// hissettirmektir.

export type MahrecZone = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  cx: number;
  cy: number;
  letterIds: string[];
};

export const mahrecZones: MahrecZone[] = [
  {
    id: "bogaz",
    title: "Boğaz (Halk)",
    subtitle: "Boğazın alt, orta ve üst kısımları",
    description:
      "Boğaz harfleri, boğazın üç farklı seviyesinden çıkar: en altta hemze ve he, ortada ayn ve ha, dile en yakın üst kısımda ise ğayn ve hı bulunur. Bu bölgeyi çalışırken sesi göğüsten değil, boğazın ilgili noktasından çıkarmaya dikkat et.",
    color: "#c94f4f",
    cx: 27,
    cy: 62,
    letterIds: ["elif", "he", "ayn", "ha", "gayn", "hi"],
  },
  {
    id: "dil",
    title: "Dil (Lisan)",
    subtitle: "Dilin kökü, ortası, kenarı ve ucu",
    description:
      "Alfabedeki harflerin çoğu dilin farklı noktalarıyla üst damak veya dişlere değmesinden çıkar: dil kökü (kaf, kef), dil ortası (cim, şın, ye), dil kenarı (dad), dil ucu (lam, nun, ra) ve dil ucunun dişlere yakınlığıyla oluşan ince/kalın/peltek sesler (te, dal, tı, sad, sin, ze, se, zel, zı). Bu geniş bölgeyi alt gruplar hâlinde çalışmak daha kolaydır.",
    color: "#174f47",
    cx: 55,
    cy: 55,
    letterIds: ["te", "se", "cim", "dal", "zel", "ra", "ze", "sin", "sin3", "sad", "dad", "ti", "zi", "kaf", "kef", "lam", "nun", "ye"],
  },
  {
    id: "dudak",
    title: "Dudaklar (Şefeteyn)",
    subtitle: "Alt dudak ile üst dişler veya iki dudak",
    description:
      "Fe harfi alt dudağın üst ön dişlere değmesiyle, be ve mim iki dudağın kapanmasıyla, vav ise iki dudağın yuvarlanmasıyla çıkar. Bu harfleri çalışırken ayna karşısında dudak hareketini gözlemlemek çok faydalıdır.",
    color: "#b65f38",
    cx: 78,
    cy: 58,
    letterIds: ["fe", "be", "mim", "vav"],
  },
];

export const mahrecBonusNotes = [
  {
    id: "cevf",
    title: "Ağız Boşluğu (Cevf)",
    description:
      "Elif, vav ve ye harfleri med (uzatma) harfi olarak kullanıldığında ses, belirli bir noktaya değmeden ağız boşluğunda serbestçe uzar. Tecvid dersindeki 'Medler' konusu bu boşluk sesini ayrıntılı işler.",
    href: "/tecvid/tecvid-medler",
  },
  {
    id: "genzi",
    title: "Geniz (Gunne)",
    description:
      "Nun ve mim harfleri sakin olduğunda ve idğâm, ihfâ veya iklâb kurallarına girdiğinde ses kısmen geniz boşluğuna kayar; buna gunne denir. Tecvid dersindeki İhfâ, İklâb ve Mîm-i Sâkin konuları bu geniz sesini öğretir.",
    href: "/tecvid/tecvid-ihfa",
  },
];

export function findMahrecZoneForLetter(letterId: string) {
  return mahrecZones.find((zone) => zone.letterIds.includes(letterId));
}
