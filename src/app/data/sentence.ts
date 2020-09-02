import { Sentence, NavbarTab } from '../models/vocabulary';

export const NAVBAR_ENGLISH_TABS: NavbarTab = {
  language: 'language',
  logout: 'logout',
};

export const HEBREW: Sentence = {
  applicationName: 'תרגום מיידי',
  send: 'שליחה',
  translate: 'תרגום',
  translationH2: 'כתוב או הגה את המשפט לתרגום',
  thanks: 'Pôle Emploi תודה',
  listen: 'להקשיב',
  recordText: 'דבר עכשיו',
  displayedWelcome: 'אני המתרגם שלך להחליף בקלות עם היועץ שלך.',
  readedWelcome: 'האם אתה רוצה להמשיך בשפה זו?',
  autoListen: 'האזן אוטומטית',
  rate: {
    easyToUse: 'האם כלי זה קל לשימוש?',
    understand: 'האם כלי זה עזר לנו להבין אחד את השני?',
    comment: 'תגובה חינם',
    offerLinked: 'האם מושא חילופי דברים זה קשור לשירותים המוצעים על ידי Pôle Emploi?',
  },
};

export const ARAB: Sentence = {
  applicationName: 'الترجمة الفورية',
  displayedWelcome: 'مرحبا انا تفسيرك',
  readedWelcome: 'هل ترغب في التبادل بهذه اللغة؟',
  send: 'إرسال',
  translate: 'ترجمة',
  translationH2: 'اكتب أو انطق الجملة لترجمتها',
  thanks: 'بول إمبلوي شكرا لك',
  listen: 'استمع',
  recordText: 'تكلم الان',
  languageButtonRAW: 'اللغة العربية',
  languageButtonFR: 'langue arabe',
  audioSupported: true,
  rate: {
    easyToUse: 'هل هذه الأداة سهلة الاستخدام؟',
    understand: 'هل تسمح لك هذه الأداة بالحوار بسهولة مع المحاور؟',
    comment: 'تعليق مجاني',
    offerLinked: 'هل موضوع هذا التبادل مرتبط بالخدمات التي يقدمها Pôle Emploi؟',
  },
};

export const FRENCH: Sentence = {
  audioSupported: true,
  applicationName: 'Traduction instantanée',
  send: 'Envoyer',
  translate: 'Traduction',
  translationH2: 'Ecrire ou prononcer la phrase à traduire',
  thanks: 'Pôle Emploi vous remercie',
  listen: 'Ecouter',
  recordText: 'Parlez maintenant',
  displayedWelcome: 'Je suis votre traducteur pour échanger facilement avec votre conseiller.',
  readedWelcome: 'Voulez-vous continuer dans cette langue ?',
  rate: {
    easyToUse: 'Est-ce que cet outil est facile à utiliser ?',
    understand: 'Est-ce que cet outil vous a permis de dialoguer facilement avec votre interlocuteur ?',
    comment: 'Commentaire libre',
    offerLinked: 'Est-ce que l’objet de cet échange est lié à l’offre de services de Pôle Emploi ?',
  },
  gdpr:{
    privacityText:"Nous stockons et accédons aux informations sur un appareil, telles que les cookies et traitons les données personnelles pour la mesure du contenu et les informations d'audience, ainsi que pour développer et améliorer les produits.\n\nVous pouvez cliquer pour consentir à notre traitement comme décrit ci-dessus.\nVous pouvez également cliquer pour refuser de donner votre consentement ou accéder à des informations plus détaillées et modifier vos préférences avant de consentir.\nVeuillez noter que certains traitements de vos données personnelles peuvent ne pas nécessiter votre consentement, mais vous avez le droit de vous opposer à un tel traitement.",
    confirmTitle: "Usages spéciaux et fonctionnalités",
    confirmText:"Nous utilisons la technologie de cryptage 256-AES pour crypter les données telles que les conversations envoyées à notre produit. Cela signifie que tous les messages que vous envoyez sont cryptés et sécurisés. Tout cela se produit automatiquement : pas besoin d'activer les paramètres ou de configurer une requête spéciale pour sécuriser vos messages. AES-256 est toujours activé. Il n'y a aucun moyen de désactiver le cryptage AES-256. Pour une protection supplémentaire, tous les messages stockés pendant l'utilisation du produit seront supprimés à la fermeture de l'application."
  }
};

export const ENGLISH: Sentence = {
  audioSupported: true,
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Write or pronounce the sentence to translate',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  languageButtonRAW: 'English language',
  languageButtonFR: 'Langue anglaise',
  recordText: 'Speak now',
  displayedWelcome: 'Hello I am your interpret.',
  readedWelcome: 'Would you like to exchange in this language?',
  rate: {
    easyToUse: 'Is this tool easy to use?',
    understand: 'Did this tool allow you to easily dialogue with your interlocutor?',
    comment: 'Free Comment',
    offerLinked: 'Is this exchange linked to the services offered by Pôle Emploi?',
  },
  gdpr:{
    privacityText:"We store and access information on a device, such as cookies and process personal data for content measurement, and audience insights, as well as to develop and improve products.\n\nYou may click to consent to our processing as described above.\nAlternatively you may click to refuse to consent or access more detailed information and change your preferences before consenting.\nPlease note that some processing of your personal data may not require your consent, but you have a right to object to such processing.",
    confirmTitle: "Special purposes and feature",
    confirmText:"We use 256-AES Encryption Technology to encrypt data such as conversation sent to our Product. It's mean that every messages you send are encryped and secured. All of this happens automatically: No need to turn on settings or set up special quiery to secure your messages. AES-256 is always activated. There's no way to turn off AES-256 encryption. For added protection, all messages stored during the Product'use will be deleted when the app is closed."
  }
};

export const SPANISH: Sentence = {
  audioSupported: true,
  applicationName: 'Traducción instantánea',
  send: 'Enviar a',
  translate: 'Traducción',
  languageButtonRAW: 'Idioma español',
  languageButtonFR: 'langue espagnole',
  translationH2: 'Escribe o pronuncia la oración para traducir',
  thanks: 'Pôle Emploi te agradece',
  listen: 'Escuchar',
  recordText: 'Habla ahora',
  displayedWelcome: 'Hola soy tu interprete',
  readedWelcome: '¿Te gustaría intercambiar en este idioma?',
  autoListen: 'Escuchar automáticamente',
  rate: {
    easyToUse: '¿Es esta herramienta fácil de usar?',
    understand: '¿Esta herramienta nos ayudó a entendernos?',
    comment: 'Comentario gratis',
    offerLinked: '¿El objeto de este intercambio está vinculado a los servicios ofrecidos por Pôle Emploi?',
  },
};

export const MANDARIN: Sentence = {
  audioSupported: true,
  applicationName: '即時翻譯',
  send: '發送',
  translate: '翻譯',
  translationH2: '写下或发音要翻译的句子',
  thanks: 'PôleEmploi謝謝',
  listen: '聽',
  languageButtonRAW: '普通话',
  languageButtonFR: 'langue mandarin',
  recordText: '現在說',
  displayedWelcome: '你好，我是你的翻译',
  readedWelcome: '您想用这种语言交流吗？',
  rate: {
    easyToUse: '这个工具好用吗？',
    understand: '此工具是否有助于我们彼此了解？',
    comment: '自由评论',
    offerLinked: '交换对象是否与PôleEmploi提供的服务相关？',
  },
};

export const BENGALI: Sentence = {
  applicationName: 'তাত্ক্ষণিক অনুবাদ',
  send: 'পাঠান',
  translate: 'অনুবাদ',
  translationH2: 'অনুবাদ করতে বাক্যটি লিখুন বা উচ্চারণ করুন',
  thanks: 'পোলে কর্মচারী আপনাকে ধন্যবাদ',
  listen: 'শোনা',
  languageButtonRAW: 'বেঙ্গালি ভাষা',
  languageButtonFR: 'langue bengali',
  gaugeText: 'এখন কথা বলুন',
  recordText: 'এখন কথা বলুন',
  displayedWelcome: 'হ্যালো আমি আপনার ব্যাখ্যা',
  readedWelcome: 'আপনি কি এই ভাষায় বিনিময় করতে চান?',
  rate: {
    easyToUse: 'এই সরঞ্জামটি কি সহজে ব্যবহার করা যায়?',
    understand: 'এই সরঞ্জামটি কি আপনাকে সহজেই আপনার কথোপকথকের সাথে কথোপকথনের অনুমতি দেয়?',
    comment: 'ফ্রি মন্তব্য',
    offerLinked: 'এই এক্সচেঞ্জের বিষয়টি কি পলে কর্মী দ্বারা প্রদত্ত পরিষেবাদির সাথে যুক্ত?',
  },
};

export const DARI: Sentence = {
  applicationName: 'ترجمه فوری',
  send: 'ارسال',
  translate: 'ترجمه',
  translationH2: 'جمله را برای ترجمه بنویسید یا تلفظ کنید',
  thanks: 'Pôle Emploi از شما متشکرم',
  listen: 'گوش دادن',
  recordText: 'الان صحبت کن',
  displayedWelcome: '.سلام ، من مترجم شما خواهم بود تا با مشاور شما به راحتی تبادل شوید',
  readedWelcome: 'آیا می خواهید به این زبان ادامه دهید؟',
  autoListen: 'پخپله غوږ شه',
  rate: {
    easyToUse: 'آیا این ابزار آسان است؟',
    understand: 'آیا این ابزار به شما امکان می دهد تا به راحتی با گفتگوی خود گفتگو کنید؟',
    comment: 'نظر رایگان',
    offerLinked: 'آیا موضوع این مبادله با خدمات ارائه شده توسط Pôle Emploi مرتبط است؟',
  },
};

export const PACHTO: Sentence = {
  displayedWelcome: 'سلام زه ستاسو تفسیر یم',
  readedWelcome: 'ایا تاسو غواړئ پدې ژبه کې تبادله وکړئ؟',
  applicationName: 'فوري ژباړه',
  send: 'ولېږئ',
  translate: 'ژباړه',
  translationH2: 'د ژباړې لپاره جمله ولیکئ یا تلفظ کړئ',
  thanks: 'پویل کارمند له تاسو څخه مننه',
  listen: 'واورئ',
  recordText: 'اوس خبره وکړه',
  gaugeText: 'Speak now',
  autoListen: 'پخپله غوږ شه',
  languageButtonRAW: 'پښتو ژبه',
  languageButtonFR: 'langue pachto',
  rate: {
    easyToUse: 'ایا دا وسیله کارول اسانه ده؟',
    understand: 'ایا دا وسیله تاسو ته اجازه درکوي چې په اسانۍ سره د خپل خبرو اترو سره خبرو اترو ته ورشئ؟',
    comment: 'وړیا نظر',
    offerLinked: 'ایا د دې تبادلې مقصود د پال انګار لخوا وړاندیز شوي خدماتو سره تړاو لري؟',
  },
};

export const OURDOU: Sentence = {
  displayedWelcome: 'ہیلو ، میں آپ کے مشیر سے آسانی سے تبادلہ کرنے کے لئے آپ کا ترجمان ہوں گا۔',
  readedWelcome: 'کیا آپ اس زبان میں تبادلہ کرنا چاہیں گے؟',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'ترجمہ کرنے کے لئے جملہ لکھیں یا اس کا تلفظ کریں',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'اب بولو',
  gaugeText: 'Speak now',
  autoListen: 'پخپله غوږ شه',
  rate: {
    easyToUse: 'Is this tool easy to use?',
    understand: 'Did this tool allow you to easily dialogue with your interlocutor?',
    comment: 'Free Comment',
    offerLinked: 'Is this exchange linked to the services offered by Pôle Emploi?',
  },
};

export const PORTUGUESE: Sentence = {
  audioSupported: true,
  displayedWelcome: 'Olá eu sou sua interpretação.',
  readedWelcome: 'Deseja trocar neste idioma?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Escreva ou pronuncie a frase para traduzir',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'Fale agora',
  gaugeText: 'Speak now',
  autoListen: 'Ouvir automaticamente',
  languageButtonRAW: 'Língua portuguesa',
  languageButtonFR: 'langue portugaise',
  rate: {
    easyToUse: 'Is this tool easy to use?',
    understand: 'Did this tool allow you to easily dialogue with your interlocutor?',
    comment: 'Free Comment',
    offerLinked: 'Is this exchange linked to the services offered by Pôle Emploi?',
  },
};

export const GERMAN: Sentence = {
  audioSupported: true,
  displayedWelcome: 'Hallo ich bin dein interpret',
  readedWelcome: 'Möchten Sie in dieser Sprache austauschen?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Schreiben oder sprechen Sie den zu übersetzenden Satz aus',
  languageButtonRAW: 'Deutsche Sprache',
  languageButtonFR: 'langue allemande',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  gaugeText: 'Speak now',
  recordText: 'Sprich jetzt',
  autoListen: 'Automatisch zuhören',
  rate: {
    easyToUse: 'Ist dieses Tool einfach zu bedienen?',
    understand: 'Konnten Sie mit diesem Tool problemlos mit Ihrem Gesprächspartner sprechen?',
    comment: 'Kostenloser Kommentar',
    offerLinked: 'Ist der Gegenstand dieses Austauschs mit den von Pôle Emploi angebotenen Dienstleistungen verbunden?',
  },
};

export const TURC: Sentence = {
  audioSupported: true,
  displayedWelcome: 'Merhaba, danışmanınızla kolayca alışveriş yapmak için tercümanınız olurum.',
  readedWelcome: 'Bu dilde takas yapmak ister misiniz?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Çevrilecek cümleyi yazın veya telaffuz edin',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'Şimdi konuşun',
  gaugeText: 'Speak now',
  autoListen: 'Otomatik olarak dinle',
  rate: {
    easyToUse: 'Is this tool easy to use?',
    understand: 'Did this tool allow you to easily dialogue with your interlocutor?',
    comment: 'Free Comment',
    offerLinked: 'Is this exchange linked to the services offered by Pôle Emploi?',
  },
};

export const AMHARIC: Sentence = {
  displayedWelcome: 'ጤና ይስጥልኝ ፣ ከአማካሪህ ጋር በቀላሉ ለመቀየር አስተርጓሚ እሆን ነበር',
  readedWelcome: 'በዚህ ቋንቋ መለወጥ ይፈልጋሉ?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'ለመተርጎም ዓረፍተ ነገሩን ይፃፉ ወይም ይናገሩ',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'አሁን መናገር ጀምር',
  gaugeText: 'Speak now',
  autoListen: 'በራስ-ሰር ያዳምጡ',
  rate: {
    easyToUse: 'ይህ መሣሪያ ለመጠቀም ቀላል ነው?',
    understand: 'ይህ መሣሪያ ከአገናኝዎ ጋር በቀላሉ እንዲወያዩ ይፈቅድልዎታል?',
    comment: 'ነፃ አስተያየት',
    offerLinked: 'የዚህ ልውውጥ ነገር በፔሌ አራይ ከሚሰጡት አገልግሎቶች ጋር የተገናኘ ነው?',
  },
};

export const KHMER: Sentence = {
  displayedWelcome: 'ជំរាបសួរ, ខ្ញុំនឹងក្លាយជាអ្នកបកប្រែរបស់អ្នកដើម្បីផ្លាស់ប្តូរយ៉ាងងាយស្រួលជាមួយទីប្រឹក្សារបស់អ្នក។',
  readedWelcome: 'តើអ្នកចង់ផ្លាស់ប្តូរភាសានេះទេ?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'សរសេរឬប្រកាសប្រយោគដើម្បីបកប្រែ',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'សូម​និយាយ​ភ្លាម',
  gaugeText: 'Speak now',
  autoListen: 'ស្តាប់ដោយស្វ័យប្រវត្តិ',
  rate: {
    easyToUse: 'តើកម្មវត្ថុនៃការផ្លាស់ប្តូរនេះមានជាប់ទាក់ទងនឹងសេវាកម្មដែលផ្តល់ដោយផេមអេមផៃដែរឬទេ?',
    understand: 'តើឧបករណ៍នេះអនុញ្ញាតឱ្យអ្នកងាយស្រួលក្នុងការសន្ទនាជាមួយអ្នករួមការងាររបស់អ្នកទេ?',
    comment: 'មតិយោបល់ដោយឥតគិតថ្លៃ',
    offerLinked: 'តើកម្មវត្ថុនៃការផ្លាស់ប្តូរនេះមានជាប់ទាក់ទងនឹងសេវាកម្មដែលផ្តល់ដោយផេមអេមផៃដែរឬទេ?',
  },
};

export const HINDI: Sentence = {
  displayedWelcome: 'नमस्कार, मैं आपके सलाहकार के साथ आसानी से आदान-प्रदान करने वाला आपका दुभाषिया बनूंगा।',
  readedWelcome: 'क्या आप इस भाषा में विनिमय करना चाहेंगे?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'अनुवाद करने के लिए वाक्य लिखें या उच्चारण करें',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'अब बोलो',
  gaugeText: 'Speak now',
  autoListen: 'स्वचालित रूप से सुनो',
  rate: {
    easyToUse: 'क्या यह उपकरण उपयोग करना आसान है?',
    understand: 'क्या इस टूल ने आपको अपने वार्ताकार के साथ आसानी से संवाद करने की अनुमति दी?',
    comment: 'नि: शुल्क टिप्पणी',
    offerLinked: 'क्या इस एक्सचेंज का उद्देश्य पोले एम्पलोई द्वारा दी गई सेवाओं से जुड़ा है?',
  },
};

export const TAMOUL: Sentence = {
  displayedWelcome: 'வணக்கம், உங்கள் ஆலோசகருடன் எளிதாக பரிமாறிக்கொள்ள உங்கள் மொழிபெயர்ப்பாளராக இருப்பேன்.',
  readedWelcome: 'இந்த மொழியில் பரிமாற விரும்புகிறீர்களா?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'மொழிபெயர்க்க வாக்கியத்தை எழுதவும் அல்லது உச்சரிக்கவும்',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'இப்பொழுது பேசவும்',
  gaugeText: 'Speak now',
  autoListen: 'தானாகவே கேளுங்கள்',
  rate: {
    easyToUse: 'இந்த கருவி பயன்படுத்த எளிதானதா?',
    understand: 'இந்த கருவி உங்கள் உரையாசிரியருடன் எளிதாக உரையாட அனுமதித்ததா?',
    comment: 'இலவச கருத்து',
    offerLinked: 'இந்த பரிமாற்றத்தின் பொருள் பால் எம்ப்ளாய் வழங்கும் சேவைகளுடன் இணைக்கப்பட்டுள்ளதா?',
  },
};

export const ITALIAN: Sentence = {
  audioSupported: true,
  displayedWelcome: 'Ciao sono il tuo interprete.',
  readedWelcome: 'Ti piacerebbe scambiare in questa lingua?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Scrivi o pronuncia la frase da tradurre',
  thanks: 'Pôle Emploi thanks you.',
  languageButtonRAW: 'Lingua italiana',
  languageButtonFR: 'langue italienne',
  listen: 'Listen',
  gaugeText: 'Speak now',
  recordText: 'Parla adesso',
  autoListen: 'Ascolta automaticamente',
  rate: {
    easyToUse: 'Questo strumento è facile da usare?',
    understand: 'Questo strumento ti ha permesso di dialogare facilmente con il tuo interlocutore?',
    comment: 'Commento gratuito',
    offerLinked: "L'oggetto di questo scambio è collegato ai servizi offerti da Pôle Emploi?",
  },
};

export const MONGOL: Sentence = {
  displayedWelcome: 'Сайн байна уу, би зөвлөхтэйгээ хялбархан солилцох орчуулагч болно.',
  readedWelcome: 'Та энэ хэлээр солилцохыг хүсч байна уу?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Орчуулах өгүүлбэрийг бичих эсвэл хэлэх',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'Одоо ярь',
  gaugeText: 'Speak now',
  autoListen: 'Автоматаар сонс',
  rate: {
    easyToUse: 'Энэ хэрэгслийг ашиглахад хялбар юу?',
    understand: 'Энэ хэрэгсэл нь ярилцагчтайгаа амархан ярилцах боломжийг олгосон уу?',
    comment: 'Үнэгүй сэтгэгдэл',
    offerLinked: 'Энэхүү солилцооны объект нь Поэль Эмплойгийн санал болгож буй үйлчилгээнүүдтэй холбоотой юу?',
  },
};

export const NEPALESE: Sentence = {
  displayedWelcome: 'नमस्कार, म तपाईको दोभाषे बन्ने छ तपाईंको सल्लाहकार संग सजिलै साटासाट गर्न।',
  readedWelcome: 'के तपाईं यस भाषामा आदान प्रदान गर्न चाहनुहुन्छ?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'अनुवाद गर्न वाक्य लेख्नुहोस् वा उच्चारण गर्नुहोस्',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'अहिले बोल्नुस्',
  gaugeText: 'Speak now',
  autoListen: 'स्वचालित रूपमा सुन्नुहोस्',
  rate: {
    easyToUse: 'के यो उपकरण प्रयोग गर्न सजिलो छ?',
    understand: 'के यस उपकरणले तपाईंलाई सजिलैसँग तपाइँको वार्तालापकर्तासँग वार्तालाप गर्न अनुमति दियो?',
    comment: 'नि: शुल्क टिप्पणी',
    offerLinked: 'के यो एक्सचेन्जको वस्तु पोले एम्पलईले प्रस्ताव गरेको सेवाहरूसँग जोडिएको छ?',
  },
};

export const RUSSIA: Sentence = {
  audioSupported: true,
  displayedWelcome: 'Привет я твой переводчик',
  readedWelcome: 'Вы хотите продолжить на этом языке?',
  applicationName: 'Мгновенный перевод',
  send: 'Отправить',
  translate: 'перевод',
  translationH2: 'Напишите или произнесите предложение для перевода',
  thanks: 'Pôle emploi Спасибо вам.',
  listen: 'Слушать',
  recordText: 'Говорите сейчас',
  gaugeText: 'Говорите сейчас',
  autoListen: 'Автоматически слушать',
  languageButtonRAW: 'Русский язык',
  languageButtonFR: 'langue russe',
  rate: {
    easyToUse: 'Этот инструмент прост в использовании?',
    understand: 'Этот инструмент позволил вам легко общаться с вашим собеседником?',
    comment: 'Бесплатный комментарий',
    offerLinked: 'Связан ли объект этого обмена с услугами, предлагаемыми Pôle Emploi?',
  },
};

export const OUZBEK: Sentence = {
  displayedWelcome: "Assalomu alaykum, maslahatchingiz bilan osonlikcha almashish uchun sizning tarjimoningiz bo'lardim.",
  readedWelcome: 'Ushbu tilda almashishni xohlaysizmi?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Tarjima qilish uchun jumlalarni yozing yoki yozing',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'Hozir gapiring',
  gaugeText: 'Speak now',
  autoListen: 'Avtomatik tinglash',
  rate: {
    easyToUse: 'Ushbu vositadan foydalanish osonmi?',
    understand: 'Ushbu vosita suhbatdoshingiz bilan osongina suhbatlashishga imkon berdimi?',
    comment: 'Bepul sharh',
    offerLinked: "Ushbu almashish ob'ekti Pôle Emploi tomonidan taklif qilinadigan xizmatlar bilan bog'liqmi?",
  },
};

export const ROMANIAN: Sentence = {
  displayedWelcome: 'Buna ziua, eu as fi interpretul tau pentru a schimba usor cu consilierul tau.',
  readedWelcome: 'Buna ziua, eu as fi interpretul tau pentru a schimba usor cu consilierul tau.',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Scrieți sau pronunțați propoziția de tradus',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'Vorbește acum',
  gaugeText: 'Speak now',
  autoListen: 'Ascultă automat',
  rate: {
    easyToUse: 'Este ușor de utilizat acest instrument?',
    understand: 'Acest instrument v-a permis să dialogați cu interlocutorul cu ușurință?',
    comment: 'Comentariu gratuit',
    offerLinked: 'Obiectul acestui schimb este legat de serviciile oferite de Pôle Emploi?',
  },
};

export const SOMALI: Sentence = {
  displayedWelcome: 'Salaan, waxaan noqon lahaa turjubaankaaga si aan si fudud ula beddelo la-taliyahaaga.',
  readedWelcome: 'Ma jeceshahay inaad ku badasho luqadan?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Qoraal ama ku dhawaaq jumladda si aad u tarjunto',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'Hadda hadal',
  gaugeText: 'Speak now',
  autoListen: 'Si toos ah u dhagayso',
  rate: {
    easyToUse: 'Qalabkaani ma fududahay in la isticmaalo?',
    understand: 'Qalabkani miyaa kuu ogolaaday inaad si fudud ulahadasho qofka aad isweydaarsaneyso?',
    comment: 'Faallo Bilaash ah',
    offerLinked: 'Shayga isweydaarsiga ma wuxuu ku xiran yahay adeegyada ay bixiso Pôle Emploi?',
  },
};

export const VIETNAMESE: Sentence = {
  audioSupported: true,
  displayedWelcome: 'Xin chào, tôi sẽ là thông dịch viên của bạn để trao đổi dễ dàng với cố vấn của bạn.',
  readedWelcome: 'Bạn có muốn trao đổi bằng ngôn ngữ này?',
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Viết hoặc phát âm câu để dịch',
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  recordText: 'Nói đi',
  gaugeText: 'Speak now',
  autoListen: 'Tự động nghe',
  rate: {
    easyToUse: 'Công cụ này có dễ sử dụng không?',
    understand: 'Công cụ này có cho phép bạn dễ dàng đối thoại với người đối thoại của bạn không?',
    comment: 'Bình luận miễn phí',
    offerLinked: 'Là đối tượng của trao đổi này được liên kết với các dịch vụ được cung cấp bởi Pôle Emploi?',
  },
};

export const PERSAN: Sentence = {
  displayedWelcome: 'سلام من تفسیر شما هستم',
  readedWelcome: 'آیا می خواهید به این زبان ادامه دهید؟',
  applicationName: 'ترجمه فوری',
  send: 'ارسال',
  translate: 'ترجمه',
  translationH2: 'جمله را برای ترجمه بنویسید یا تلفظ کنید',
  thanks: 'Pôle Emploi از شما متشکرم',
  listen: 'گوش دادن',
  recordText: 'الان صحبت کن',
  gaugeText: 'الان صحبت کن',
  languageButtonRAW: 'زبان فارسی',
  languageButtonFR: 'langue persane',
  rate: {
    easyToUse: 'آیا این ابزار آسان است؟',
    understand: 'آیا این ابزار به شما امکان می دهد تا به راحتی با گفتگوی خود گفتگو کنید؟',
    comment: 'نظر رایگان',
    offerLinked: 'آیا موضوع این مبادله با خدمات ارائه شده توسط Pôle Emploi مرتبط است؟',
  },
};

export const GREEK: Sentence = {
  audioSupported: true,
  applicationName: 'Άμεση μετάφραση',
  send: 'Αποστολή',
  translate: 'Μετάφραση',
  translationH2: 'Γράψτε ή προφέρετε την πρόταση για μετάφραση',
  thanks: 'Pôle Emploi σε ευχαριστώ',
  listen: 'Άκου',
  recordText: 'Μίλα τώρα',
  displayedWelcome: 'Είμαι ο μεταφραστής σας για εύκολη ανταλλαγή με τον σύμβουλό σας.',
  readedWelcome: 'Θέλετε να συνεχίσετε σε αυτήν τη γλώσσα;',
  rate: {
    easyToUse: 'Είναι αυτό το εργαλείο εύχρηστο;',
    understand: 'Σας επέτρεψε αυτό το εργαλείο να συνομιλείτε εύκολα με τον συνομιλητή σας;',
    comment: 'Δωρεάν σχόλιο',
    offerLinked: 'Συνδέεται το αντικείμενο αυτής της ανταλλαγής με τις υπηρεσίες που προσφέρει η Pôle Emploi;',
  },
};
