import {NavbarTab, Sentence} from '../models/vocabulary';
import {params} from '../../environments/params';

const organization = params.organization.name;

export const NAVBAR_ENGLISH_TABS: NavbarTab = {
  language: 'language',
  logout: 'logout',
  help: 'Start guide',
  gdpr: 'CGU',
};

export const HEBREW: Sentence = {
  applicationName: 'תרגום מיידי',
  send: 'שליחה',
  translate: 'תרגום',
  translationH2: 'הזן טקסט, או לחץ לחיצה ארוכה על המיקרופון הכחול כדי לדבר',
  translationH2Mobile: 'הזן טקסט, או הקש על המיקרופון הכחול כדי לדבר',
  thanks: organization + ' תודה',
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
  audioSupported: true,
};
export const HEBREW_GCP: Sentence = {
  ...HEBREW,
  audioSupported: false,
};
export const ARAB: Sentence = {
  applicationName: 'الترجمة الفورية',
  displayedWelcome: 'مرحبا انا تفسيرك',
  readedWelcome: 'هل ترغب في التبادل بهذه اللغة؟',
  send: 'إرسال',
  translate: 'ترجمة',
  translationH2: 'أدخل نصًا ، أو اضغط مع الاستمرار على الميكروفون الأزرق للتحدث',
  translationH2Mobile: 'أدخل نصًا أو انقر على الميكروفون الأزرق للتحدث',
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
  translationH2: 'Entrez du texte, ou maintenez le micro bleu enfoncé pour parler',
  translationH2Ios: 'Ecrire la phrase à traduire',
  translationH2Mobile: 'Entrez du texte, ou appuyez sur le micro bleu pour parler',
  thanks: organization + ' vous remercie',
  listen: 'Ecouter',
  recordText: 'Parlez maintenant',
  displayedWelcome: 'Je suis votre traducteur pour échanger facilement avec votre conseiller.',
  readedWelcome: 'Voulez-vous continuer dans cette langue ?',
  rate: {
    qualityTranslate: 'Quelle a été la qualité des traductions ?',
    rating: 'Quelle note donnez vous à l’outil ?',
    comment: 'Commentaire libre',
    technical: 'Avez vous rencontré des problèmes techniques dans l’utilisation de l’outil ?',
    typeInterview: 'Type entretien',
  },
  gdpr: {
    title: 'Protection des données à caractère personnel',
    privacyText:
    params.organization.cgus,
    closeBtn: 'FERMER',
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
    multiSentenceFR: 'Échangez avec plusieurs supports PC, téléphones ou tablettes.',
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
    pronounce: 'Le DE peut parler dans cette langue',
    noPronounce: 'Je ne peux pas parler dans cette langue',
    listen: 'Le DE peut entendre la traduction dans cette langue',
    noListen: 'Le DE ne peut pas entendre la traduction dans cette langue',
    audio: 'Je peux entendre un échantillon vocal dans cette langue',
  },
};

const APPLICATION_NAME = 'Instant Translation';
const QUALITY_TRANSLATE = 'What was the quality of the translations?';
const COMMENT = 'Free Comment';
const RATING = 'How do you rate this tool?';
const TECHNICAL = 'Have you encountered any technical problems using the tool?';
const THANKS_EN = organization + ' thanks you.';
export const ENGLISH: Sentence = {
  audioSupported: true,
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Enter text, or press and hold blue microphone to speak',
  translationH2Ios: 'Write the sentence to translate',
  translationH2Mobile: 'Enter text, or tap the blue mic to speak',
  thanks: THANKS_EN,
  listen: 'Listen',
  languageButtonRAW: 'English language',
  languageButtonFR: 'Langue anglaise',
  recordText: 'Speak now',
  displayedWelcome: 'Hello I am your interpret.',
  readedWelcome: 'Would you like to exchange in this language?',
  rate: {
    qualityTranslate: QUALITY_TRANSLATE,
    rating: RATING,
    comment: COMMENT,
    technical: TECHNICAL,
    typeInterview: 'Interview type',
  },
  gdpr: {
    title: 'Protection of personal data',
    privacyText:
    params.organization.cgusEnglish,
    closeBtn: 'CLOSE',
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
    welcomeFR: 'Voici un traducteur automatique qui va traduire votre langue. Pour améliorer l’expérience de traduction, faites des phrases courtes et simples et parlez suffisamment fort.',
    welcomeRAW: 'Here is an automatic translator that will translate your language. To improve the translation experience, keep sentences short and simple and speak loudly enough.',
    notifMultiFR: 'L’espace de conversation a été créé en modalité multi-support.',
    notifMultiRAW: 'You\'ve joined the conversation.',
    voiceavailabilityFR: 'Saisie vocale indisponible pour la langue sélectionnée',
    voiceavailabilityRAW: 'Voice input is unavailable for this language',
  },
};

export const ENGLISH_DEFAULT: Sentence = {
  ...ENGLISH,
  audioSupported: false,
};
export const ENGLISH_DEFAULT_NO_VOICE: Sentence = {
  ...ENGLISH_DEFAULT,
  voiceNotSupported: true,
};
export const PENDJABI = {
  ...ENGLISH,
  audioSupported: true,
  readedWelcome: 'ਕੀ ਤੁਸੀਂ ਇਸ ਭਾਸ਼ਾ ਵਿੱਚ ਜਾਰੀ ਰੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
};
export const ESTONIAN = {
  ...ENGLISH,
  readedWelcome: 'Kas soovite selles keeles vahetada ?',
};

export const DANISH: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Vil du udveksle på dette sprog?',
};

export const KOREA: Sentence = {
  ...ENGLISH,
  readedWelcome: '이 언어로 계속하시겠습니까?',
  translationH2: '텍스트를 입력하거나 파란색 마이크를 잡고 말하세요.',
  translationH2Mobile: '텍스트를 입력하거나 파란색 마이크를 탭하여 말하세요.',
};

export const FINLAND: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Haluatko vaihtaa tällä kielellä?',
};

export const GUJARATI: Sentence = {
  ...ENGLISH,
  readedWelcome: 'શું તમે આ ભાષામાં ચાલુ રાખવા માંગો છો?',
  translationH2: 'ટેક્સ્ટ દાખલ કરો અથવા બોલવા માટે વાદળી માઈકને પકડી રાખો',
  translationH2Mobile: 'ટેક્સ્ટ દાખલ કરો અથવા વાત કરવા માટે વાદળી માઈક પર ટેપ કરો',
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
export const MALAYALAM_NO_VOICE: Sentence = {
  ...ENGLISH_DEFAULT_NO_VOICE,
  readedWelcome: 'ഈ ഭാഷയിൽ കൈമാറ്റം ചെയ്യാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ?',
};
export const NORWAY: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Vil du utveksle på dette språket?',
};

export const HOLLAND: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Wilt u uitwisselen in deze taal?',
  translationH2: 'Voer tekst in of houd de blauwe microfoon ingedrukt om te spreken',
  translationH2Mobile: 'Voer tekst in of houd de blauwe microfoon ingedrukt om te spreken',

};

export const POLAND: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Czy chciałbyś wymienić się w tym języku?',
  translationH2: 'Wpisz tekst lub przytrzymaj niebieski mikrofon, aby mówić',
  translationH2Mobile: 'Wpisz tekst lub przytrzymaj niebieski mikrofon, aby mówić',
};
export const CZECH: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Chcete pokračovat v tomto jazyce?',
  translationH2: 'Zadejte text nebo mluvte podržením modrého mikrofonu',
  translationH2Mobile: 'Zadejte text nebo mluvte podržením modrého mikrofonu',
};

export const SLOVENIA: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Bi radi izmenjali v tem jeziku?',
  translationH2: 'Napišite stavek za prevod.',
  translationH2Mobile: 'Vnesite besedilo ali tapnite modri mikrofon za govor.',
};

export const SWEDEN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Vill du byta på det här språket?',
};

export const THAILAND: Sentence = {
  ...ENGLISH,
  readedWelcome: 'คุณต้องการแลกเปลี่ยนเป็นภาษานี้หรือไม่?',
  translationH2: 'ป้อนข้อความหรือกดไมค์สีน้ำเงินค้างไว้เพื่อพูด',
  translationH2Mobile: 'ป้อนข้อความหรือกดไมค์สีน้ำเงินค้างไว้เพื่อพูด',
};

export const TELUGU: Sentence = {
  ...ENGLISH,
  readedWelcome: 'మీరు ఈ భాషలో కొనసాగాలనుకుంటున్నారా?',
};

export const UKRAINE: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Ви хочете обмінюватися цією мовою?',
  translationH2: 'введіть текст або утримуйте синій мікрофон, щоб говорити',
  translationH2Mobile: 'Введіть текст або торкніться синього мікрофона, щоб поговорити',
};

export const JAPANESE: Sentence = {
  ...ENGLISH,
  readedWelcome: 'この言語で交換しますか？',
  translationH2: 'テキストを入力するか、青いマイクを持って話します',
  translationH2Mobile: 'テキストを入力するか、青いマイクをタップして話します',
};

export const SPANISH: Sentence = {
  audioSupported: true,
  applicationName: 'Traducción instantánea',
  send: 'Enviar a',
  translate: 'Traducción',
  languageButtonRAW: 'Idioma español',
  languageButtonFR: 'langue espagnole',
  translationH2: 'Ingresa texto o mantén presionado el micrófono azul para hablar',
  translationH2Mobile: 'Ingresa texto o toca el micrófono azul para hablar',
  thanks: organization + ' te agradece',
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
  translationH2: 'Futni tekst ose shtypni dhe mbani mikrofonin blu për të folur',
  translationH2Mobile: 'Futni tekst ose prekni mikrofonin blu për të folur',
  thanks: organization + ' te agradece',
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
export const ALBANIAN_NO_VOICE: Sentence = {
  ...ALBANIAN,
  voiceNotSupported: true,
};
export const MANDARIN: Sentence = {
  audioSupported: true,
  applicationName: '即時翻譯',
  send: '發送',
  translate: '翻譯',
  translationH2: '輸入文字，或按住藍色麥克風講話',
  translationH2Mobile: '輸入文字，或點按藍色麥克風講話',
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
export const MANDARIN_NO_VOICE: Sentence = {
  ...MANDARIN,
  voiceNotSupported: true,
};
export const BENGALI: Sentence = {
  audioSupported: true,
  applicationName: 'তাত্ক্ষণিক অনুবাদ',
  send: 'পাঠান',
  translate: 'অনুবাদ',
  translationH2: 'টেক্সট লিখুন, অথবা কথা বলতে নীল মাইক্রোফোন টিপে ধরে রাখুন',
  translationH2Mobile: 'টেক্সট লিখুন, অথবা কথা বলতে নীল মাইকে ট্যাপ করুন',
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
export const BENGALI_GCP: Sentence = {
  ...BENGALI,
  audioSupported: false,
};
export const BENGALI_INDIA: Sentence = {
  ...BENGALI,
  audioSupported: true,
};

const RECORD_TEXT_DARI = 'الان صحبت کن';
const AUTO_LISTEN_DARI = 'پخپله غوږ شه';
export const DARI: Sentence = {
  applicationName: 'ترجمه فوری',
  send: 'ارسال',
  translate: 'ترجمه',
  translationH2: 'جمله را برای ترجمه بنویسید یا تلفظ کنید',
  thanks: organization + ' از شما متشکرم',
  listen: 'گوش دادن',
  recordText: RECORD_TEXT_DARI,
  displayedWelcome: '.سلام ، من مترجم شما خواهم بود تا با مشاور شما به راحتی تبادل شوید',
  readedWelcome: 'آیا می خواهید به این زبان ادامه دهید؟',
  autoListen: AUTO_LISTEN_DARI,
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
  translationH2: 'متن دننه کړئ ، یا د خبرو کولو لپاره نیلي مایکروفون فشار ورکړئ او ونیسئ',
  translationH2Mobile: 'متن دننه کړئ ، یا د خبرو کولو لپاره نیلي مایک ټایپ کړئ',
  thanks: 'پویل کارمند له تاسو څخه مننه',
  listen: 'واورئ',
  recordText: 'اوس خبره وکړه',
  gaugeText: 'Speak now',
  autoListen: AUTO_LISTEN_DARI,
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
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'متن درج کریں ، یا بولنے کے لیے نیلے مائیکروفون کو دبائیں اور تھامیں۔',
  translationH2Mobile: 'متن درج کریں ، یا بولنے کے لیے نیلے مائیک کو تھپتھپائیں۔',
  thanks: THANKS_EN,
  listen: 'Listen',
  recordText: 'اب بولو',
  gaugeText: 'Speak now',
  autoListen: AUTO_LISTEN_DARI,
  rate: {
    qualityTranslate: QUALITY_TRANSLATE,
    rating: RATING,
    comment: COMMENT,
    technical: TECHNICAL,
  },
  audioSupported: true
};
export const OURDOU_GCP: Sentence = {
  ...OURDOU,
  audioSupported: false,
};
export const PORTUGUESE: Sentence = {
  audioSupported: true,
  displayedWelcome: 'Olá eu sou sua interpretação.',
  readedWelcome: 'Deseja trocar neste idioma?',
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Digite o texto ou pressione e segure o microfone azul para falar',
  translationH2Mobile: 'Digite o texto ou toque no microfone azul para falar',
  thanks: THANKS_EN,
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
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Geben Sie Text ein oder halten Sie das blaue Mikrofon gedrückt, um zu sprechen',
  translationH2Mobile: 'Geben Sie Text ein oder tippen Sie auf das blaue Mikrofon, um zu sprechen',
  languageButtonRAW: 'Deutsche Sprache',
  languageButtonFR: 'langue allemande',
  thanks: THANKS_EN,
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
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Metin girin veya konuşmak için mavi mikrofonu basılı tutun',
  translationH2Mobile: 'Metni girin veya konuşmak için mavi mikrofona dokunun',
  thanks: THANKS_EN,
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
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'ጽሑፍ ያስገቡ ፣ ወይም ለመናገር ሰማያዊ ማይክሮፎን ተጭነው ይያዙ',
  translationH2Mobile: 'ጽሑፍ ያስገቡ ፣ ወይም ለመናገር ሰማያዊውን ማይክሮፎኑን መታ ያድርጉ',
  thanks: THANKS_EN,
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
  audioSupported: true
};
export const AMHARIC_GCP: Sentence = {
  ...AMHARIC,
  audioSupported: false
};
export const KHMER: Sentence = {
  displayedWelcome: 'ជំរាបសួរ, ខ្ញុំនឹងក្លាយជាអ្នកបកប្រែរបស់អ្នកដើម្បីផ្លាស់ប្តូរយ៉ាងងាយស្រួលជាមួយទីប្រឹក្សារបស់អ្នក។',
  readedWelcome: 'តើអ្នកចង់ផ្លាស់ប្តូរភាសានេះទេ?',
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'បញ្ចូលអត្ថបទឬចុចនិងសង្កត់មីក្រូហ្វូនពណ៌ខៀវដើម្បីនិយាយ',
  translationH2Mobile: 'បញ្ចូលអត្ថបទឬប៉ះមីក្រូពណ៌ខៀវដើម្បីនិយាយ',
  thanks: THANKS_EN,
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
  audioSupported: true
};
export const KHMER_NO_VOICE: Sentence = {
  ...KHMER,
  voiceNotSupported: true,
};
export const HINDI: Sentence = {
  audioSupported: true,
  displayedWelcome: 'नमस्कार, मैं आपके सलाहकार के साथ आसानी से आदान-प्रदान करने वाला आपका दुभाषिया बनूंगा।',
  readedWelcome: 'क्या आप इस भाषा में विनिमय करना चाहेंगे?',
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'टेक्स्ट दर्ज करें, या बोलने के लिए नीले माइक्रोफ़ोन को दबाकर रखें',
  translationH2Mobile: 'टेक्स्ट डालें या बोलने के लिए नीले माइक पर टैप करें',
  thanks: THANKS_EN,
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
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'உரையை உள்ளிடவும் அல்லது பேசுவதற்கு நீல ஒலிவாங்கியை அழுத்திப் பிடிக்கவும்',
  translationH2Mobile: 'உரையை உள்ளிடவும் அல்லது பேச நீல மைக்கைத் தட்டவும்',
  thanks: THANKS_EN,
  listen: 'Listen',
  recordText: 'இப்பொழுது பேசவும்',
  gaugeText: 'Speak now',
  autoListen: 'தானாகவே கேளுங்கள்',
  rate: {
    qualityTranslate: QUALITY_TRANSLATE,
    rating: RATING,
    comment: COMMENT,
    technical: TECHNICAL,
  },
  audioSupported: true
};
export const TAMOUL_GCP: Sentence = {
  ...TAMOUL,
  audioSupported: false,
};
export const TAMOUL_INDIA: Sentence = {
  ...TAMOUL,
  audioSupported: true,
};

export const ITALIAN: Sentence = {
  audioSupported: true,
  displayedWelcome: 'Ciao sono il tuo interprete.',
  readedWelcome: 'Ti piacerebbe scambiare in questa lingua?',
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Inserisci il testo o tieni premuto il microfono blu per parlare',
  translationH2Mobile: 'Inserisci il testo o tocca il microfono blu per parlare',
  thanks: THANKS_EN,
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
    technical: 'Hai riscontrato problemi tecnici utilizzando lo strumento?',
  },
};

export const MONGOL: Sentence = {
  displayedWelcome: 'Сайн байна уу, би зөвлөхтэйгээ хялбархан солилцох орчуулагч болно.',
  readedWelcome: 'Та энэ хэлээр солилцохыг хүсч байна уу?',
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Текст оруулах, эсвэл ярихын тулд цэнхэр микрофоныг удаан дарна уу',
  translationH2Mobile: 'Текст оруулах, эсвэл ярихын тулд цэнхэр микрофоныг товшино уу',
  thanks: THANKS_EN,
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
export const MONGOL_NO_VOICE: Sentence = {
  ...MONGOL,
  voiceNotSupported: true,
};
export const NEPALESE: Sentence = {
  displayedWelcome: 'नमस्कार, म तपाईको दोभाषे बन्ने छ तपाईंको सल्लाहकार संग सजिलै साटासाट गर्न।',
  readedWelcome: 'के तपाईं यस भाषामा आदान प्रदान गर्न चाहनुहुन्छ?',
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'पाठ प्रविष्ट गर्नुहोस्, वा नीलो माइक्रोफोन थिच्नुहोस् र बोल्नुहोस्',
  translationH2Mobile: 'पाठ प्रविष्ट गर्नुहोस्, वा बोल्न नीलो माइक ट्याप गर्नुहोस्',
  thanks: THANKS_EN,
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
export const NEPALESE_NO_VOICE: Sentence = {
  ...NEPALESE,
  voiceNotSupported: true,
};
export const RUSSIA: Sentence = {
  audioSupported: true,
  displayedWelcome: 'Привет я твой переводчик',
  readedWelcome: 'Вы хотите продолжить на этом языке?',
  applicationName: 'Мгновенный перевод',
  send: 'Отправить',
  translate: 'перевод',
  translationH2: 'Введите текст или нажмите и удерживайте синий микрофон, чтобы говорить',
  translationH2Mobile: 'Введите текст или коснитесь синего микрофона, чтобы говорить',
  thanks: organization + ' Спасибо вам.',
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
  displayedWelcome: 'Assalomu alaykum, maslahatchingiz bilan osonlikcha almashish uchun sizning tarjimoningiz bo\'lardim.',
  readedWelcome: 'Ushbu tilda almashishni xohlaysizmi?',
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Matn kiriting yoki gapirish uchun ko\'k mikrofonni bosib turing',
  translationH2Mobile: 'Matn kiriting yoki gapirish uchun ko\'k mikrofonga teging',
  thanks: THANKS_EN,
  listen: 'Listen',
  recordText: 'Hozir gapiring',
  gaugeText: 'Speak now',
  autoListen: 'Avtomatik tinglash',
  rate: {
    qualityTranslate: 'Tarjimalarning sifati qanday edi?',
    rating: 'Asbobni qanday baholaysiz?',
    comment: 'Bepul sharh',
    technical: 'Asbobni ishlatishda biron bir texnik muammoga duch keldingizmi?',
  },
  audioSupported: true
};
export const OUZBEK_GCP: Sentence = {
  ...OUZBEK,
  audioSupported: false,
};
export const ROMANIAN: Sentence = {
  audioSupported: true,
  displayedWelcome: 'Buna ziua, eu as fi interpretul tau pentru a schimba usor cu consilierul tau.',
  readedWelcome: 'Buna ziua, eu as fi interpretul tau pentru a schimba usor cu consilierul tau.',
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Introduceți text sau țineți apăsat microfonul albastru pentru a vorbi',
  translationH2Mobile: 'Introduceți text sau atingeți microfonul albastru pentru a vorbi',
  thanks: THANKS_EN,
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
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Geli qoraalka, ama riix oo qabso makarafoon buluug ah si aad u hadasho',
  translationH2Mobile: 'Geli qoraalka, ama taabo makarafoonka buluugga ah si aad u hadasho',
  thanks: THANKS_EN,
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
  applicationName: APPLICATION_NAME,
  send: 'Send',
  translate: 'Translate',
  translationH2: 'Nhập văn bản hoặc nhấn và giữ micrô màu xanh lam để nói',
  translationH2Mobile: 'Nhập văn bản hoặc nhấn vào micrô màu xanh lam để nói',
  thanks: THANKS_EN,
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
  translationH2: 'متن را وارد کنید ، یا میکروفون آبی را برای صحبت فشار داده و نگه دارید',
  translationH2Mobile: 'متن را وارد کنید یا برای صحبت روی میکروفن آبی ضربه بزنید',
  thanks: organization + ' از شما متشکرم',
  listen: 'گوش دادن',
  recordText: RECORD_TEXT_DARI,
  gaugeText: RECORD_TEXT_DARI,
  languageButtonRAW: 'زبان فارسی',
  languageButtonFR: 'langue persane',
  rate: {
    qualityTranslate: 'کیفیت ترجمه ها چگونه بود؟',
    rating: 'ابزار را چگونه ارزیابی می کنید؟',
    comment: 'نظر رایگان',
    technical: 'آیا با استفاده از این ابزار به مشکلات فنی برخورد کرده اید؟',
  },
  audioSupported: true
};
export const PERSAN_GCP: Sentence = {
  ...PERSAN,
    audioSupported: false
};
export const GREEK: Sentence = {
  audioSupported: true,
  applicationName: 'Άμεση μετάφραση',
  send: 'Αποστολή',
  translate: 'Μετάφραση',
  translationH2: 'Εισαγάγετε κείμενο ή πατήστε παρατεταμένα το μπλε μικρόφωνο για να μιλήσετε',
  translationH2Mobile: 'Εισαγάγετε κείμενο ή πατήστε το μπλε μικρόφωνο για να μιλήσετε',
  thanks: organization + ' σε ευχαριστώ',
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
  translationH2: 'Въведете текст или натиснете и задръжте син микрофон, за да говорите',
  translationH2Ios: 'Напишете изречението за превод',
  translationH2Mobile: 'Въведете текст или докоснете синия микрофон, за да говорите',
};

export const AFRIKAANS: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Wil jy in hierdie taal uitruil?',
  translationH2: 'Skryf die sin om te vertaal.',
  translationH2Mobile: 'Voer teks in, of hou die blou mikrofoon om te praat',

};

export const ARMENIAN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Ցանկանու՞մ եք շարունակել այս լեզվով:',
  translationH2: 'Մուտքագրեք տեքստ կամ հպեք կապույտ խոսափողին՝ խոսելու համար',
  translationH2Mobile: 'Մուտքագրեք տեքստ կամ հպեք կապույտ խոսափողին՝ խոսելու համար',
  audioSupported: true

};
export const ARMENIAN_GCP: Sentence = {
  ...ARMENIAN,
  audioSupported: false
};

export const BASQUE: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Hizkuntza honetan jarraitu nahi duzu?',
  translationH2: 'Idatzi testua edo sakatu mikro urdina hitz egiteko',
  translationH2Mobile: 'Idatzi testua edo sakatu mikro urdina hitz egiteko',
  audioSupported: true
};

export const BASQUE_GCP: Sentence = {
  ...BASQUE,
  audioSupported: false
};
export const ICELAND: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Viltu halda áfram á þessu tungumáli?',
  translationH2: 'Sláðu inn texta eða haltu bláa hljóðnemanum til að tala',
  translationH2Mobile: 'Sláðu inn texta eða pikkaðu á bláa hljóðnemann til að tala',

};

export const SERBIAN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Да ли желите да наставите на овом језику?',
  translationH2: 'Напиши реченицу за превод.',
  translationH2Mobile: 'Унесите текст или додирните плави микрофон да бисте говорили.',

};

export const GEORGIAN: Sentence = {
  ...ENGLISH_DEFAULT,
  readedWelcome: 'გსურთ ამ ენაზე გაგრძელება?',
  translationH2: 'შეიყვანეთ ტექსტი, ან გეჭიროთ ლურჯი მიკროფონი სალაპარაკოდ',
  translationH2Mobile: 'შეიყვანეთ ტექსტი, ან შეეხეთ ლურჯ მიკროფონს სასაუბროდ',

};


export const CROATIAN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Želite li nastaviti na ovom jeziku?',
  translationH2: 'Unesite tekst ili držite plavi mikrofon da biste govorili\'',
  translationH2Mobile: 'Unesite tekst ili držite plavi mikrofon da biste govorili\'',

};
export const CROATIAN_GCP: Sentence = {
  ...CROATIAN,
  audioSupported: false

};
export const BOSNIAN: Sentence = {
  ...ENGLISH,
  audioSupported: false,
  readedWelcome: 'Želite li razmjenjivati ​​na ovom jeziku?',
  translationH2: 'Unesite tekst ili pritisnite i držite plavi mikrofon za govori\'',
  translationH2Mobile: 'Unesite tekst ili dodirnite plavi mikrofon da govorite\'',
};
export const BIRMAN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'ဤဘာသာစကားဖြင့် လဲလှယ်လိုပါသလား။',
  translationH2: 'စာသားရိုက်ထည့်ပါ သို့မဟုတ် စကားပြောရန် အပြာရောင်မိုက်ခရိုဖုန်းကို နှိပ်ပြီး ဖိထားပါ။\'',
  translationH2Mobile: 'စာသားရိုက်ထည့်ပါ သို့မဟုတ် စကားပြောရန် အပြာရောင်မိုက်ကို တို့ပါ။\'',
};
export const BIRMAN_GCP: Sentence = {
  ...BIRMAN,
  audioSupported: false
};
export const TAGALOG: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Gusto mo bang makipagpalitan sa wikang ito?',
  translationH2: 'Maglagay ng text, o pindutin nang matagal ang asul na mikropono upang magsalita\'',
  translationH2Mobile: 'Maglagay ng text, o i-tap ang asul na mikropono para magsalita\'',
};

export const MALAIS: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Adakah anda ingin bertukar dalam bahasa ini?',
  translationH2: 'Tulis ayat untuk diterjemahkan.',
  translationH2Mobile: 'Masukkan teks atau ketik mikrofon biru untuk bercakap.',
};
export const CATALAN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'T\'agradaria intercanviar en aquest idioma?',
  translationH2: 'Escriu la frase per traduir.',
  translationH2Mobile: 'Introdueix text o toca el micròfon blau per parlar.',
};
export const CINGALAIS: Sentence = {
  ...ENGLISH,
  readedWelcome: 'ඔබ මෙම භාෂාවෙන් හුවමාරු කර ගැනීමට කැමතිද?',
  translationH2: 'පරිවර්තනය කිරීමට වාක්‍යය ලියන්න.',
  translationH2Mobile: 'කතා කිරීමට පෙළ ඇතුළු කරන්න, නැතහොත් නිල් මයික් එක තට්ටු කරන්න.',
};

export const GALICEIN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Gustaríache intercambiar neste idioma?',
  translationH2: 'Escribe a frase para traducir.',
  translationH2Mobile: 'Introduce texto ou toca o micrófono azul para falar.',
};

export const JAVANAIS: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Apa sampeyan pengin ijol-ijolan ing basa iki?',
  translationH2: 'Tulisen ukara kanggo nerjemahake.',
  translationH2Mobile: 'Ketik teks, utawa tutul mikrofon biru kanggo ngomong.',
};
export const KAZAKH: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Осы тілде алмасуды қалайсыз ба?',
  translationH2: 'Аударылатын сөйлемді жазыңыз.',
  translationH2Mobile: 'Мәтінді енгізіңіз немесе сөйлеу үшін көк микрофонды түртіңіз.',
};
export const LAO: Sentence = {
  ...ENGLISH,
  readedWelcome: 'ເຈົ້າຢາກແລກປ່ຽນໃນພາສານີ້ບໍ?',
  translationH2: 'ຂຽນປະໂຫຍກທີ່ຈະແປ.',
  translationH2Mobile: 'ປ້ອນຂໍ້ຄວາມ, ຫຼືແຕະໄມສີຟ້າເພື່ອເວົ້າ.',
};
export const LITUANIEN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Vai vēlaties apmainīties šajā valodā?',
  translationH2: 'Uzrakstiet tulkojamo teikumu.',
  translationH2Mobile: 'Ievadiet tekstu vai pieskarieties zilajam mikrofonam, lai runātu.',
};
export const MACEDONIEN: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Дали сакате да разменувате на овој јазик?',
  translationH2: 'Напишете ја реченицата за преведување.',
  translationH2Mobile: 'Внесете текст или допрете го синиот микрофон за да зборувате.',
};
export const MARATHI: Sentence = {
  ...ENGLISH,
  readedWelcome: 'तुम्ही या भाषेत देवाणघेवाण करू इच्छिता?',
  translationH2: 'भाषांतर करण्यासाठी वाक्य लिहा.',
  translationH2Mobile: 'मजकूर एंटर करा किंवा बोलण्यासाठी निळ्या माइकवर टॅप करा.',
};
export const SOUDNANAIS: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Naha anjeun badé tukeur dina basa ieu?',
  translationH2: 'Tulis kalimah pikeun narjamahkeun.',
  translationH2Mobile: 'Tulis teks, atawa ketok mikrofon biru pikeun nyarita.',
};
export const SWAHILI: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Je, ungependa kubadilishana katika lugha hii?',
  translationH2: 'Andika sentensi ili kutafsiri.',
  translationH2Mobile: 'Weka maandishi, au uguse maikrofoni ya bluu ili kuzungumza.',
};
export const ZOULOU: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Ungathanda ukushintshanisa ngalolu limi?',
  translationH2: 'Bhala umusho ozowuhumusha.',
  translationH2Mobile: 'Faka umbhalo, noma thepha imakrofoni eluhlaza ukuze ukhulume.',
};
export const LETTON: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Vai vēlaties apmainīties šajā valodā?',
  translationH2: 'Uzrakstiet tulkojamo teikumu.',
  translationH2Mobile: 'Ievadiet tekstu vai pieskarieties zilajam mikrofonam, lai runātu.',
};
export const SLOVAKIA: Sentence = {
  ...ENGLISH,
  readedWelcome: 'Chceli by ste si vymeniť v tomto jazyku?',
  translationH2: 'Napíšte vetu, ktorú chcete preložiť.',
  translationH2Mobile: 'Zadajte text alebo hovorte klepnutím na modrý mikrofón.',
};
