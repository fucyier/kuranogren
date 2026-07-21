export type LessonSource = { title:string; publisher:string; url:string };

const commonSources: LessonSource[] = [
  { title:"Elif-Bâ Kur’an Öğreniyorum", publisher:"Diyanet İşleri Başkanlığı", url:"https://egitimhizmetleri.diyanet.gov.tr/Documents/ElifBa%20Kuran%20%C3%96%C4%9Freniyorum-2024.pdf" },
  { title:"Kur’an-ı Kerim ve Temel Dini Bilgiler Öğretim Programı", publisher:"Diyanet İşleri Başkanlığı", url:"https://egitimhizmetleri.diyanet.gov.tr/Documents/Kur%27an-%C4%B1%20Kerim%20ve%20Temel%20Dini%20Bilgiler%20%C3%96%C4%9Fretim%20Program%C4%B1-2025.pdf" },
];

const signSources: LessonSource[] = [
  { title:"Kur’an Dersleri: Harflerin Hareke ve İşaretlerle Okunuşu", publisher:"Diyanet Dijital", url:"https://dijital.diyanet.gov.tr/video/kuran-dersleri-3-bolum-%D8%A7-%D8%A8-%D8%AA-%D8%AB-harflerin-hareke-ve-isaretlerle-okunusu-davut-kaya/kuran-dersleri-davut-kaya/167/5086/dGiqhF5XziY" },
  { title:"Camilerde Kur’an Öğretim Programı", publisher:"Diyanet İşleri Başkanlığı", url:"https://egitimhizmetleri.diyanet.gov.tr/Documents/Camilerde%20Kur%27an%20%C3%96%C4%9Fretim%20Program%C4%B1%20-%202010.pdf" },
];

const finalSources: LessonSource[] = [
  { title:"Fâtiha Suresi Tefsiri", publisher:"Diyanet İşleri Başkanlığı – Kur’an Yolu", url:"https://kuran.diyanet.gov.tr/tefsir/sure/1-fatiha-suresi" },
];

const theories = {
  letters: [
    "Kur’an yazısının temeli, her biri kendine özgü biçime ve çıkış yerine sahip harflerdir. Türkçedeki alfabe bilgisinden farklı olarak burada yalnız şekli tanımak yeterli değildir; harfin adı, sesi, noktalarının yeri ve kelime içindeki biçimi birlikte öğrenilir. Sağdan sola takip edilen yazı yönü ilk günlerde bilinçli olarak uygulanmalı, göz bir sonraki harfe soldan değil sağdan geçmeye alıştırılmalıdır.",
    "Arap alfabesinde büyük-küçük harf ayrımı yoktur. Buna karşılık bir harf kelimenin başında, ortasında, sonunda veya tek başına bulunduğunda farklı bir görünüm alabilir. Bu değişiklik harfin kimliğini ortadan kaldırmaz. Gövde, diş, kavis ve nokta gibi ayırt edici parçalar izlenerek aynı harfin farklı biçimleri arasında bağ kurulur.",
    "Öğrenmede benzer harfleri aileler hâlinde çalışmak önemlidir. Be, te ve se; cim, ha ve hı; dal ve zel; sin ve şın gibi harfler aynı temel şekli paylaşır. Farkı çoğu zaman noktaların sayısı veya yerleşimi oluşturur. Bu nedenle kartı görür görmez yalnız ismi söylemek yerine ‘şekil + nokta + ses’ üçlüsünü birlikte hatırlamak daha kalıcı bir tanıma sağlar.",
    "Harf öğretiminde hızdan önce doğruluk gelir. Her harf dinlenmeli, öğretici sesi taklit edilmeli ve kısa aralıklarla tekrar edilmelidir. Yanlış yerleşen bir ses ilerleyen derslerde hareke, cezim ve kelime okumayı zorlaştırabilir. Çocukların yorulmadan çalışabilmesi için beş-altı harflik kısa kümeler, görsel kartlar ve sesli tekrarlar tercih edilir."
  ],
  makhraj: [
    "Mahreç, harfin sesinin ağız ve boğaz içinde belirginleştiği çıkış yeridir. Harfi yalnız Türkçe bir benzerine çevirmek doğru telaffuz için yeterli olmaz; çünkü ayn, hâ, hı, dad ve zı gibi bazı seslerin Türkçede tam karşılığı yoktur. Öğrenci sesi dinlerken dilin, boğazın, dişlerin ve dudakların nasıl konumlandığını da fark etmelidir.",
    "Boğaz harfleri boğazın dip, orta ve ağıza yakın bölümlerinden çıkar. Dil harflerinde dil kökü, ortası, kenarı veya ucu görev alır. Dudak harflerinde iki dudağın kapanması, yuvarlanması ya da alt dudağın üst dişlere yaklaşması görülür. Mahreç grupları, ezberlenecek kuru bir liste değil, doğru sesi üretmeye yardımcı olan bir beden haritasıdır.",
    "Kalınlık ve incelik harfin temel ses rengini etkiler. Hı, sad, dad, tı, zı, ğayn ve kaf genel olarak kalın okunur. Peltek se, zel ve zı seslerinde dil ucu üst ön dişlere yaklaşır. Harfin kalın okunması sesi gereksiz biçimde bağırmak, peltek okunması da dili aşırı dışarı çıkarmak anlamına gelmez; ölçülü bir taklit gerekir.",
    "Mahreç çalışması aynayla, yavaş tekrarlarla ve karşılaştırmalı dinlemeyle yapılmalıdır. Sin-sad, te-tı, dal-dad, he-ha ve kef-kaf gibi çiftleri arka arkaya okumak farkı duyulur hâle getirir. Ses kaydı almak yararlı olsa da nihai doğrulama için ehil bir öğreticinin geri bildirimi önemlidir."
  ],
  vowels: [
    "Arap harfleri temel biçimleriyle çoğunlukla sessiz bir iskelet oluşturur. Üstün, esre ve ötre adı verilen harekeler, harfin hangi kısa sesle okunacağını gösterir. Üstün harfin üstünde kısa ‘a/e’, esre altında kısa ‘i’, ötre ise üstünde kısa ‘u/ü’ sesi verir. Bu sesler tek hareke süresinde okunur ve med harfi bulunmadıkça uzatılmaz.",
    "Hareke, harfin mahrecini değiştirmez; yalnız ona kısa bir ses ekler. Örneğin be harfi üstünle ‘be/ba’, esreyle ‘bi’, ötreyle ‘bu’ biçiminde duyulur. Kalın harflerde harekenin ses rengi kalınlaşabilir ancak işaretin görevi aynı kalır. Öğrenci önce işareti görmeli, sonra harfi mahrecinden çıkararak ikisini tek ses hâlinde birleştirmelidir.",
    "Karışık okuma çalışmaları görsel dikkati geliştirir. Aynı harfi üç harekeyle okumak, ardından farklı harfleri aynı harekeyle sıralamak iki ayrı beceriyi güçlendirir. İlkinde işaret değişimini, ikincisinde mahreç değişimini izlemek gerekir. Kelime çalışmasına geçildiğinde göz her harfi tek tek çözmekten, küçük ses gruplarını birlikte tanımaya doğru ilerler.",
    "Kısa seslerin gereksiz uzatılması yaygın bir başlangıç hatasıdır. Ritmik sayma, parmakla tek vuruş ve kısa ses kayıtları sürenin korunmasına yardım eder. Doğru hedef hızlı okumak değil; harekeyi atlamadan, ek ses üretmeden ve harfin özelliğini bozmadan okumaktır."
  ],
  sukun: [
    "Cezm veya sükûn, üzerinde bulunduğu harfin harekesiz olduğunu bildirir. Böyle bir harf tek başına seslendirilemez; kendisinden önceki harekeli harfe bağlanarak bir hece oluşturur. ‘Eb’ örneğinde elifin üstün sesi başlatır, cezimli be ise heceyi mahrecinde kapatır. Bu yapı Kur’an kelimelerini doğru heceleyebilmenin temel basamaklarındandır.",
    "Cezimli harfte yeni bir ünlü türetilmemelidir. Harfin sonuna Türkçedeki gibi fazladan ‘ı’ veya ‘i’ eklemek okunuşu değiştirir. Dil ve dudak, cezimli harfin mahrecine ulaşmalı; ses orada temiz biçimde sonlanmalıdır. Kalkale harfleri olan kaf, tı, be, cim ve dal sakin olduğunda hafif bir ses yankısı duyulabilir, fakat bu yankı ayrı bir harekeye dönüşmez.",
    "Kelime içinde art arda gelen heceler çözülürken önce harekeli-cezimli ikili bulunur. Ardından sonraki harekeli harfe geçilir. Bu yöntem uzun görünen kelimeleri yönetilebilir parçalara ayırır. Nun ve mim sakin olduğunda sonraki harfe göre geniz sesiyle ilgili tecvid hükümleri doğabilir; başlangıç aşamasında önce harfin doğru ve sakin okunması hedeflenir.",
    "Cezm pratiğinde yavaş çözümleme ile akıcı okuma birlikte kullanılmalıdır. Önce işaretler gösterilerek hecelenir, ikinci turda kelime kesintisiz okunur. Her tekrarın ardından öğrencinin fazladan ses ekleyip eklemediği kontrol edilmelidir."
  ],
  madd: [
    "Med harfleri, kısa hareke sesini belirli bir süre uzatır. Üstünden sonra harekesiz elif ‘â’, esreden sonra harekesiz yâ ‘î’, ötreden sonra harekesiz vav ‘û’ sesi oluşturur. Bu üç eşleşmede önceki hareke ile med harfi birbirinden koparılmadan tek uzun ses olarak okunur.",
    "Tabii medin temel ölçüsü iki harekedir. Bu süre, iki kısa ses vuruşuna denk gelecek şekilde dengeli tutulur. Uzatmanın hiç yapılmaması kelimenin ses yapısını eksiltir; gereğinden fazla yapılması ise okuyuş ölçüsünü bozar. El çırpma, parmak sayma veya sabit ritim başlangıçta süreyi hissettirebilir.",
    "Kasr, uzatmadan kısa okumayı ifade eder. Med-kasr karşılaştırmaları öğrencinin yalnız harf şekline değil, hareke ve med ilişkisine de dikkat etmesini sağlar. Her elif, vav veya yâ med harfi değildir; önceki hareke ve harfin kendi işareti birlikte incelenmelidir.",
    "Medler kelime içinde çalışıldıktan sonra ayet örneklerine taşınmalıdır. Okuyucu uzun sesi korurken mahreci, şeddeyi ve sonraki harfe geçişi kaybetmemelidir. Amaç melodik gösteri değil, yazıdaki ölçüyü güvenilir bir okuyuşla seslendirmektir."
  ],
  shadda: [
    "Şedde, bir harfin iki defa bulunduğunu gösteren yoğunlaştırılmış bir işarettir. İlk harf sakin, ikinci harf ise üzerinde görülen harekeyle okunur. Yazıda tek harf görünmesine rağmen okuyuşta mahreçte kısa bir tutuş ve ardından harekeli çıkış vardır.",
    "Şeddeli harfi iki ayrı kelime gibi koparmak da işareti hiç yokmuş gibi tek okumak da doğru değildir. Dil veya dudak ilgili mahreçte kısa süre tutulur, sonra ikinci harfin harekesiyle devam edilir. Şeddeli nun ve mimde geniz sesi belirginleşir; bu ses burundan gelir ve ölçülü tutulur.",
    "Şedde; med, cezim ve farklı harekelerle aynı kelimede bulunabilir. Bu nedenle işaretleri belirli sırayla incelemek yararlıdır: önce harf, sonra hareke, ardından şedde ve med ilişkisi. Böylece uzun kelimeler tek bakışta karmaşık görünmekten çıkar.",
    "Pratik sırasında şeddeli bölüm renkli gösterilebilir, öğrenci eliyle bir tutuş işareti yapabilir. Ardından kelime önce yavaş, sonra doğal akışta okunur. Mahreçte gereksiz baskı oluşturmadan harfin iki değerini duyurmak temel hedeftir."
  ],
  tanwin: [
    "Tenvin, kelime sonunda bulunan iki üstün, iki esre veya iki ötre işaretidir. Okuyuşta yazılmayan sakin bir nun sesi meydana getirir: iki üstün ‘en/an’, iki esre ‘in’, iki ötre ‘un’ şeklinde duyulur. Bu nun harfi yazıda ayrı bir harf olarak görünmez.",
    "Tenvin yalnız kelime sonunda yer alır. Kelimeyi durarak okumakla sonraki kelimeye bağlayarak okumak arasında fark oluşabilir. Bağlantılı okuyuşta tenvinden sonra gelen harfe göre izhar, idgam, ihfa veya iklab gibi tecvid hükümleri gündeme gelir. Başlangıç seviyesinde önce tenvin sesinin kısa ve açık kurulması gerekir.",
    "İki üstün çoğu kelimede yardımcı bir elifle yazılabilir; ancak bu elif ayrı bir uzun ses gibi okunmaz. İki esre harfin altında, iki ötre üstünde bulunur. Öğrencinin benzer görünen tek ve çift harekeyi görsel olarak ayırması için karşılaştırmalı kartlar etkilidir.",
    "Tenvin çalışmaları kelime sonlarını bilinçli okumayı öğretir. Önce tek kelime, sonra iki kelimelik geçişler çalışılmalı; durma ve devam etme denemeleri ayrı yapılmalıdır. Böylece ileride tecvid kurallarına geçiş için sağlam bir işitsel temel oluşur."
  ],
  special: [
    "Kur’an yazısında temel hareke ve işaretlerin yanında özel okuyuşları bildiren yapılar vardır. Zamir hâsı, dik uzatma işaretleri, elif-lâm takısı ve lafzatullah bunların başlıcalarıdır. Bu konular yalnız şekil ezberiyle değil, kelimenin öncesi ve sonrasıyla birlikte öğrenilir.",
    "Belirli isimlerin başındaki elif-lâm takısında lâm bazen açıkça okunur, bazen sonraki harfe katılır. Kamerî harflerde lâm duyulur; şemsî harflerde lâm okunmaz ve sonraki harf şeddeli hâle gelir. Bu ayrım gözle işareti, kulakla birleşmeyi takip ederek pekiştirilir.",
    "Allah lafzındaki lâm, öncesindeki harekeye göre farklı ses rengi kazanır. Üstün veya ötreden sonra kalın, esreden sonra ince okunur. Bu kural, harfin sabit biçimiyle bağlam içindeki ses özelliğinin birlikte değerlendirilmesine güzel bir örnektir.",
    "Özel okuyuşlarda öğrenci acele etmemeli, örneği bütünüyle dinlemeli ve renkli bölümü takip etmelidir. Kuralın adını söyleyebilmekten daha önemli olan, işareti gerçek bir kelime içinde doğru uygulayabilmektir."
  ],
  waqf: [
    "Vakf, okuyuş sırasında uygun yerde durmak; ibtidâ ise duruştan sonra anlamı gözeterek yeniden başlamaktır. Mushaflardaki durak işaretleri okuyucuya yol gösterir. Durmak yalnız nefes almak değil, sözün anlam bütünlüğünü koruyan bilinçli bir tercihtir.",
    "Kelime sonunda durulduğunda son hareke çoğu zaman sakinleştirilir. Tenvin, yuvarlak tâ ve med gibi yapılarda özel duruş biçimleri bulunabilir. Başlangıç öğrencisi önce temel duruşu öğrenmeli, ayrıntılı vakıf kurallarını öğretici eşliğinde geliştirmelidir.",
    "Mukattaa harfleri bazı sûrelerin başında bulunan kesik harflerdir. Bunlar kelime gibi değil, harflerin isimleriyle okunur ve içerdikleri medlere göre uzatılır. Elif-lâm-mîm örneğinde her bölüm bağımsız ses değerine sahiptir.",
    "Doğru duruş anlamı korur, nefesi düzenler ve okuyuşu anlaşılır kılar. Pratikte aynı ayet önce durak yerleri işaretlenerek, sonra uygun nefes planıyla okunmalıdır. Nerede yeniden başlanacağı da en az nerede durulacağı kadar önemlidir."
  ],
  review: [
    "Fâtiha uygulaması, Elifba boyunca öğrenilen harf, hareke, cezim, şedde, med ve özel okuyuşların birlikte görülmesini sağlar. Bu aşamada amaç sûreyi yalnız ezberden söylemek değil, mushaf yazısını takip ederek her işaretin okuyuştaki karşılığını fark etmektir.",
    "Kelime kelime çalışma yapılırken önce harf yapısı incelenir, sonra mahreçler ve okuma işaretleri belirlenir. Renkli bölümlendirme, şedde ve med gibi dikkat noktalarını görünür kılar. Ardından güvenilir bir okuyucu dinlenir ve aynı bölüm birkaç kez taklit edilir.",
    "Fâtiha’nın akıcı okunması doğruluk temeli üzerine kurulmalıdır. Hız, med sürelerini kısaltmamalı; şeddeleri silmemeli ve kelime sonlarını belirsizleştirmemelidir. Nefesin yetmediği yerde anlamı bozmayacak uygun bir durak tercih edilir.",
    "Bu program bağımsız çalışmayı destekler ancak kıraat eğitiminin canlı aktarım yönünü tamamen karşılamaz. Öğrenci kendi kaydını dinlemeli, zorlandığı kelimeleri işaretlemeli ve imkân bulduğunda ehil bir öğreticiye okuyarak geri bildirim almalıdır."
  ]
};

export function getElifbaTheory(day:number) {
  if(day<=3)return theories.letters;if(day===4)return theories.makhraj;if(day<=13)return theories.vowels;
  if(day<=16)return theories.sukun;if(day<=20)return theories.madd;if(day<=23)return theories.shadda;
  if(day<=26)return theories.tanwin;if(day<=28)return theories.special;if(day===29)return theories.waqf;return theories.review;
}

export function getElifbaSources(day:number) {
  return [...commonSources,...(day>=5?signSources:[]),...(day===30?finalSources:[])];
}
