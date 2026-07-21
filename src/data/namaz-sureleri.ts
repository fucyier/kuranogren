export type NamazAyeti = {
  number: number;
  arabic: string;
  shortMeaning: string;
  explanation: string;
};

export type NamazSuresi = {
  number: number;
  slug: string;
  name: string;
  arabicName: string;
  period: string;
  theme: string;
  context: string[];
  ayahs: NamazAyeti[];
};

type RawSure = Omit<NamazSuresi, "ayahs"> & {
  ayahs: [number, string, string, string][];
};

const sureler: RawSure[] = [
  {number:1,slug:"fatiha",name:"Fâtiha Suresi",arabicName:"الفاتحة",period:"Mekke dönemi · 7 ayet",theme:"Hamd, kulluk, dua ve doğru yol",context:["Fâtiha, Kur’an’ın ana mesajını dua diliyle özetler. Allah’ı tanıma, yalnız O’na kulluk etme ve doğru yolda kalma isteği sûrenin omurgasını oluşturur.","Sûrede önce Allah’ın rahmeti ve hükümranlığı anılır; ardından kulun sözüne geçilir. Böylece dua, sadece bir istek listesi değil bilinçli bir kulluk sözü hâline gelir."],ayahs:[
    [1,"بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ","Rahmân ve Rahîm olan Allah’ın adıyla.","Besmele, işe Allah’ın adıyla ve O’nun rahmetine güvenerek başlamayı öğretir. Rahmân ve Rahîm isimleri, ilâhî merhametin hem kuşatıcı hem sürekli oluşuna dikkat çeker."],
    [2,"الْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِينَ","Hamd, âlemlerin Rabbi Allah’a aittir.","Hamd yalnız bir teşekkür değildir; bütün güzellik ve yetkinliğin gerçek sahibini tanımaktır. ‘Rab’ ifadesi Allah’ın varlıkları aşama aşama yetiştirip gözettiğini bildirir."],
    [3,"الرَّحْمٰنِ الرَّحِيمِ","O, Rahmân’dır, Rahîm’dir.","Rahmet isimlerinin tekrarı, Allah-kul ilişkisinin korkudan önce merhamet ve umut zemininde kurulduğunu gösterir. Kul, hatasını fark ederken ümidini kaybetmez."],
    [4,"مَالِكِ يَوْمِ الدِّينِ","Hesap gününün sahibidir.","Bu ayet insanın davranışlarının sonuçsuz kalmayacağını hatırlatır. İlâhî adalet bilinci, günlük hayatta sorumluluk ve dürüstlüğü besler."],
    [5,"إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ","Yalnız sana kulluk eder, yalnız senden yardım dileriz.","İbadet ile yardım istemenin yan yana gelmesi, çaba ile tevekkülü dengeler. Çoğul anlatım, kulluğun toplumsal ve birleştirici yönünü de öne çıkarır."],
    [6,"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ","Bizi dosdoğru yola ilet.","Hidayet bir defada edinilip biten bilgi değil, her gün yenilenen yöneliştir. Kul doğruyu bilmek, istemek ve uygulayabilmek için Allah’tan rehberlik diler."],
    [7,"صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ","Nimet verdiklerinin yoluna; sapmışların ve gazaba uğrayanların yoluna değil.","Doğru yol soyut bırakılmaz; bilgiyi doğru davranışa dönüştüren örnek insanların yolu olarak açıklanır. Ayet, bilerek yanlış yapmakla bilgisizce yön kaybetmekten korunma duasıdır."]
  ]},
  {number:105,slug:"fil",name:"Fîl Suresi",arabicName:"الفيل",period:"Mekke dönemi · 5 ayet",theme:"Kâbe’nin korunması ve ilâhî kudret",context:["Fîl sûresi, Kâbe’yi yıkmak üzere Mekke’ye yürüyen fil ordusunun başarısızlığa uğratılmasını hatırlatır. Olay, ilk muhatapların bildiği yakın tarihten güçlü bir ibret olarak sunulur.","Ana mesaj, görünürdeki askerî ve maddî üstünlüğün mutlak güç olmadığıdır. Kutsala saldıran zorbalık, beklenmedik ve küçük görünen vasıtalarla boşa çıkarılabilir."],ayahs:[
    [1,"أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ","Rabbinin fil ordusuna ne yaptığını düşünmedin mi?","Soru, yalnız gözle görmeyi değil olayın anlamını kavramayı ister. Muhatap, yakın tarihteki bu hadiseden Allah’ın koruyucu kudretini okumaya çağrılır."],
    [2,"أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ","Onların planını boşa çıkarmadı mı?","Çok güçlü görünen planın hedefine ulaşamaması, sonucun yalnız araçların büyüklüğüne bağlı olmadığını gösterir. Haksız niyet, kendi hesabını kusursuz saysa da ilâhî iradeyi aşamaz."],
    [3,"وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ","Üzerlerine sürüler hâlinde kuşlar gönderdi.","Ayet, ordunun karşısına alışılmadık bir savunma çıkarıldığını bildirir. Küçük görülen varlıkların büyük bir zorbalığı durdurması, güç algısını tersine çevirir."],
    [4,"تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ","Onlara pişmiş balçıktan taşlar atıyorlardı.","Hadisenin somut sahnesi verilirken tehdidin kaynağının küçüklüğü ile ordunun büyüklüğü arasındaki tezat belirginleşir. İbret, kibirli gücün kırılganlığıdır."],
    [5,"فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ","Sonunda onları yenilip çiğnenmiş ekine çevirdi.","Son benzetme, güçlü ordunun tanınmaz hâle gelişini canlı bir görüntüyle anlatır. Zulmün kalıcı olmadığı ve kutsala yönelen saldırının ağır sonuç doğurduğu vurgulanır."]
  ]},
  {number:106,slug:"kureys",name:"Kureyş Suresi",arabicName:"قريش",period:"Mekke dönemi · 4 ayet",theme:"Nimet, güven ve şükür",context:["Kureyş sûresi, Mekke toplumunun kış ve yaz ticaret yolculukları sayesinde kazandığı düzeni hatırlatır. Ekonomik güven ile Kâbe’nin sağladığı saygınlık birbirinden kopuk değildir.","Sûre nimeti saymakla yetinmez; nimetin sahibini tanımaya ve kulluğa yönelmeye çağırır. Güven ve rızık, şükür sorumluluğu doğurur."],ayahs:[
    [1,"لِإِيلَافِ قُرَيْشٍ","Kureyş’in güven ve alışkanlığı için...","‘Îlâf’, alışma, uzlaşma ve güvenli düzen kurma anlamlarını taşır. Ayet, Kureyş’in toplumsal ve ticari istikrarını düşünmeye açılan bir giriş niteliğindedir."],
    [2,"إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ","Kış ve yaz yolculuklarına alışmaları için...","Mevsimlik seferler, rızkın emek ve planlamayla aranmasına işaret eder. Ancak yolların güvenliği ve emeğin sonuç vermesi de başlı başına bir nimettir."],
    [3,"فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ","Öyleyse bu evin Rabbine kulluk etsinler.","Kâbe’nin itibarı sayesinde elde edilen güven, Kâbe’nin Rabbi’ne kullukla karşılık bulmalıdır. Ayet nimetten nimeti verene doğru bilinçli bir geçiş kurar."],
    [4,"الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ","O, onları açlıktan doyurdu ve korkudan güvene kavuşturdu.","Beslenme ve güven insan hayatının iki temel ihtiyacıdır. Ayet, sıradanlaşan bu iki nimeti görünür kılar ve şükrün yalnız sözle değil sorumlu davranışla gösterilmesini ister."]
  ]},
  {number:107,slug:"maun",name:"Mâûn Suresi",arabicName:"الماعون",period:"Mekke dönemi · 7 ayet",theme:"Samimi ibadet ve sosyal sorumluluk",context:["Mâûn sûresi, inanç iddiası ile ahlâkî davranış arasındaki bağı kurar. Yetimi itmek, yoksulu görmezden gelmek ve gösteriş için ibadet etmek aynı duyarsızlığın farklı yüzleri olarak ele alınır.","Sûrenin sonunda anılan küçük yardımlar, iyiliğin yalnız büyük bağışlardan ibaret olmadığını gösterir. Gündelik paylaşım ve komşuluk da dinî sorumluluğun parçasıdır."],ayahs:[
    [1,"أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ","Hesap ve karşılık gününü yalanlayanı gördün mü?","Soru, inkârın sadece sözde değil davranışta nasıl göründüğünü araştırmaya çağırır. Sonraki ayetler, hesap bilincinin sosyal ahlâka yansıması gerektiğini açıklar."],
    [2,"فَذَلِكَ الَّذِي يَدُعُّ الْيَتِيمَ","İşte o, yetimi sertçe iter.","Korunmaya en çok ihtiyaç duyan yetime karşı kabalık, merhamet eksikliğinin açık göstergesidir. Ayet, güçsüzün onurunu korumayı imanî sorumluluk sayar."],
    [3,"وَلَا يَحُضُّ عَلَى طَعَامِ الْمِسْكِينِ","Yoksulu doyurmaya teşvik etmez.","Sorumluluk kişinin kendi yardımından öteye uzanır; başkalarını da iyiliğe teşvik etmek gerekir. Sessiz ilgisizlik, toplumsal yoksulluğun sürmesine katkı sağlayabilir."],
    [4,"فَوَيْلٌ لِلْمُصَلِّينَ","Yazıklar olsun o namaz kılanlara...","Uyarı namazın kendisine değil, onu anlamından koparan tutuma yöneliktir. Devamındaki ayetler, ibadetin bilinç ve samimiyetle değer kazandığını gösterir."],
    [5,"الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ","Onlar namazlarının bilincinden uzaktırlar.","Namazı önemsememek, vaktini ve anlamını sürekli ihmal etmek eleştirilir. İbadetin davranışı güzelleştirmesi beklenir; yalnız biçim yeterli değildir."],
    [6,"الَّذِينَ هُمْ يُرَاءُونَ","Onlar gösteriş yaparlar.","İyiliği insanların beğenisi için yapmak, ibadetin yönünü Allah’tan toplumsal itibara çevirir. Ayet niyet denetimini ve içtenliği öne çıkarır."],
    [7,"وَيَمْنَعُونَ الْمَاعُونَ","En küçük yardımı bile esirgerler.","Mâûn, gündelik hayatta ödünç verilen veya paylaşılan küçük yararlar olarak açıklanır. Gerçek dindarlık, yakındaki insanın basit ihtiyacına duyarsız kalamaz."],
  ]},
  {number:108,slug:"kevser",name:"Kevser Suresi",arabicName:"الكوثر",period:"Mekke dönemi · 3 ayet",theme:"Bol nimet, namaz ve teslimiyet",context:["Kevser sûresi, sıkıntı ve incitici sözlerle karşılaşan Hz. Peygamber’e büyük ve sürekli hayırlar verildiğini müjdeler. Kısa sûrede teselli, şükür ve güven güçlü biçimde birleşir.","Verilen nimetin karşılığı namaz ve kurbanla, yani içten kulluk ve paylaşma bilinciyle gösterilir. Değerin ölçüsü insanların küçümsemesi değil Allah’ın lütfudur."],ayahs:[
    [1,"إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ","Şüphesiz sana Kevser’i, pek çok hayrı verdik.","Kevser; çok hayır, bereket ve cennette bir ırmak anlamlarıyla açıklanmıştır. Ayet, darlık duygusunun karşısına Allah’ın geniş ikramını koyar."],
    [2,"فَصَلِّ لِرَبِّكَ وَانْحَرْ","Öyleyse Rabbin için namaz kıl ve kurban kes.","Nimet şükür doğurur; şükür de yalnız söz değil ibadet ve paylaşmadır. ‘Rabbin için’ vurgusu, ibadetin gösterişten arınmasını ister."],
    [3,"إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ","Asıl adı ve izi kesilecek olan sana kin duyandır.","Hz. Peygamber’i değersiz göstermeye çalışanların iddiası tersine çevrilir. Kalıcı değer, hakikate bağlılık ve hayırlı iz bırakmakla oluşur."],
  ]},
  {number:109,slug:"kafirun",name:"Kâfirûn Suresi",arabicName:"الكافرون",period:"Mekke dönemi · 6 ayet",theme:"Tevhid ve inançta açıklık",context:["Kâfirûn sûresi, inançların pazarlık konusu yapılmasına açık bir cevap verir. Barış içinde yaşamakla ibadetin özünü birbirine karıştırmamak gerektiğini öğretir.","Tekrarlar, tavrın anlık değil kararlı olduğunu vurgular. Sûre başka inanç mensuplarına hakaret değil, tevhid inancının sınırlarını açıkça bildiren bir metindir."],ayahs:[
    [1,"قُلْ يَا أَيُّهَا الْكَافِرُونَ","De ki: Ey inkârcılar!","‘De’ emri, açıklamanın kişisel öfkeye değil vahyin yönlendirmesine dayandığını gösterir. Muhatap doğrudan çağrılır ve konu belirsiz bırakılmaz."],
    [2,"لَا أَعْبُدُ مَا تَعْبُدُونَ","Sizin kulluk ettiklerinize kulluk etmem.","Tevhid, ibadetin yalnız Allah’a yöneltilmesidir. Ayet, ortak ve dönüşümlü ibadet teklifini kesin biçimde reddeder."],
    [3,"وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ","Siz de benim kulluk ettiğime kulluk etmiyorsunuz.","İbadette kullanılan isimler benzer görünse bile inanç içeriğinin farklı olabileceği belirtilir. Gerçek birliktelik, temel inancı belirsizleştirmekle kurulamaz."],
    [4,"وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ","Ben de sizin kulluk ettiklerinize kulluk edecek değilim.","İfade gelecek zamana uzanan kararlılığı pekiştirir. Baskı veya çıkar, inancın yönünü değiştirmemelidir."],
    [5,"وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ","Siz de benim kulluk ettiğime kulluk edecek değilsiniz.","Tekrar, uzlaşma teklifinin inançları gerçekten birleştirmediğini vurgular. Tarafların farklılığı dürüstçe kabul edilir."],
    [6,"لَكُمْ دِينُكُمْ وَلِيَ دِينِ","Sizin dininiz size, benim dinim bana.","Son ayet zorlamayı ve sahte uzlaşmayı dışarıda bırakır. İnançta açıklık korunurken insanların tercih ve sorumluluklarının kendilerine ait olduğu bildirilir."],
  ]},
  {number:110,slug:"nasr",name:"Nasr Suresi",arabicName:"النصر",period:"Medine dönemi · 3 ayet",theme:"Zafer karşısında tevazu",context:["Nasr sûresi, ilâhî yardımın ve Mekke’nin fethinin ardından insanların İslâm’a topluluklar hâlinde girişini haber verir. Başarı anında bile insanın kendini merkeze koymaması öğretilir.","Zaferin karşılığı övünmek değil tesbih, hamd ve istiğfardır. Böylece başarı, tevazuyu ve öz denetimi artıran bir imtihana dönüşür."],ayahs:[
    [1,"إِذَا جَاءَ نَصْرُ اللّٰهِ وَالْفَتْحُ","Allah’ın yardımı ve fetih geldiğinde...","Yardım ve fetih Allah’a nispet edilir; başarı tek başına insan gücünün ürünü sayılmaz. Bu bilinç, sonuç alındığında kibri engeller."],
    [2,"وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللّٰهِ أَفْوَاجًا","İnsanların bölük bölük Allah’ın dinine girdiğini gördüğünde...","Mesajın toplumda geniş kabul görmesi büyük bir dönüşümdür. Ayet, bu gelişmenin de bir son değil yeni sorumlulukların başlangıcı olduğunu sezdirir."],
    [3,"فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا","Rabbini hamd ile tesbih et, O’ndan bağışlanma dile; O tövbeleri kabul edendir.","Başarı sonrasında tesbih ve istiğfar emri, eksikleri görmeyi ve nimetin sahibini unutmamayı öğretir. Allah’ın tövbeleri kabul edişi umut kapısını açık tutar."],
  ]},
  {number:111,slug:"tebbet",name:"Tebbet Suresi",arabicName:"المسد",period:"Mekke dönemi · 5 ayet",theme:"Düşmanlık, kibir ve servetin yetersizliği",context:["Tebbet veya Mesed sûresi, Hz. Peygamber’e yakınlığına rağmen hakikate şiddetle karşı çıkan Ebû Leheb ve eşinin tutumunu örnek verir. Soy yakınlığının iman ve ahlâk yerine geçmeyeceği vurgulanır.","Servet, sosyal konum ve ortak kötülük insanı nihai sonuçtan koruyamaz. Sûre kişileri anarken onların temsil ettiği kibir, eziyet ve engelleme davranışlarını mahkûm eder."],ayahs:[
    [1,"تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ","Ebû Leheb’in elleri kurusun; kendisi de hüsrana uğradı.","‘Eller’ insanın gücünü ve yaptığı işleri temsil eder. Hakikati engellemek için kullanılan imkânların sonuçsuz kalacağı kesin bir dille bildirilir."],
    [2,"مَا أَغْنَى عَنْهُ مَالُهُ وَمَا كَسَبَ","Malı ve kazandıkları ona yarar sağlamadı.","Servet ve toplumsal kazanımlar ahlâkî sorumluluğu ortadan kaldırmaz. Ayet, insan değerini sahip olduklarıyla ölçme yanılgısını düzeltir."],
    [3,"سَيَصْلَى نَارًا ذَاتَ لَهَبٍ","Alevli bir ateşe girecektir.","Kurduğu düşmanlık ile karşılaşacağı sonuç arasında ‘alev’ üzerinden çarpıcı bir ilişki kurulur. Uyarı, kötülüğün sonuç taşıdığını bildirir."],
    [4,"وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ","Odun taşıyan karısı da...","Eşinin düşmanlığı besleyen ve eziyete katkı veren rolü anlatılır. Kötülüğe ortak olmak, onu doğrudan yapmak kadar sorumluluk doğurabilir."],
    [5,"فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ","Boynunda bükülmüş liften bir ip olduğu hâlde.","Canlı tasvir, kibir ve eziyetin insanı bağlayan sonucunu görünür kılar. Dünyada üstünlük simgesi sayılan şeylerin ahirette kurtuluş sağlamayacağı vurgulanır."],
  ]},
  {number:112,slug:"ihlas",name:"İhlâs Suresi",arabicName:"الإخلاص",period:"Mekke dönemi · 4 ayet",theme:"Allah’ın birliği ve eşsizliği",context:["İhlâs sûresi, Allah tasavvurunu kısa ve kesin cümlelerle arındırır. Allah tektir, her şey O’na muhtaçtır; O ise hiçbir şeye muhtaç değildir.","Doğurma, doğurulma ve benzerlik gibi yaratılmışlara ait özellikler Allah hakkında reddedilir. Sûre tevhid inancının temel ölçülerini verir."],ayahs:[
    [1,"قُلْ هُوَ اللّٰهُ أَحَدٌ","De ki: O Allah birdir.","‘Ehad’, Allah’ın sayı dizisindeki bir gibi değil eşi ve parçası bulunmayan mutlak tek olduğunu anlatır. Tevhid bütün kulluğun temelidir."],
    [2,"اللّٰهُ الصَّمَدُ","Allah Samed’dir; herkes O’na muhtaçtır, O hiçbir şeye muhtaç değildir.","Samed ismi, bütün ihtiyaçların yöneldiği mutlak dayanağı ifade eder. İnsan sınırlılığını fark ederken güvenini yaratılmışlardan nihai olarak Allah’a yöneltir."],
    [3,"لَمْ يَلِدْ وَلَمْ يُولَدْ","Doğurmamış ve doğurulmamıştır.","Allah yaratılmışlardaki soy ve nesil ilişkilerinden münezzehtir. O’nun varlığı başka bir kaynağa bağlı olmadığı gibi devamı da evlada bağlı değildir."],
    [4,"وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ","Hiçbir şey O’na denk değildir.","İnsan zihnindeki bütün benzetmelerin sınırı çizilir. Allah’ı yaratılmışlara benzetmeden tanımak, sûrenin tevhid öğretisini tamamlar."],
  ]},
  {number:113,slug:"felak",name:"Felak Suresi",arabicName:"الفلق",period:"Mekke dönemi · 5 ayet",theme:"Dış kötülüklerden Allah’a sığınma",context:["Felak sûresi, insanın kontrol edemediği dış tehditler karşısında Allah’a sığınmasını öğretir. Sığınma, tedbiri bırakmak değil korkunun insanı yönetmesine izin vermeden doğru dayanağa yönelmektir.","Genel kötülükten gecenin karanlığına, bozguncu uygulamalardan kıskançlığa uzanan örnekler, görünen ve görünmeyen zararları kapsar."],ayahs:[
    [1,"قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ","De ki: Sabah aydınlığının Rabbine sığınırım.","Karanlığı yarıp aydınlığı çıkaran Allah’a yönelmek güçlü bir umut imgesidir. Sığınma sözü, korku anında kalbin yönünü belirler."],
    [2,"مِنْ شَرِّ مَا خَلَقَ","Yarattıklarının verebileceği kötülükten...","Yaratılmışlar kendi başlarına mutlak güç sahibi değildir; fakat yanlış kullanım veya zarar ihtimali taşırlar. Kul bu genel tehlikelerden yaratıcıya sığınır."],
    [3,"وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ","Karanlığı çöktüğünde gecenin kötülüğünden...","Gece, belirsizlik ve gizlenmiş tehlike duygusunu temsil eder. Ayet insanın kaygısını inkâr etmeden onu güvenli bir duaya dönüştürür."],
    [4,"وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ","Düğümlere üfleyenlerin kötülüğünden...","İnsanlara gizli yollarla zarar vermeyi amaçlayan bozguncu uygulamalardan korunma istenir. Mümin, hurafeye teslim olmak yerine Allah’a güvenip meşru tedbir alır."],
    [5,"وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ","Kıskanç kişi kıskançlığını eyleme döktüğünde onun kötülüğünden...","Her imrenme zarar değildir; tehlike, hasedin başkasındaki nimeti yok etmeye yönelmesidir. Ayet hem dışarıdan gelecek zarara karşı sığınmayı hem kalbi hasetten arındırmayı düşündürür."],
  ]},
  {number:114,slug:"nas",name:"Nâs Suresi",arabicName:"الناس",period:"Mekke dönemi · 6 ayet",theme:"Vesvese ve iç kötülüklerden sığınma",context:["Nâs sûresi, insanın düşünce ve iradesini içeriden etkileyen vesveselere karşı Allah’a sığınmasını öğretir. Allah; insanların Rabbi, hükümdarı ve ilâhı olarak üç nitelikle anılır.","Vesvesenin gizlice gelip geri çekilmesi, yanlış düşüncelerin kalıcı kimlik olmadığını hatırlatır. Kaynak cinlerden de insanlardan da gelebilir; çözüm bilinç, dua ve doğru çevredir."],ayahs:[
    [1,"قُلْ أَعُوذُ بِرَبِّ النَّاسِ","De ki: İnsanların Rabbine sığınırım.","Rab ismi, insanı yetiştiren ve gözeten Allah’a yönelişi ifade eder. Vesvese karşısında kul sahipsiz olmadığını hatırlar."],
    [2,"مَلِكِ النَّاسِ","İnsanların hükümdarına...","Mutlak yönetim Allah’a aittir. İnsanın zihninde büyüttüğü korkular ve baskılar nihai otorite değildir."],
    [3,"إِلَهِ النَّاسِ","İnsanların ilâhına...","Sığınmanın kulluk boyutu tamamlanır: güven ve ibadet yalnız Allah’a yöneltilir. Rab, melik ve ilâh isimleri bütüncül bir koruma bilinci kurar."],
    [4,"مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ","Sinsi vesvesecinin kötülüğünden...","Vesvese kalbe tekrar tekrar gelen fakat Allah anıldığında geri çekilebilen telkin olarak tasvir edilir. Düşünceyi fark etmek, ona teslim olmamanın ilk adımıdır."],
    [5,"الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ","O, insanların iç dünyalarına vesvese verir.","Yanlış telkin çoğu zaman açık emir gibi değil belirsiz kuşku şeklinde gelir. Ayet, insanın iç konuşmasını ahlâk ve vahiy ölçüsüyle denetlemesini öğretir."],
    [6,"مِنَ الْجِنَّةِ وَالنَّاسِ","Cinlerden de insanlardan da olabilir.","Olumsuz etki görünmeyen varlıklardan veya insan çevresinden gelebilir. Son ayet, arkadaş, içerik ve düşünce kaynaklarını dikkatle seçme sorumluluğunu da hatırlatır."],
  ]},
];

export const namazSureleri: NamazSuresi[] = sureler.map((sure) => ({
  ...sure,
  ayahs: sure.ayahs.map((ayah) => ({
    number: ayah[0] as number,
    arabic: ayah[1] as string,
    shortMeaning: ayah[2] as string,
    explanation: ayah[3] as string,
  })),
}));

export const sureSourceUrl = (sure: NamazSuresi) =>
  `https://kuran.diyanet.gov.tr/tefsir/sure/${sure.number}-${sure.slug === "kureys" ? "kureys" : sure.slug}-suresi`;

export const ayetAudioPath = (sure: NamazSuresi, ayahNumber: number) =>
  `/audio/namaz-sureleri/${sure.slug}/ayet-${String(ayahNumber).padStart(2, "0")}.mp3`;

export function findNamazSuresi(slug: string) {
  return namazSureleri.find((sure) => sure.slug === slug);
}
