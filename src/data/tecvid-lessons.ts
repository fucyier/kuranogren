export type TecvidSample = {
  id: string;
  arabic: string;
  tts?: string;
  reading: string;
  note: string;
  highlight: string;
};

export type TecvidLesson = {
  day: number;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  color: string;
  summary: string;
  instruction: string;
  rule: string;
  theory: string[];
  examples: TecvidSample[];
  practice: TecvidSample[];
};

export const tecvidLessons: TecvidLesson[] = [
  {day:1,slug:"tecvid-tertil-ve-tenvin",title:"Tertîl ve Tenvini Doğru Okuma",shortTitle:"Tertîl ve tenvin",category:"Başlangıç",color:"#d97736",summary:"Yavaş ve ölçülü okuyuşu öğren; iki ötreyi ‘ün’, iki esreyi ‘in’, iki üstünü ‘en’ sesiyle tamamla.",instruction:"Her kelimeyi dinle, son sesi özellikle fark et ve üç kez tane tane tekrar et.",rule:"Tenvin, kelimenin sonunda duyulan kısa ve sakin bir nûn sesidir. Devam ederek okurken bu ses mutlaka işitilir.",theory:["Tecvid, Kur’an harflerini mahreç ve sıfatlarına uygun biçimde, eksiltmeden ve zorlamadan okumayı öğretir. Başlangıçta hız değil açıklık esastır; göz işareti görür, kulak doğru örneği duyar, dil de kontrollü biçimde tekrar eder.","Tertîl, kelimeleri birbirine karıştırmadan ölçülü ve düşünerek okumaktır. Bu programdaki sesler öğrenme amacıyla yavaş hazırlanmıştır. Her örneği önce yalnız dinlemek, ardından metni takip etmek ve son turda ekrana bakmadan tekrar etmek gerekir.","İki ötre ‘ün/un’, iki esre ‘in’, iki üstün ise geçiş hâlinde ‘en/an’ sesi verir. كِتَابٌ kelimesinin sonundaki iki ötre atlanmaz; kelime ‘kitâb’ değil ‘kitâbün’ diye tamamlanır.","Kelime üzerinde durulduğunda son hareke ve tenvinin okunuşu değişebilir. Bu dersteki tek kelimeler öğretim amacıyla geçiş sesi korunarak okutulur; böylece işaretin gerçek görevi açıkça duyulur."],examples:[
    {id:"kitabun",arabic:"كِتَابٌ",tts:"كِتَابُنْ",reading:"kitâbün",note:"İki ötre: kısa ‘ün’ sesi",highlight:"ٌ"},
    {id:"kitabin",arabic:"كِتَابٍ",tts:"كِتَابِنْ",reading:"kitâbin",note:"İki esre: kısa ‘in’ sesi",highlight:"ٍ"},
    {id:"kitaben",arabic:"كِتَابًا",tts:"كِتَابَنْ",reading:"kitâben",note:"İki üstün: kısa ‘en’ sesi",highlight:"ًا"}],practice:[
    {id:"alimun",arabic:"عَلِيمٌ",tts:"عَلِيمُنْ",reading:"alîmün",note:"Son sesi düşürme",highlight:"ٌ"},
    {id:"rahimin",arabic:"رَحِيمٍ",tts:"رَحِيمِنْ",reading:"rahîmin",note:"Kısa ‘in’ ile tamamla",highlight:"ٍ"},
    {id:"semian",arabic:"سَمِيعًا",tts:"سَمِيعَنْ",reading:"semîan",note:"Geçişte ‘an’ sesi",highlight:"ًا"},
    {id:"basirun",arabic:"بَصِيرٌ",tts:"بَصِيرُنْ",reading:"basîrün",note:"Tenvini belirgin duyur",highlight:"ٌ"}]},
  {day:2,slug:"tecvid-izhar",title:"İzhâr: Nûn Sesini Açık Okuma",shortTitle:"İzhâr",category:"Nûn-i Sâkin",color:"#17756a",summary:"Sakin nûn veya tenvinden sonra boğaz harfleri geldiğinde sesi gizlemeden açıkça oku.",instruction:"Yeşil nûn sesini net çıkar; sonraki boğaz harfine geçerken araya geniz uzatması ekleme.",rule:"İzhâr harfleri ء ه ع ح غ خ’dir. Nûn-i sâkin veya tenvin bu harflerden önce açık okunur.",theory:["İzhâr ‘açığa çıkarmak’ demektir. Sakin nûn veya tenvinden sonra altı boğaz harfinden biri geldiğinde nûn sesi kendi mahrecinde açıkça duyurulur.","İzhârda nûn sesi sonraki harfe katılmaz ve gizlenmez. Dil ucu nûn mahrecini kısa biçimde tamamlar; ardından boğaz harfine ayrı ve temiz bir geçiş yapılır.","Öğrenciler çoğu zaman iki kelime arasındaki nûn sesini aceleyle yutar. Doğru çalışmada önce iki kelime ayrı okunur, sonra aradaki boşluk azaltılarak tek akış kurulmalıdır.","Boğaz harfinin sert veya yumuşak oluşu nûn sesini değiştirmez. Amaç, her iki harfin de hakkını koruyarak abartısız bir geçiş yapmaktır."],examples:[
    {id:"min-hadin",arabic:"مِنْ هَادٍ",reading:"min hâdin",note:"Nûn, hâ’dan önce açık",highlight:"نْ ه"},
    {id:"min-ilmin",arabic:"مِنْ عِلْمٍ",reading:"min ilmin",note:"Nûn, ayn’dan önce açık",highlight:"نْ ع"},
    {id:"alimun-hakim",arabic:"عَلِيمٌ حَكِيمٌ",reading:"alîmün hakîm",note:"Tenvin, hâ’dan önce açık",highlight:"ٌ ح"}],practice:[
    {id:"enamte",arabic:"أَنْعَمْتَ",reading:"en‘amte",note:"Nûn ile ayn’ı ayır",highlight:"نْع"},
    {id:"min-hayrin",arabic:"مِنْ خَيْرٍ",reading:"min hayrin",note:"Nûn açık, hı kalın",highlight:"نْ خ"},
    {id:"selamun-hiye",arabic:"سَلَامٌ هِيَ",reading:"selâmün hiye",note:"Tenvini duyur",highlight:"ٌ ه"},
    {id:"azizun-gafur",arabic:"عَزِيزٌ غَفُورٌ",reading:"azîzün gafûr",note:"Tenvinden ğayn’a geç",highlight:"ٌ غ"}]},
  {day:3,slug:"tecvid-idgam-meal-gunne",title:"İdğâm-ı Maalğunne",shortTitle:"Geniz sesli idğâm",category:"İdğâm",color:"#7c5a93",summary:"Nûn-i sâkin veya tenvini ي ن م و harflerine geniz sesiyle birleştir.",instruction:"Mor bölümü iki vuruşluk hafif geniz sesiyle birleştir; arada ayrı bir nûn bırakma.",rule:"ي ن م و harflerinden önce gelen nûn-i sâkin veya tenvin, çoğunlukla iki hareke gunneyle idğâm edilir.",theory:["İdğâm, bir harfi kendisinden sonraki harfe katmak demektir. Maalğunne türünde sakin nûn veya tenvin, ي ن م و harflerinden biriyle karşılaşınca ayrı bir nûn olarak okunmaz.","Birleşme sırasında ses burun boşluğunda yaklaşık iki hareke tutulur. Bu tutuş şarkı söyler gibi uzatılmamalı; düzenli iki vuruşluk bir geniz sesi olmalıdır.","Mîm ve nûn ile birleşmede gunne daha kolay fark edilir. Vav ve yâ ile geçişte ise nûn sesini tamamen kaybetmeden, geniz niteliğini koruyarak akıcı bağ kurulur.","İki kelimeyi önce yavaşça birleştirmek, sonra aynı ölçüyü bozmadan normal tempoya yaklaşmak en güvenli çalışma yöntemidir."],examples:[
    {id:"men-yamel",arabic:"مَنْ يَعْمَلْ",reading:"mey-ya‘mel",note:"Nûn, yâ’ya gunneyle katılır",highlight:"نْ ي"},
    {id:"min-nurin",arabic:"مِنْ نُورٍ",reading:"min-nûrin",note:"Nûn, nûn’a katılır",highlight:"نْ ن"},
    {id:"min-malin",arabic:"مِنْ مَالٍ",reading:"mim-mâlin",note:"Nûn, mîm’e yaklaşır",highlight:"نْ م"}],practice:[
    {id:"min-valin",arabic:"مِنْ وَالٍ",reading:"miv-vâlin",note:"Vav’a geniz sesiyle geç",highlight:"نْ و"},
    {id:"hayran-yereh",arabic:"خَيْرًا يَرَهُ",reading:"hayray-yereh",note:"Tenvin yâ’ya katılır",highlight:"ًا ي"},
    {id:"yevmeizin-naime",arabic:"يَوْمَئِذٍ نَاعِمَةٌ",reading:"yevmeizin-nâimeh",note:"İki hareke gunne",highlight:"ٍ ن"},
    {id:"rahimetun-ve",arabic:"رَحْمَةٌ وَاسِعَةٌ",reading:"rahmetüv-vâsia",note:"Tenvinden vav’a bağla",highlight:"ٌ و"}]},
  {day:4,slug:"tecvid-idgam-bila-gunne",title:"İdğâm-ı Bilâğunne",shortTitle:"Gunnesiz idğâm",category:"İdğâm",color:"#b65f38",summary:"Nûn-i sâkin veya tenvini ل ve ر harflerine geniz sesi yapmadan kat.",instruction:"Turuncu geçişi tek harf gibi bağla; sesi burunda tutmadan lâm veya râ mahrecine geç.",rule:"ل ve ر harflerinden önce gelen nûn-i sâkin veya tenvin, gunne yapılmadan idğâm edilir.",theory:["Bilâğunne ‘gunnesiz’ demektir. Sakin nûn veya tenvinden sonra lâm ya da râ geldiğinde nûn sesi bu harfe katılır ve ayrıca geniz sesi tutulmaz.","Dil, nûn mahrecinde beklemeden lâm veya râ’nın mahrecine yönelir. Böylece iki kelime tek akışta birleşir; fakat önceki kelimenin diğer sesleri korunur.","Bu kuralı maalğunne ile karıştırmamak önemlidir. ي ن م و grubunda iki hareke geniz sesi varken ل ر grubunda burun sesi özellikle uzatılmaz.","Râ’nın kalınlık-incelik özelliği kendi harekesine göre korunur. İdğâm yapmak, sonraki harfin temel ses özelliğini değiştirmez."],examples:[
    {id:"min-rabbihim",arabic:"مِنْ رَبِّهِمْ",reading:"mir-rabbihim",note:"Nûn, râ’ya gunnesiz katılır",highlight:"نْ ر"},
    {id:"min-ledunhu",arabic:"مِنْ لَدُنْهُ",reading:"mil-ledünhü",note:"Nûn, lâm’a katılır",highlight:"نْ ل"},
    {id:"gafurun-rahim",arabic:"غَفُورٌ رَحِيمٌ",reading:"gafûrur-rahîm",note:"Tenvinden râ’ya geç",highlight:"ٌ ر"}],practice:[
    {id:"huden-lil",arabic:"هُدًى لِلْمُتَّقِينَ",reading:"hüdel-lilmüttakîn",note:"Tenvin lâm’a katılır",highlight:"ًى ل"},
    {id:"hayrun-lekum",arabic:"خَيْرٌ لَكُمْ",reading:"hayrul-leküm",note:"Gunne yapma",highlight:"ٌ ل"},
    {id:"min-rahmetin",arabic:"مِنْ رَحْمَةٍ",reading:"mir-rahmetin",note:"Râ’ya doğrudan geç",highlight:"نْ ر"},
    {id:"tevvabun-rahim",arabic:"تَوَّابٌ رَحِيمٌ",reading:"tevvâbur-rahîm",note:"Tenvin ayrı duyulmaz",highlight:"ٌ ر"}]},
  {day:5,slug:"tecvid-iklab",title:"İklâb: Nûn Sesini Mîm’e Çevirme",shortTitle:"İklâb",category:"Nûn-i Sâkin",color:"#cf4678",summary:"Sakin nûn veya tenvinden sonra ب geldiğinde sesi gizli bir mîm’e çevir.",instruction:"Pembe bölüme gelince dudakları tamamen sıkmadan iki hareke geniz sesi oluştur.",rule:"ب harfinden önceki nûn-i sâkin veya tenvin, gizli bir mîm sesine çevrilerek gunneyle okunur.",theory:["İklâb ‘çevirmek’ demektir. Sakin nûn veya tenvinden sonra ب harfi geldiğinde nûn sesi, telaffuz bakımından gizli bir mîm sesine dönüştürülür.","Mîm ile bâ aynı dudak bölgesini kullandığı için geçiş dudaklarda hazırlanır. Dudaklar mîm için hafifçe yaklaşır, yaklaşık iki hareke geniz sesi korunur ve ardından bâ okunur.","Mushaflarda bu kural bazen nûn veya tenvin üzerinde küçük bir mîm işaretiyle gösterilir. İşaret, yazının değiştiği değil okuyuşun mîm’e yaklaştığı anlamına gelir.","Dudakları uzun süre kapatmak ya da açık bir ‘min’ sesi söylemek iki yaygın hatadır. Doğru ses kısa, kontrollü ve bâ’ya bağlıdır."],examples:[
    {id:"min-badi",arabic:"مِنْ بَعْدِ",reading:"mim-ba‘di",note:"Nûn gizli mîm’e dönüşür",highlight:"نْ ب"},
    {id:"semiun-basir",arabic:"سَمِيعٌ بَصِيرٌ",reading:"semîum-basîr",note:"Tenvin bâ’dan önce iklâb",highlight:"ٌ ب"},
    {id:"enbihum",arabic:"أَنْبِئْهُمْ",reading:"embi’hum",note:"Nûn ile bâ arasında gizli mîm",highlight:"نْب"}],practice:[
    {id:"lenesfean",arabic:"لَنَسْفَعًا بِالنَّاصِيَةِ",reading:"lenesfeam-bin-nâsiyeh",note:"Tenvini mîm’e çevir",highlight:"ًا ب"},
    {id:"min-beyni",arabic:"مِنْ بَيْنِ",reading:"mim-beyni",note:"İki hareke gunne",highlight:"نْ ب"},
    {id:"alimun-bi",arabic:"عَلِيمٌ بِذَاتِ",reading:"alîmum-bizâti",note:"Dudak geçişini fark et",highlight:"ٌ ب"},
    {id:"kavmen-bura",arabic:"قَوْمًا بُورًا",reading:"kavmem-bûrâ",note:"Tenvinden bâ’ya bağla",highlight:"ًا ب"}]},
  {day:6,slug:"tecvid-ihfa",title:"İhfâ: Nûn Sesini Gizleme",shortTitle:"İhfâ",category:"Nûn-i Sâkin",color:"#2d79a5",summary:"Nûn-i sâkin veya tenvini on beş ihfâ harfinden önce açık okumadan, iki hareke gizle.",instruction:"Mavi bölümde dil ucunu nûn mahrecine tam değdirme; geniz sesini iki düzenli vuruş tut.",rule:"ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك harflerinden önce nûn-i sâkin veya tenvin ihfâ edilir.",theory:["İhfâ ‘gizlemek’ demektir. Sakin nûn veya tenvin, on beş ihfâ harfinden biriyle karşılaştığında ne izhâr kadar açık ne de idğâm kadar birleşik okunur.","Dil ucu nûn mahrecine tam olarak değmez; ses burun boşluğunda iki hareke tutulurken ağız sonraki harfin mahrecine hazırlanır.","Gunnenin kalınlığı sonraki harften etkilenebilir. Özellikle ق ص ط ظ ض gibi kalın harflerden önce ses daha dolgun, ince harflerden önce daha ince duyulur.","İhfâ harfleri çok olduğu için kural en iyi bol örnekle yerleşir. Her örnekte önce nûn veya tenvini bul, sonra gelen harfi tanı ve iki vuruşluk gunneyi uygula."],examples:[
    {id:"min-serri",arabic:"مِنْ شَرِّ",reading:"min-şerri",note:"Nûn, şîn’den önce gizli",highlight:"نْ ش"},
    {id:"min-kablu",arabic:"مِنْ قَبْلُ",reading:"min-kablü",note:"Kalın ihfâ sesi",highlight:"نْ ق"},
    {id:"enfusekum",arabic:"أَنْفُسَكُمْ",reading:"enfüseküm",note:"Nûn, fâ’dan önce gizli",highlight:"نْف"}],practice:[
    {id:"kavmen-zalimin",arabic:"قَوْمًا ظَالِمِينَ",reading:"kavmen zâlimîn",note:"Tenvini iki hareke gizle",highlight:"ًا ظ"},
    {id:"rihan-sarsaran",arabic:"رِيحًا صَرْصَرًا",reading:"rîhan sarsarâ",note:"Sâd’dan önce kalın ihfâ",highlight:"ًا ص"},
    {id:"min-duni",arabic:"مِنْ دُونِ",reading:"min dûni",note:"Nûn, dâl’dan önce gizli",highlight:"نْ د"},
    {id:"insan",arabic:"إِنْسَانٌ",reading:"insânün",note:"Sîn’den önce ince ihfâ",highlight:"نْس"}]},
  {day:7,slug:"tecvid-mim-sakin",title:"Mîm-i Sâkin Kuralları",shortTitle:"Mîm-i sâkin",category:"Mîm-i Sâkin",color:"#168778",summary:"Sakin mîmin izhâr-ı şefevî, ihfâ-i şefevî ve idğâm-ı misleyn hâllerini ayırt et.",instruction:"Dudak hareketini izle; renkli geçişte kuralın açık, gizli veya birleşik oluşunu uygula.",rule:"Mîm-i sâkin, ب önünde ihfâ; م önünde idğâm; diğer harflerin önünde izhâr ile okunur.",theory:["Sakin mîm kuralları dudaklarla ilgili olduğu için ‘şefevî’ adıyla anılır. Sonraki harf, mîmin açık, gizli veya birleşik okunacağını belirler.","Mîmden sonra ب gelirse ihfâ-i şefevî yapılır: dudaklar hafifçe yaklaşır ve iki hareke gunne korunur. Mîmden sonra م gelirse iki mîm tek şeddeli mîm gibi birleşir.","ب ve م dışındaki harflerde mîm açık okunur; buna izhâr-ı şefevî denir. Özellikle ف ve و önünde mîm sesini kaybetmemeye dikkat edilir çünkü bu harfler de dudak bölgesine yakındır.","Ayna karşısında çalışmak dudak hareketini görünür kılar. Sesi abartmadan, mîm mahrecini kısa ve temiz biçimde tamamlamak hedeflenmelidir."],examples:[
    {id:"aleyhim-ma",arabic:"عَلَيْهِمْ مَا",reading:"aleyhim-mâ",note:"Mîm, mîm’e gunneyle katılır",highlight:"مْ م"},
    {id:"termihim-bi",arabic:"تَرْمِيهِمْ بِحِجَارَةٍ",reading:"termîhim-bi hicâratin",note:"Bâ önünde ihfâ-i şefevî",highlight:"مْ ب"},
    {id:"hum-fiha",arabic:"هُمْ فِيهَا",reading:"hüm fîhâ",note:"Fâ önünde mîm açık",highlight:"مْ ف"}],practice:[
    {id:"lehum-magrife",arabic:"لَهُمْ مَغْفِرَةٌ",reading:"lehüm-mağfireh",note:"İki mîmi birleştir",highlight:"مْ م"},
    {id:"hum-bi",arabic:"هُمْ بِهِ",reading:"hüm-bihî",note:"İki hareke gizle",highlight:"مْ ب"},
    {id:"em-lem",arabic:"أَمْ لَمْ",reading:"em lem",note:"Lâm önünde açık mîm",highlight:"مْ ل"},
    {id:"aleyhim-vela",arabic:"عَلَيْهِمْ وَلَا",reading:"aleyhim velâ",note:"Vav önünde mîmi kaybetme",highlight:"مْ و"}]},
  {day:8,slug:"tecvid-medler",title:"Medler ve Ölçülü Uzatma",shortTitle:"Medler",category:"Med",color:"#b98514",summary:"Tabiî meddi iki hareke; sebebe bağlı medleri öğretici ritimle ölçülü uzat.",instruction:"Altın renkli sesi iki vuruş say; kısa sesi uzatma, med harfini de erken kesme.",rule:"ا و ي med harfleri uygun harekeden sonra temel olarak iki hareke uzatılır; hemze veya sükûn süreyi artırabilir.",theory:["Med, sesi uzatmak demektir. Fethadan sonra elif, kesradan sonra sakin yâ, dammeden sonra sakin vav temel med harfleridir ve tabiî medde iki hareke uzatılır.","Hareke ölçüsü sabit bir saniye değildir; okuyuş temposundaki bir kısa ses vuruşudur. İki hareke, aynı tempoda iki düzenli vuruşla çalışılmalıdır.","Med harfinden sonra hemze veya sükûn gelmesi muttasıl, munfasıl, lâzım ve ârız gibi farklı hükümler doğurabilir. Başlangıçta önce iki harekelik temel ölçünün kulakta ve dilde yerleşmesi gerekir.","Uzatma sırasında sesin perdesini gereksiz değiştirmek veya sonuna yeni bir harf eklemek hatadır. Ses tek çizgide, rahat nefesle ve belirlenen süre kadar devam eder."],examples:[
    {id:"kale",arabic:"قَالَ",reading:"kâle",note:"Elif ile iki hareke",highlight:"قَا"},
    {id:"fi",arabic:"فِي",reading:"fî",note:"Yâ ile iki hareke",highlight:"فِي"},
    {id:"yekulu",arabic:"يَقُولُ",reading:"yekûlü",note:"Vav ile iki hareke",highlight:"قُو"}],practice:[
    {id:"cae",arabic:"جَاءَ",reading:"câe",note:"Hemze sebebiyle daha uzun",highlight:"جَاءَ"},
    {id:"dallin",arabic:"الضَّالِّينَ",reading:"ed-dâllîn",note:"Lâzım meddi ölçülü tut",highlight:"ضَّا"},
    {id:"nurun",arabic:"نُورٌ",tts:"نُورُنْ",reading:"nûrün",note:"Vav meddi ve tenvin",highlight:"نُو"},
    {id:"rahim",arabic:"رَحِيمٌ",tts:"رَحِيمُنْ",reading:"rahîmün",note:"Yâ meddini kesme",highlight:"حِي"}]},
  {day:9,slug:"tecvid-kalkale",title:"Kalkale: Sakin Harfi Canlı Okuma",shortTitle:"Kalkale",category:"Harf Sıfatı",color:"#c94f4f",summary:"ق ط ب ج د harfleri sakin olduğunda sesi hareke eklemeden hafifçe sektir.",instruction:"Kırmızı harfte sesi mahrecinde sıkıştırıp bırak; ‘e’ veya ‘ı’ gibi yeni bir hareke ekleme.",rule:"ق ط ب ج د harfleri cezimli veya vakıf sebebiyle sakin olduğunda kalkale yapılır.",theory:["Kalkale, belirli harfler sakin olduğunda mahreçte sıkışan sesin hafifçe açığa çıkarılmasıdır. Harfler ق ط ب ج د ifadesiyle hatırlanır.","Kalkale yeni bir hareke vermek değildir. Örneğin أَحَدْ kelimesinin sonunda ‘de’ denmez; dâl sesi kısa ve temiz bir yankıyla bırakılır.","Kelime ortasındaki kalkale daha hafif, duruş sebebiyle kelime sonundaki kalkale daha belirgin duyulabilir. Her durumda abartılı zıplatmadan kaçınılır.","Doğru çalışmada cezimli harften önceki hareke okunur, kalkale harfinin mahreci kurulur ve ses hemen serbest bırakılır. Sonraki harfe yeni bir hece eklenmeden geçilir."],examples:[
    {id:"ehad",arabic:"أَحَدْ",reading:"ehad",note:"Dâl üzerinde belirgin kalkale",highlight:"دْ"},
    {id:"yecal",arabic:"يَجْعَلْ",reading:"yec‘al",note:"Cîm sakin, hafif kalkale",highlight:"جْ"},
    {id:"etamehum",arabic:"أَطْعَمَهُمْ",reading:"et‘amehüm",note:"Tâ sakin, hareke ekleme",highlight:"طْ"}],practice:[
    {id:"akreb",arabic:"أَقْرَبُ",reading:"akrabu",note:"Kâf sakin",highlight:"قْ"},
    {id:"tebbet",arabic:"تَبَّتْ",reading:"tebbet",note:"Tâ ile duruş kalkalesi",highlight:"تْ"},
    {id:"yebtegi",arabic:"يَبْتَغِي",reading:"yebteğî",note:"Bâ sakin",highlight:"بْ"},
    {id:"mecid",arabic:"مَجِيدْ",reading:"mecîd",note:"Duruşta dâl kalkalesi",highlight:"دْ"}]},
  {day:10,slug:"tecvid-genel-uygulama",title:"Genel Uygulama: Râ, Lafzatullah ve Vakıf",shortTitle:"Büyük tekrar",category:"Genel Uygulama",color:"#244a70",summary:"Lafzatullahın lâmını, râ’nın kalınlık-inceliğini ve vakıf hâlindeki değişimleri birlikte uygula.",instruction:"Her kartta renkli bölümü tanı, kuralın adını söyle, yavaş sesi dinle ve ardından tek nefeste oku.",rule:"Önceki hareke lafzatullahın lâmını; râ’nın kendi harekesi kalınlık-inceliği; vakıf ise kelime sonunu belirler.",theory:["Allah lafzının lâmı, öncesinde üstün veya ötre varsa kalın; esre varsa ince okunur. Kelimeyi tek başına okumak yerine önceki kelimeyle birlikte çalışmak kuralı daha anlaşılır kılar.","Râ harfi genel olarak üstünlü ve ötreli olduğunda kalın, esreli olduğunda ince okunur. Sakin râ’da önceki hareke ve kelimenin yapısı değerlendirilir; ileri düzey istisnalar öğretmen eşliğinde pekiştirilmelidir.","Vakıf, uygun yerde sesi kesip nefes almaktır. Durulduğunda kelime sonundaki kısa hareke çoğunlukla sakinleşir; tenvin ve tâ-i merbûta gibi yapılarda özel değişimler görülebilir.","Son derste amaç kuralları ad olarak ezberlemekten çok metin üzerinde fark etmektir. Rengi gördükten sonra kuralı söyle, sesi dinle, aynı ölçüde tekrar et ve son turda renksiz okuyabileceğini kontrol et."],examples:[
    {id:"kalallah",arabic:"قَالَ اللَّهُ",reading:"kâlallâhu",note:"Üstünden sonra lâm kalın",highlight:"اللَّهُ"},
    {id:"bismillah",arabic:"بِسْمِ اللَّهِ",reading:"bismillâhi",note:"Esreden sonra lâm ince",highlight:"اللَّهِ"},
    {id:"rabbi",arabic:"رَبِّ",reading:"rabbi",note:"Üstünlü râ kalın",highlight:"رَ"}],practice:[
    {id:"firavne",arabic:"فِرْعَوْنَ",reading:"fir‘avne",note:"Esreden sonraki sakin râ ince",highlight:"رْ"},
    {id:"alemin-vakf",arabic:"الْعَالَمِينَ۝",tts:"الْعَالَمِينْ",reading:"el-âlemîn",note:"Vakf hâlinde son hareke düşer",highlight:"ينَ"},
    {id:"rahim-vakf",arabic:"رَحِيمٌ۝",tts:"رَحِيمْ",reading:"rahîm",note:"Durunca tenvin okunmaz",highlight:"ٌ"},
    {id:"fatiha-final",arabic:"غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",reading:"ğayril mağdûbi aleyhim ve led-dâllîn",note:"Râ, mîm-i sâkin ve medleri bul",highlight:"الضَّا"}]}
];

export const tecvidAudioPath = (lesson:TecvidLesson,sample:TecvidSample) => `/audio/tecvid/${lesson.slug}/${sample.id}.mp3`;
export const getTecvidLesson = (slug:string) => tecvidLessons.find(lesson=>lesson.slug===slug);
