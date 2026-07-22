// Namaz sureleri verisindeki ayet ayet açıklamaların üzerine, her sure için tek bir
// "günlük hayattan bağlantı" notu ekler. Amaç, sûrenin mesajını güncel bir örnekle
// somutlaştırmak; ayet açıklamalarının (src/data/namaz-sureleri.ts) yerini tutmaz, tamamlar.

export type TefsirNote = {
  slug: string;
  nuzulNotu: string;
  gunlukHayat: string;
};

export const tefsirNotes: TefsirNote[] = [
  {
    slug: "fatiha",
    nuzulNotu: "Fâtiha, Kur'an'ın ilk sûresi olarak her namazın her rekâtında okunur; bu yüzden 'Ümmü'l-Kitab' (Kitabın anası) olarak da anılır.",
    gunlukHayat: "Güne başlarken ya da önemli bir işe girişirken önce şükretmek, sonra istemek Fâtiha'nın öğrettiği sıralamadır: kişi önce nimeti verenin kim olduğunu hatırlar, sonra ihtiyacını dile getirir. Bir sınav öncesi, bir karar anı ya da zor bir günün başında Fâtiha'yı anlamına dikkat ederek okumak, kişiyi telaşla değil güvenle hazırlar.",
  },
  {
    slug: "fil",
    nuzulNotu: "Sûre, Hz. Peygamber'in doğumuyla aynı yıla denk gelen ve ilk muhatapların yakından bildiği 'Fil Vakası'nı hatırlatır; olay güçlü bir ibret sahnesi olarak sunulur.",
    gunlukHayat: "Gücünü ya da imkânlarını başkasına zarar vermek için kullanan kişi ya da toplulukların, göründükleri kadar dokunulmaz olmadığını hatırlamak güncel bir derstir. Zorbalığa hayranlık duymak yerine, en güçlü görünenin bile hesap vereceğini bilmek, haksızlık karşısında umutsuzluğa düşmemeyi öğretir.",
  },
  {
    slug: "kureys",
    nuzulNotu: "Kureyş kabilesinin kış ve yaz ticaret kervanlarına, yani o dönemin ekonomik düzenine atıfta bulunur; Fîl sûresiyle içerik bakımından yakından ilişkilidir.",
    gunlukHayat: "İşe güvenle gidebilmek, karnını doyurabilmek, sokakta güvende yürüyebilmek gibi sıradanlaştırdığımız şeyler aslında büyük nimetlerdir. Kureyş sûresi, düzenli bir hayatın kıymetini ancak onu kaybedince anlama alışkanlığına karşı, bugünden şükretmeyi hatırlatır.",
  },
  {
    slug: "maun",
    nuzulNotu: "Sûre, inancı yalnız sözde bırakıp davranışa yansıtmayan bir tutumu; yetime, yoksula ve komşuya duyarsızlığı eleştirir.",
    gunlukHayat: "Komşusundan ihtiyaç anında yardım isteyen birine 'başkasından istesin' diye düşünmek, iş yerinde zor durumdaki bir arkadaşına küçük bir kolaylık bile göstermemek, Mâûn sûresinin işaret ettiği duyarsızlığın günümüzdeki hâlleridir. Sûre, büyük bağışlar kadar günlük küçük paylaşımların da bir sorumluluk olduğunu hatırlatır.",
  },
  {
    slug: "kevser",
    nuzulNotu: "Sûre, Hz. Peygamber'i üzen bazı sözlere karşı bir teselli ve müjde olarak inmiştir; kısalığına rağmen güçlü bir güven mesajı taşır.",
    gunlukHayat: "Haksız bir söz ya da küçümsemeyle karşılaşıldığında, değerin başkasının yargısıyla değil, kişinin Allah katındaki hâliyle ölçüldüğünü hatırlamak Kevser sûresinin verdiği güvendir. Eleştiriye enerji harcamak yerine ibadete ve paylaşmaya (namaz ve kurban) yönelmek, sûrenin önerdiği sağlıklı tepkidir.",
  },
  {
    slug: "kafirun",
    nuzulNotu: "Mekkeli müşriklerin, belirli dönemlerde karşılıklı olarak birbirinin ibadetine katılma teklifine verilen kesin bir cevap olarak değerlendirilir.",
    gunlukHayat: "Farklı inançlara sahip insanlarla saygılı ve barışçıl bir ilişki kurmak ile kendi inancının temel ilkelerinden taviz vermek birbirinden farklıdır. Kâfirûn sûresi, birlikte yaşamanın inançları bulanıklaştırmadan da mümkün olduğunu; net olmanın kabalık anlamına gelmediğini gösterir.",
  },
  {
    slug: "nasr",
    nuzulNotu: "Medine döneminin sonlarına, İslâm'ın Arap yarımadasında yaygınlaştığı zafer sonrası bir zamana işaret ettiği kabul edilir.",
    gunlukHayat: "Bir hedefe ulaştığında, bir sınavı kazandığında ya da bir projeyi başarıyla bitirdiğinde ilk tepki gurur değil şükür olmalıdır. Nasr sûresi, başarının insanı kibirlendirmek yerine daha alçakgönüllü ve öz eleştiriye açık hâle getirmesi gerektiğini öğretir.",
  },
  {
    slug: "tebbet",
    nuzulNotu: "Sûre, Hz. Peygamber'in amcası Ebû Leheb ve eşinin, akrabalık bağına rağmen İslâm davetine karşı gösterdiği şiddetli düşmanlığı konu alır.",
    gunlukHayat: "Yakın akrabalık ya da tanışıklık, birinin haksız ya da zarar verici davranışını meşrulaştırmaz. Tebbet sûresi, kan bağının tek başına bir üstünlük ya da dokunulmazlık sağlamadığını; asıl belirleyicinin kişinin ahlâkı ve tutumu olduğunu hatırlatır.",
  },
  {
    slug: "ihlas",
    nuzulNotu: "Rivayetlere göre müşriklerin 'Allah'ın soyu nedir?' türünden sorularına cevap olarak inmiş, tevhid inancını en yalın hâliyle özetlemiştir.",
    gunlukHayat: "Günlük hayatta bir şeye ya da birine aşırı bağlanıp ondan mutlak güvenlik beklemek, hayal kırıklığına açık bir tutumdur. İhlâs sûresini anlamak, güvenin en sağlam noktasının hiçbir şeye muhtaç olmayan Allah olduğunu; insan ve eşyanın ise sınırlı ve geçici olduğunu hatırlamaktır.",
  },
  {
    slug: "felak",
    nuzulNotu: "Nâs sûresiyle birlikte 'Muavvizeteyn' (sığınma sûreleri) olarak anılır; dış tehlikelere karşı korunma duası olarak öğretilmiştir.",
    gunlukHayat: "Kıskançlık, kötü niyet ya da bilinmeyen tehlikeler karşısında endişelenmek insani bir tepkidir. Felak sûresi, bu endişeyi bastırmak yerine onu meşru bir sığınma ve tedbir alma bilincine dönüştürmeyi öğretir: hem gerekli önlemi al hem güvenini Allah'a bağla.",
  },
  {
    slug: "nas",
    nuzulNotu: "Felak sûresiyle birlikte inmiş, dıştan gelen tehlikelerin yanında insanın kendi iç dünyasındaki olumsuz telkinlere karşı sığınmayı öğretmiştir.",
    gunlukHayat: "Zihne sürekli üşüşen kötümser, kıskanç ya da yıkıcı düşünceler her insanın yaşadığı bir durumdur. Nâs sûresi, bu düşünceleri fark edip onlara teslim olmamayı; kalbi doğru bir söz ve hatırlayışla sakinleştirmeyi öğreten pratik bir zihin egzersizidir.",
  },
];

export function findTefsirNote(slug: string) {
  return tefsirNotes.find((note) => note.slug === slug);
}
