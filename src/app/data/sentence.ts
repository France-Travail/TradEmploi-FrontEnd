import { Sentence, NavbarTab } from '../models/vocabulary';

export const NAVBAR_ENGLISH_TABS: NavbarTab = {
  language: 'language',
  logout: 'logout',
  help: 'Start guide',
  gdpr: 'CGU'
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
    qualityTranslate: 'מה הייתה איכות התרגומים?',
    rating: 'איך מדרגים את הכלי?',
    comment: 'תגובה חינם',
    technical: 'האם נתקלת בבעיות טכניות כלשהן בשימוש בכלי?',
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
    qualityTranslate: 'ما هي جودة الترجمات؟',
    rating: 'كيف تقيم الأداة؟',
    comment: 'تعليق مجاني',
    technical: 'هل واجهت أي مشاكل فنية أثناء استخدام الأداة؟',
  },
};

export const FRENCH: Sentence = {
  audioSupported: true,
  applicationName: 'Traduction instantanée',
  send: 'Envoyer',
  translate: 'Traduction',
  translationH2: 'Ecrire ou prononcer la phrase à traduire',
  translationH2Ios:"Ecrire la phrase à traduire",
  thanks: 'Pôle Emploi vous remercie',
  listen: 'Ecouter',
  recordText: 'Parlez maintenant',
  displayedWelcome: 'Je suis votre traducteur pour échanger facilement avec votre conseiller.',
  readedWelcome: 'Voulez-vous continuer dans cette langue ?',
  rate: {
    qualityTranslate: 'Quelle a été la qualité des traductions ?',
    rating: 'Quelle note donnez vous à l’outil ?',
    comment: 'Commentaire libre',
    technical: 'Avez vous rencontré des problèmes techniques dans l’utilisation de l’outil ?',
  },
  gdpr: {
    title: 'Paramètres de confidentialité',
    preApplicationName: 'Accédez au service de ',
    applicationName: 'traduction instantanée',
    privacyText:
      "Nous stockons et accédons aux informations sur un appareil, telles que les cookies et traitons les données personnelles pour la mesure du contenu et les informations d'audience, ainsi que pour développer et améliorer les produits.\n\nVous pouvez cliquer pour consentir à notre traitement comme décrit ci-dessus.\nVous pouvez également cliquer pour refuser de donner votre consentement ou accéder à des informations plus détaillées et modifier vos préférences avant de consentir.\nVeuillez noter que certains traitements de vos données personnelles peuvent ne pas nécessiter votre consentement, mais vous avez le droit de vous opposer à un tel traitement.",
    optionTitle: 'Usages spéciaux et fonctionnalités',
    optionText:
      "Nous utilisons la technologie de cryptage 256-AES pour crypter les données telles que les conversations envoyées à notre produit.\nCela signifie que tous les messages que vous envoyez sont cryptés et sécurisés.\nTout cela se produit automatiquement : pas besoin d'activer les paramètres ou de configurer une requête spéciale pour sécuriser vos messages. AES-256 est toujours activé. Il n'y a aucun moyen de désactiver le cryptage AES-256.\nPour une protection supplémentaire, tous les messages stockés pendant l'utilisation du produit seront supprimés à la fermeture de l'application.",
    disagreeBtn: 'REFUSER',
    learnBtn: 'EN SAVOIR PLUS',
    agreeBtn: 'ACCEPTER',
    confirmBtn: 'CONFIRMER',
  },
  logout: {
    title: 'Déconnexion',
    question: 'Voulez-vous vous déconnecter?',
    cancel: 'Annuler',
    confirm: 'Se déconnecter',
  },
  modality: {
    title: 'Modalité de conversation',
    monoSupport: 'Mono support',
    multiSupport: 'Multi supports',
    monoSentenceFR: 'Échangez avec un seul support PC ou tablette',
    monoSentenceENG: 'Chat with a single PC or tablet support.',
    multiSentenceFR: 'Échangez avec plusieurs supports PC, téléphones ou tablettes.',
    multiSentenceENG: 'Chat with several PCs, phones or tablets supports ',
    confirm: 'CONFIRMER',
  },
  choice: {
    mostBtn: 'Langues les plus utilisées',
    allBtn: 'Toutes les langues',
    listBtn: 'Liste',
    gridBtn: 'Grille',
    chooseBtn: 'Choisir',
    search: 'Saisissez la langue ou le pays recherché',
    voice: 'Voix',
  },
  tooltip: {
    pronounce: 'Je peux parler dans cette langue',
    noPronounce: 'Je ne peux pas parler dans cette langue',
    listen: 'Je peux entendre la traduction dans cette langue',
    noListen: 'Je ne peux pas entendre la traduction dans cette langue',
    audio: 'Je peux entendre un échantillon vocal dans cette langue',
  },
};

export const ENGLISH: Sentence = {
  audioSupported: true,
  applicationName: 'Instant Translation',
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Write or pronounce the sentence to translate',
  translationH2Ios:"Write the sentence to translate",
  thanks: 'Pôle Emploi thanks you.',
  listen: 'Listen',
  languageButtonRAW: 'English language',
  languageButtonFR: 'Langue anglaise',
  recordText: 'Speak now',
  displayedWelcome: 'Hello I am your interpret.',
  readedWelcome: 'Would you like to exchange in this language?',
  rate: {
    qualityTranslate: 'What was the quality of the translations?',
    rating: 'How do you rate this tool?',
    comment: 'Free Comment',
    technical: 'Have you encountered any technical problems using the tool?',
  },
  gdpr: {
    title: 'Privacy settings',
    preApplicationName: 'Access to ',
    applicationName: 'instant translation service',
    privacyText:
      'We store and access information on a device, such as cookies and process personal data for content measurement, and audience insights, as well as to develop and improve products.\n\nYou may click to consent to our processing as described above.\nAlternatively you may click to refuse to consent or access more detailed information and change your preferences before consenting.\nPlease note that some processing of your personal data may not require your consent, but you have a right to object to such processing.',
    optionTitle: 'Special purposes and features',
    optionText:
      "We use 256-AES Encryption Technology to encrypt data such as conversation sent to our Product.\nIt's mean that every messages you send are encryped and secured.\nAll of this happens automatically: No need to turn on settings or set up special quiery to secure your messages. AES-256 is always activated.\n There's no way to turn off AES-256 encryption.\nFor added protection, all messages stored during the Product use will be deleted when the app is closed.",
    disagreeBtn: 'DISAGREE',
    learnBtn: 'LEARN MORE',
    agreeBtn: 'AGREE',
    confirmBtn: 'CONFIRM',
  },
  logout: {
    title: 'Logout',
    question: 'Would you like to log out ?',
    cancel: 'Cancel',
    confirm: 'Logout',
  },
  choice: {
    mostBtn: 'Most used languages',
    allBtn: 'All languages',
    listBtn: 'List',
    gridBtn: 'Grid',
    chooseBtn: 'Choose',
    search: 'Enter the desired language or country',
    voice: 'Voice',
  },
  tooltip: {
    pronounce: 'I can speak in this language',
    noPronounce: 'I cannot speak in this language',
    listen: 'I can hear the translation in this language ',
    noListen: 'I cannot hear the translation in this language ',
    audio: 'I can hear a voice sample in this language',
  },
  introMessage: {
    welcomeFR: 'Pour améliorer l’expérience de traduction, faites des phrases courtes et simples et parlez suffisamment fort.',
    welcomeRAW: 'To improve the translation experience, make short and simple sentences and speak loudly.',
    notifMultiFR: 'L’espace de conversation a été créé en modalité multi-support.',
    notifMultiRAW: "You've joined the conversation.",
    voiceavailabilityFR: 'Saisie vocale indisponible pour la langue sélectionnée',
    voiceavailabilityRAW: 'Voice input is unavailable for this language',
  },
};

export const ENGLISH_DEFAULT: Sentence = {
  ...ENGLISH,
  audioSupported: false,
};

export const DANISH: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Vil du udveksle på dette sprog?',
};

export const KOREA: Sentence = {
  ...ENGLISH,
  readedWelcome: '이 언어로 교환 하시겠습니까?',
};

export const FINLAND: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Haluatko vaihtaa tällä kielellä?',
};

export const GUJARATI: Sentence = {
  ...ENGLISH,
  readedWelcome: 'શું તમે આ ભાષામાં ચાલુ રાખવા માંગો છો?',
};

export const HUNGARIAN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Szeretne ezen a nyelven cserélni?',
};

export const INDONESIA: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Apakah Anda ingin bertukar dalam bahasa ini?',
};

export const KANNADA: Sentence = {
  ...ENGLISH,
  readedWelcome: 'ಈ ಭಾಷೆಯಲ್ಲಿ ವಿನಿಮಯ ಮಾಡಲು ನೀವು ಬಯಸುವಿರಾ?',
};

export const MALAYALAM: Sentence = {
  ...ENGLISH,
  readedWelcome: 'ഈ ഭാഷയിൽ കൈമാറ്റം ചെയ്യാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ?',
};

export const NORWAY: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Vil du utveksle på dette språket?',
};

export const HOLLAND: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Wilt u uitwisselen in deze taal?',
};

export const POLAND: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Czy chciałbyś wymienić się w tym języku?',
};

export const SLOVENIA: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Prajete si výmenu v tomto jazyku?',
};

export const SWEDEN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Vill du byta på det här språket?',
};

export const CZECH: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Chcete si vyměnit v tomto jazyce?',
};

export const THAILAND: Sentence = {
  ...ENGLISH,
  readedWelcome: 'คุณต้องการแลกเปลี่ยนเป็นภาษานี้หรือไม่?',
};

export const TELUGU: Sentence = {
  ...ENGLISH,
  readedWelcome: 'మీరు ఈ భాషలో కొనసాగాలనుకుంటున్నారా?',
};

export const UKRAINE: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Ви хочете обмінюватися цією мовою?',
};

export const JAPANESE: Sentence = {
  ...ENGLISH,
  readedWelcome: 'この言語で交換しますか？',
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
    qualityTranslate: '¿Cuál fue la calidad de las traducciones?',
    rating: '¿Cómo valora la herramienta?',
    comment: 'Comentario gratis',
    technical: '¿Ha encontrado algún problema técnico al utilizar la herramienta?',
  },
};
export const ALBANIAN: Sentence = {
  applicationName: 'Përkthim i menjëhershëm',
  send: 'Dërgoni te',
  translate: 'Përkthimi',
  languageButtonRAW: 'Gjuhë shqipe',
  languageButtonFR: 'langue albanaise',
  translationH2: 'Shkruaj ose shqipto fjalinë që do të përkthehet',
  thanks: 'Pôle Emploi te agradece',
  listen: 'Degjo',
  recordText: 'Fol tani',
  displayedWelcome: 'Përshëndetje, unë jam përkthyesi juaj',
  readedWelcome: 'Dëshironi të shkëmbeni në këtë gjuhë?',
  autoListen: 'Dëgjoni automatikisht',
  rate: {
    qualityTranslate: 'Cila ishte cilësia e përkthimeve?',
    rating: 'Si e vlerësoni mjetin?',
    comment: 'Koment falas',
    technical: 'A keni hasur ndonjë problem teknik duke përdorur mjetin?',
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
    qualityTranslate: '翻译的质量如何？',
    rating: '您如何评价该工具？',
    comment: '自由评论',
    technical: '您在使用该工具时遇到任何技术问题吗？',
  },
};

export const BENGALI: Sentence = {
  audioSupported: false,
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
    qualityTranslate: 'অনুবাদগুলির গুণমানটি কী ছিল?',
    rating: 'আপনি কীভাবে সরঞ্জামটি রেট করেন?',
    comment: 'ফ্রি মন্তব্য',
    technical: 'আপনি কি সরঞ্জামটি ব্যবহার করে কোনও প্রযুক্তিগত সমস্যার সম্মুখীন হয়েছেন?',
  },
};

export const BENGALI_INDIA: Sentence = {
  ...BENGALI,
  audioSupported: true,
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
    qualityTranslate: 'کیفیت ترجمه ها چگونه بود؟',
    rating: 'ابزار را چگونه ارزیابی می کنید؟',
    comment: 'نظر رایگان',
    technical: 'آیا با استفاده از این ابزار به مشکلات فنی برخورد کرده اید؟',
  },
};

export const PACHTO: Sentence = {
  voiceNotSupported: true,
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
    qualityTranslate: 'د ژباړې کیفیت څه و؟',
    rating: 'تاسو د وسیلې درجه څنګه کوئ؟',
    comment: 'وړیا نظر',
    technical: 'ایا تاسو د وسیلې په کارولو سره کوم تخنیکي ستونزې سره مخ شوي یاست؟',
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
    qualityTranslate: 'What was the quality of the translations?',
    rating: 'How do you rate this tool?',
    comment: 'Free Comment',
    technical: 'Have you encountered any technical problems using the tool?',
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
    qualityTranslate: 'Qual foi a qualidade das traduções?',
    rating: 'Como você avalia a ferramenta?',
    comment: 'Comentário grátis',
    technical: 'Você encontrou algum problema técnico ao usar a ferramenta?',
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
    qualityTranslate: 'Wie war die Qualität der Übersetzungen?',
    rating: 'Wie bewerten Sie das Tool?',
    comment: 'Kostenloser Kommentar',
    technical: 'Haben Sie technische Probleme mit dem Tool festgestellt?',
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
    qualityTranslate: 'Çevirilerin kalitesi neydi?',
    rating: 'Aracı nasıl değerlendiriyorsunuz?',
    comment: 'Ücretsiz yorum',
    technical: 'Aracı kullanırken herhangi bir teknik sorunla karşılaştınız mı?',
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
    qualityTranslate: 'የትርጉሞቹ ጥራት ምን ነበር?',
    rating: 'መሣሪያውን እንዴት ደረጃ ይሰጣሉ?',
    comment: 'ነፃ አስተያየት',
    technical: 'መሣሪያውን በመጠቀም ማንኛውንም ቴክኒካዊ ችግሮች አጋጥመውዎታል?',
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
    qualityTranslate: 'តើការបកប្រែមានគុណភាពយ៉ាងណា?',
    rating: 'តើអ្នកវាយតម្លៃឧបករណ៍យ៉ាងដូចម្តេច?',
    comment: 'មតិយោបល់ដោយឥតគិតថ្លៃ',
    technical: 'តើអ្នកបានជួបប្រទះបញ្ហាបច្ចេកទេសណាមួយដោយប្រើឧបករណ៍នេះទេ?',
  },
};

export const HINDI: Sentence = {
  audioSupported: true,
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
    qualityTranslate: 'अनुवादों की गुणवत्ता क्या थी?',
    rating: 'आप उपकरण को कैसे रेट करते हैं?',
    comment: 'नि: शुल्क टिप्पणी',
    technical: 'क्या आपने उपकरण का उपयोग करके किसी तकनीकी समस्या का सामना किया है?',
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
    qualityTranslate: 'What was the quality of the translations?',
    rating: 'How do you rate this tool?',
    comment: 'Free Comment',
    technical: 'Have you encountered any technical problems using the tool?',
  },
};

export const TAMOUL_INDIA: Sentence = {
  ...TAMOUL,
  audioSupported: true,
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
    qualityTranslate: 'Qual era la qualità delle traduzioni?',
    rating: 'Come valuti lo strumento?',
    comment: 'Commento gratuito',
    technical: "Hai riscontrato problemi tecnici utilizzando lo strumento?",
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
    qualityTranslate: 'Орчуулгын чанар ямар байв?',
    rating: 'Та багажийг хэрхэн үнэлдэг вэ?',
    comment: 'Үнэгүй сэтгэгдэл',
    technical: 'Хэрэгслийг ашиглахад ямар нэгэн техникийн асуудал тулгарсан уу?',
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
    qualityTranslate: 'अनुवादको गुणस्तर के थियो?',
    rating: 'तपाईं कसरी उपकरण मूल्या rate्कन गर्नुहुन्छ?',
    comment: 'नि: शुल्क टिप्पणी',
    technical: 'के तपाईंले उपकरण प्रयोग गर्दा कुनै प्राविधिक समस्याहरू सामना गर्नु भएको छ?',
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
    qualityTranslate: 'Какое было качество переводов?',
    rating: 'Как вы оцениваете инструмент?',
    comment: 'Бесплатный комментарий',
    technical: 'Сталкивались ли вы с какими-либо техническими проблемами при использовании инструмента?',
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
    qualityTranslate: 'Tarjimalarning sifati qanday edi?',
    rating: 'Asbobni qanday baholaysiz?',
    comment: 'Bepul sharh',
    technical: "Asbobni ishlatishda biron bir texnik muammoga duch keldingizmi?",
  },
};

export const ROMANIAN: Sentence = {
  audioSupported: true,
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
    qualityTranslate: 'Care a fost calitatea traducerilor?',
    rating: 'Cum evaluați instrumentul?',
    comment: 'Comentariu gratuit',
    technical: 'Ați întâmpinat probleme tehnice folosind instrumentul?',
  },
};

export const SOMALI: Sentence = {
  voiceNotSupported: true,
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
    qualityTranslate: 'Muxuu ahaa tayada tarjumaadaha?',
    rating: 'Sideed u qiimeysaa qalabka?',
    comment: 'Faallo Bilaash ah',
    technical: 'Miyaad la kulantay wax dhibaato farsamo ah adoo adeegsanaya qalabka?',
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
    qualityTranslate: 'Chất lượng của các bản dịch là gì?',
    rating: 'Bạn đánh giá công cụ này như thế nào?',
    comment: 'Bình luận miễn phí',
    technical: 'Bạn có gặp bất kỳ sự cố kỹ thuật nào khi sử dụng công cụ này không?',
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
    qualityTranslate: 'کیفیت ترجمه ها چگونه بود؟',
    rating: 'ابزار را چگونه ارزیابی می کنید؟',
    comment: 'نظر رایگان',
    technical: 'آیا با استفاده از این ابزار به مشکلات فنی برخورد کرده اید؟',
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
    qualityTranslate: 'Ποια ήταν η ποιότητα των μεταφράσεων;',
    rating: 'Πώς αξιολογείτε το εργαλείο;',
    comment: 'Δωρεάν σχόλιο',
    technical: 'Έχετε αντιμετωπίσει τεχνικά προβλήματα κατά τη χρήση του εργαλείου;',
  },
};

export const BULGARE: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Искате ли да превключите на този език?',
};
