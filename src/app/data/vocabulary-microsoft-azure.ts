import { Vocabulary } from '../models/vocabulary';
import {
  ALBANIAN,
  AMHARIC,
  ARAB,
  BENGALI,
  BENGALI_INDIA,
  BULGARE,
  CZECH,
  DANISH,
  DARI,
  ENGLISH,
  ENGLISH_DEFAULT,
  ENGLISH_DEFAULT_NO_VOICE,
  ESTONIAN,
  FINLAND,
  FRENCH,
  GERMAN,
  GREEK,
  GUJARATI,
  HEBREW,
  HINDI,
  HOLLAND,
  HUNGARIAN,
  INDONESIA,
  ITALIAN,
  JAPANESE,
  KANNADA,
  KHMER,
  KOREA,
  MALAYALAM,
  MANDARIN,
  MONGOL,
  NAVBAR_ENGLISH_TABS,
  NEPALESE,
  NORWAY,
  OURDOU,
  OUZBEK,
  PACHTO,
  PENDJABI,
  PERSAN,
  POLAND,
  PORTUGUESE,
  ROMANIAN,
  RUSSIA,
  SLOVENIA,
  SOMALI,
  SPANISH,
  SWEDEN,
  TAMOUL,
  TAMOUL_INDIA,
  TELUGU,
  THAILAND,
  TURC,
  UKRAINE,
  VIETNAMESE
} from './sentence';

export const VOCABULARY_DEFAULT: Vocabulary = {
  isoCode: 'default',
  sentences: ENGLISH,
  navbarTabs: NAVBAR_ENGLISH_TABS
};

export const VOCABULARY_AZURE: Vocabulary[] = [
  {
    isoCode: 'ar-IL',
    audioCode: 'ar-XA',
    countryNameRaw: 'إسرائيل',
    countryNameFr: 'Israël',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-DZ',
    audioCode: 'ar-XA',
    countryNameRaw: 'الجزائر',
    countryNameFr: 'Algérie',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-JO',
    audioCode: 'ar-XA',
    countryNameRaw: 'الأردن',
    countryNameFr: 'Jordanie',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-AE',
    audioCode: 'ar-XA',
    countryNameRaw: 'الإمارات',
    countryNameFr: 'Emirats Arabes Unis',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-BH',
    audioCode: 'ar-XA',
    countryNameRaw: 'البحرين',
    countryNameFr: 'Bahreïn',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-XA',
    audioCode: 'ar-XA',
    countryNameRaw: 'الدول العربية',
    countryNameFr: 'Pays arabes',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-SA',
    audioCode: 'ar-XA',
    countryNameRaw: 'السعودية',
    countryNameFr: 'Arabie Saoudite',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-IQ',
    audioCode: 'ar-XA',
    countryNameRaw: 'العراق',
    countryNameFr: 'Irak',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-KW',
    audioCode: 'ar-XA',
    countryNameRaw: 'الكويت',
    countryNameFr: 'Koweït',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-MA',
    audioCode: 'ar-XA',
    countryNameRaw: 'المغرب',
    countryNameFr: 'Maroc',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-TN',
    audioCode: 'ar-XA',
    countryNameRaw: 'تونس',
    countryNameFr: 'Tunisie',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-OM',
    audioCode: 'ar-XA',
    countryNameRaw: 'عُمان',
    countryNameFr: 'Oman',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-PS',
    audioCode: 'ar-XA',
    countryNameRaw: 'فلسطين',
    countryNameFr: 'Palestine',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-QA',
    audioCode: 'ar-XA',
    countryNameRaw: 'قطر',
    countryNameFr: 'Qatar',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-LB',
    audioCode: 'ar-XA',
    countryNameRaw: 'لبنان',
    countryNameFr: 'Liban',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'ar-EG',
    audioCode: 'ar-XA',
    countryNameRaw: 'مصر',
    countryNameFr: 'Égypte',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'fa-IR',
    countryNameRaw: 'ایران',
    countryNameFr: 'Iran',
    languageNameRaw: 'فارسی',
    languageNameFr: 'Persan',
    sentences: PERSAN
  },
  {
    isoCode: 'fr-FR',
    countryNameRaw: 'France',
    countryNameFr: 'France',
    languageNameRaw: 'Français',
    languageNameFr: 'Français',
    sentences: FRENCH
  },
  {
    isoCode: 'en-GB',
    countryNameRaw: 'United Kingdom',
    countryNameFr: 'Royaume-Uni',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'es-ES',
    countryNameRaw: 'España',
    countryNameFr: 'Espagne',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-AR',
    audioCode: 'es-ES',
    countryNameRaw: 'Argentina',
    countryNameFr: 'Argentine',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'en-AU',
    audioCode: 'en-AU',
    countryNameRaw: 'Australia',
    countryNameFr: 'Australie',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-GH',
    audioCode: 'en-GB',
    countryNameRaw: 'Ghana',
    countryNameFr: 'Ghana',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-CA',
    audioCode: 'en-US',
    countryNameRaw: 'Canada',
    countryNameFr: 'Canada',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'fr-CA',
    audioCode: 'fr-CA',
    countryNameRaw: 'Canada',
    countryNameFr: 'Canada',
    languageNameRaw: 'Français',
    languageNameFr: 'Français',
    sentences: FRENCH
  },
  {
    isoCode: 'en-IN',
    countryNameRaw: 'India',
    countryNameFr: 'Inde',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-ZA',
    audioCode: 'en-GB',
    countryNameRaw: 'South Africa',
    countryNameFr: 'Afrique du Sud',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-IE',
    audioCode: 'en-GB',
    countryNameRaw: 'Ireland',
    countryNameFr: 'Irelande',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-KE',
    audioCode: 'en-GB',
    countryNameRaw: 'Kenya',
    countryNameFr: 'Kenya',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-NZ',
    audioCode: 'en-GB',
    countryNameRaw: 'New Zealand',
    countryNameFr: 'Nouvelle-Zélande',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-SG',
    audioCode: 'en-GB',
    countryNameRaw: 'Singapore',
    countryNameFr: 'Singapour',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-PH',
    audioCode: 'en-GB',
    countryNameRaw: 'Philippines',
    countryNameFr: 'Philippines',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-NG',
    audioCode: 'en-GB',
    countryNameRaw: 'Nigeria',
    countryNameFr: 'Nigeria',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-TZ',
    audioCode: 'en-GB',
    countryNameRaw: 'Tanzania',
    countryNameFr: 'Tanzanie',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'en-US',
    countryNameRaw: 'United-States',
    countryNameFr: 'États-Unis',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'fa-AF',
    countryNameRaw: 'افغانستان',
    countryNameFr: 'Afghanistan',
    languageNameFr: 'Dari',
    languageNameRaw: 'دري',
    sentences: DARI
  },
  {
    isoCode: 'ps-AF',
    countryNameRaw: 'افغانستان',
    countryNameFr: 'Afghanistan',
    languageNameFr: 'Pachto',
    languageNameRaw: 'پښتو',
    sentences: PACHTO
  },
  {
    isoCode: 'ur-PK',
    countryNameRaw: 'پاکستان',
    countryNameFr: 'Pakistan',
    languageNameFr: 'Ourdou',
    languageNameRaw: 'اردو',
    sentences: OURDOU
  },
  {
    isoCode: 'pt-PT',
    countryNameRaw: 'Portugal',
    countryNameFr: 'Portugal',
    languageNameFr: 'Portugais',
    languageNameRaw: 'Português',
    sentences: PORTUGUESE
  },
  {
    isoCode: 'tr-TR',
    countryNameRaw: 'Türkiye',
    countryNameFr: 'Turquie',
    languageNameFr: 'Turc',
    languageNameRaw: 'Türkçe',
    sentences: TURC
  },
  {
    isoCode: 'de-DE',
    countryNameRaw: 'Deutschland',
    countryNameFr: 'Allemagne',
    languageNameFr: 'Allemand',
    languageNameRaw: 'Deutsch',
    sentences: GERMAN
  },
  {
    isoCode: 'hi-IN',
    countryNameRaw: 'भारत',
    countryNameFr: 'Inde',
    languageNameFr: 'Hindi',
    languageNameRaw: 'हिन्दी',
    sentences: HINDI
  },
  {
    isoCode: 'ta-IN',
    countryNameRaw: 'இந்தியா',
    countryNameFr: 'Inde',
    languageNameFr: 'Tamoul',
    languageNameRaw: 'தமிழ்',
    sentences: TAMOUL_INDIA
  },
  {
    isoCode: 'it-IT',
    countryNameRaw: 'Italia',
    countryNameFr: 'Italie',
    languageNameFr: 'Italien',
    languageNameRaw: 'Italiano',
    sentences: ITALIAN
  },
  {
    isoCode: 'ru-RU',
    countryNameRaw: 'Россия',
    countryNameFr: 'Russie',
    languageNameFr: 'Russe',
    languageNameRaw: 'Русский',
    sentences: RUSSIA
  },
  {
    isoCode: 'ro-RO',
    countryNameRaw: 'România',
    countryNameFr: 'Roumanie',
    languageNameFr: 'Roumain',
    languageNameRaw: 'Română',
    sentences: ROMANIAN
  },
  {
    isoCode: 'so-SO',
    countryNameRaw: 'Soomaaliya',
    countryNameFr: 'Somalie',
    languageNameFr: 'Somali',
    languageNameRaw: 'Af-Soomaali',
    sentences: SOMALI
  },
  {
    isoCode: 'vi-VN',
    countryNameRaw: 'Việt Nam',
    countryNameFr: 'Vietnam',
    languageNameFr: 'Vietnamien',
    languageNameRaw: 'Tiếng Việt',
    sentences: VIETNAMESE
  },
  {
    isoCode: 'el-GR',
    countryNameRaw: 'Ελλάδα',
    countryNameFr: 'Grèce',
    languageNameFr: 'Grec',
    languageNameRaw: 'Ελληνικά',
    sentences: GREEK
  },
  {
    isoCode: 'es-BO',
    audioCode: 'es-ES',
    countryNameRaw: 'Bolivia',
    countryNameFr: 'Bolivie',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-CL',
    audioCode: 'es-ES',
    countryNameRaw: 'Chile',
    countryNameFr: 'Chili',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-CO',
    audioCode: 'es-ES',
    countryNameRaw: 'Colombia',
    countryNameFr: 'Colombie',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-CR',
    audioCode: 'es-ES',
    countryNameRaw: 'Costa Rica',
    countryNameFr: 'Costa Rica',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-EC',
    audioCode: 'es-ES',
    countryNameRaw: 'Ecuador',
    countryNameFr: 'Equateur',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-SV',
    audioCode: 'es-ES',
    countryNameRaw: 'El Salvador',
    countryNameFr: 'Salvador',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-US',
    countryNameRaw: 'Estados Unidos',
    audioCode: 'es-ES',
    countryNameFr: 'États-Unis',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-GT',
    audioCode: 'es-ES',
    countryNameRaw: 'Guatemala',
    countryNameFr: 'Guatemala',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-HN',
    audioCode: 'es-ES',
    countryNameRaw: 'Honduras',
    countryNameFr: 'Honduras',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-MX',
    audioCode: 'es-ES',
    countryNameRaw: 'México',
    countryNameFr: 'Mexique',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-NI',
    audioCode: 'es-ES',
    countryNameRaw: 'Nicaragua',
    countryNameFr: 'Nicaragua',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-PA',
    audioCode: 'es-ES',
    countryNameRaw: 'Panamà',
    countryNameFr: 'Panama',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-PY',
    audioCode: 'es-ES',
    countryNameRaw: 'Paraguay',
    countryNameFr: 'Paraguay',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-PE',
    audioCode: 'es-ES',
    countryNameRaw: 'Perù',
    countryNameFr: 'Pérou',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-PR',
    audioCode: 'es-ES',
    countryNameRaw: 'Puerto Rico',
    countryNameFr: 'Porto Rico',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-DO',
    audioCode: 'es-ES',
    countryNameRaw: 'República Dominicana',
    countryNameFr: 'République Dominicaine',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-UY',
    audioCode: 'es-ES',
    countryNameRaw: 'Uruguay',
    countryNameFr: 'Uruguay',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'es-VE',
    audioCode: 'es-ES',
    countryNameRaw: 'Venezuela',
    countryNameFr: 'Vénézuéla',
    languageNameRaw: 'Español',
    languageNameFr: 'Espagnol',
    sentences: SPANISH
  },
  {
    isoCode: 'th-TH',
    countryNameRaw: 'ประเทศไทย',
    countryNameFr: 'Thaïlande',
    languageNameRaw: 'ไทย',
    languageNameFr: 'Thaï',
    sentences: THAILAND
  },
  {
    isoCode: 'ko-KR',
    countryNameRaw: '대한민국',
    countryNameFr: 'Corée du Sud',
    languageNameRaw: '한국어',
    languageNameFr: 'Coréen',
    sentences: KOREA
  },
  {
    isoCode: 'ja-JP',
    countryNameRaw: '日本',
    countryNameFr: 'Japon',
    languageNameRaw: '日本語',
    languageNameFr: 'Japonais',
    sentences: JAPANESE
  },
  {
    isoCode: 'en-HK',
    audioCode: 'en-GB',
    countryNameRaw: 'Hong Kong',
    countryNameFr: 'Hong Kong',
    languageNameRaw: 'English',
    languageNameFr: 'Anglais',
    sentences: ENGLISH
  },
  {
    isoCode: 'ar-YE',
    audioCode: 'ar-XA',
    countryNameRaw: 'اليمن',
    countryNameFr: 'Yémen',
    languageNameRaw: 'العربية',
    languageNameFr: 'Arabe',
    sentences: ARAB
  },
  {
    isoCode: 'gu-IN',
    countryNameRaw: 'ભારત',
    countryNameFr: 'Inde',
    languageNameRaw: 'ગુજરાતી',
    languageNameFr: 'Gujarati',
    sentences: GUJARATI
  },
  {
    isoCode: 'hr-HR',
    countryNameRaw: 'Hrvatska',
    countryNameFr: 'Croatie',
    languageNameRaw: 'Hrvatski',
    languageNameFr: 'Croate',
    sentences: ENGLISH_DEFAULT
  },
  {
    isoCode: 'kn-IN',
    countryNameRaw: 'ಭಾರತ',
    countryNameFr: 'Inde',
    languageNameRaw: 'ಕನ್ನಡ',
    languageNameFr: 'Kannada',
    sentences: KANNADA
  },
  {
    isoCode: 'lv-LV',
    countryNameRaw: 'latviešu',
    countryNameFr: 'Lettonie',
    languageNameRaw: 'Latviešu',
    languageNameFr: 'Letton',
    sentences: ENGLISH_DEFAULT
  },
  {
    isoCode: 'lt-LT',
    countryNameRaw: 'Lietuva',
    countryNameFr: 'Lituanie',
    languageNameRaw: 'Lietuvių',
    languageNameFr: 'Lituanien',
    sentences: ENGLISH_DEFAULT
  },
  {
    isoCode: 'hu-HU',
    countryNameRaw: 'Magyarország',
    countryNameFr: 'Hongrie',
    languageNameRaw: 'Magyar',
    languageNameFr: 'Hongrois',
    sentences: HUNGARIAN
  },
  {
    isoCode: 'mr-IN',
    countryNameRaw: 'भारत',
    countryNameFr: 'Inde',
    languageNameRaw: 'मराठी',
    languageNameFr: 'Marathi',
    sentences: ENGLISH_DEFAULT
  },
  {
    isoCode: 'nl-NL',
    countryNameRaw: 'Nederlands',
    countryNameFr: 'Pays-Bas',
    languageNameRaw: 'Nederlands',
    languageNameFr: 'Néerlandais',
    sentences: HOLLAND
  },
  {
    isoCode: 'nb-NO',
    countryNameRaw: 'Norge',
    countryNameFr: 'Norvège',
    languageNameRaw: 'Norsk bokmål',
    languageNameFr: 'Norvégien bokmål',
    sentences: NORWAY
  },
  {
    isoCode: 'pl-PL',
    countryNameRaw: 'Polska',
    countryNameFr: 'Pologne',
    languageNameRaw: 'Polski',
    languageNameFr: 'Polonais',
    sentences: POLAND
  },
  {
    isoCode: 'pt-BR',
    countryNameRaw: 'Brasil',
    countryNameFr: 'Brésil',
    languageNameRaw: 'Português',
    languageNameFr: 'Portugais',
    sentences: PORTUGUESE
  },
  {
    isoCode: 'sk-SK',
    countryNameRaw: 'Slovensko',
    countryNameFr: 'Slovaquie',
    languageNameRaw: 'Slovenčina',
    languageNameFr: 'Slovaque',
    sentences: SLOVENIA
  },
  {
    isoCode: 'sl-SI',
    countryNameRaw: 'Slovenija',
    countryNameFr: 'Slovénie',
    languageNameRaw: 'Slovenščina',
    languageNameFr: 'Slovène',
    sentences: ENGLISH_DEFAULT
  },
  {
    isoCode: 'sw-KE',
    countryNameRaw: 'Kenya',
    countryNameFr: 'Kenya',
    languageNameRaw: 'Swahili',
    languageNameFr: 'Swahili',
    sentences: ENGLISH_DEFAULT
  },
  {
    isoCode: 'fi-FI',
    countryNameRaw: 'Suomi',
    countryNameFr: 'Finlande',
    languageNameRaw: 'Suomalainen',
    languageNameFr: 'Finnois',
    sentences: FINLAND
  },
  {
    isoCode: 'sv-SE',
    countryNameRaw: 'Sverige',
    countryNameFr: 'Suède',
    languageNameRaw: 'Svenska',
    languageNameFr: 'Suédois',
    sentences: SWEDEN
  },
  {
    isoCode: 'te-IN',
    countryNameRaw: 'భారతదేశం',
    countryNameFr: 'Inde',
    languageNameRaw: 'తెలుగు',
    languageNameFr: 'Télougou',
    sentences: TELUGU
  },
  {
    isoCode: 'bg-BG',
    countryNameRaw: 'България',
    countryNameFr: 'Bulgarie',
    languageNameRaw: 'Български',
    languageNameFr: 'Bulgare',
    sentences: BULGARE
  },
  {
    isoCode: 'he-IL',
    countryNameRaw: 'ישראל',
    countryNameFr: 'Israël',
    languageNameRaw: 'עברית',
    languageNameFr: 'Hébreu',
    sentences: HEBREW
  },
  {
    isoCode: 'da-DK',
    countryNameRaw: 'Danmark',
    countryNameFr: 'Danemark',
    languageNameRaw: 'Dansk',
    languageNameFr: 'Danois',
    sentences: DANISH
  },
  {
    isoCode: 'ca-ES',
    countryNameRaw: 'Espanya',
    countryNameFr: 'Espagne',
    languageNameRaw: 'Català',
    languageNameFr: 'Catalan',
    sentences: ENGLISH_DEFAULT
  },
  {
    isoCode: 'id-ID',
    countryNameRaw: 'Indonesia',
    countryNameFr: 'Indonésie',
    languageNameRaw: 'Bahasa Indonesia',
    languageNameFr: 'Indonésien',
    sentences: INDONESIA
  },
  {
    isoCode: 'ms-MY',
    countryNameRaw: 'Malaysia',
    countryNameFr: 'Malaisie',
    languageNameRaw: 'Bahasa Melayu',
    languageNameFr: 'Malais',
    sentences: ENGLISH_DEFAULT
  },
  {
    isoCode: 'cs-CZ',
    countryNameRaw: 'Česká republika',
    countryNameFr: 'République Tchèque',
    languageNameRaw: 'Čeština',
    languageNameFr: 'Tchèque',
    sentences: CZECH
  },
  {
    isoCode: 'fil-PH',
    countryNameRaw: 'Pilipinas',
    countryNameFr: 'Philippines',
    languageNameRaw: 'Tagalog',
    languageNameFr: 'Tagalog',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'lb-LU',
    countryNameRaw: `Lëtzebuerg`,
    countryNameFr: 'Luxembourg',
    languageNameRaw: 'Lëtzebuergesch',
    languageNameFr: 'Luxembourgeois',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'mg-MG',
    countryNameRaw: 'Madagaskar',
    countryNameFr: 'Madagascar',
    languageNameRaw: 'Malagasy',
    languageNameFr: 'Malgache',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'mi-NZ',
    countryNameRaw: 'Niu Tireni',
    countryNameFr: 'Nouvelle-Zélande',
    languageNameRaw: 'Maori',
    languageNameFr: 'Maori',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'or-IN',
    countryNameRaw: `ଭାରତ`,
    countryNameFr: 'Inde',
    languageNameRaw: `ଓଡିଆ`,
    languageNameFr: 'Odia',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'or-WS',
    countryNameRaw: 'Samoa',
    countryNameFr: 'Samoa',
    languageNameRaw: 'Samoan',
    languageNameFr: 'Samoan',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'be-BY',
    countryNameRaw: 'Беларусь',
    countryNameFr: 'Biélorussie',
    languageNameRaw: 'Беларусь',
    languageNameFr: 'Biélorusse',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'tk-TM',
    countryNameRaw: 'Türkmenistan',
    countryNameFr: 'Turkménistan',
    languageNameRaw: 'Türkmenler',
    languageNameFr: 'Turkmène',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'tg-TJ',
    countryNameRaw: 'Тоҷикистон',
    countryNameFr: 'Tajikistan',
    languageNameRaw: 'Тоҷикӣ',
    languageNameFr: 'Tajik',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'pa-IN',
    countryNameRaw: 'ਭਾਰਤ',
    countryNameFr: 'Inde',
    languageNameRaw: 'ਪੰਜਾਬੀ',
    languageNameFr: 'Pendjabi',
    sentences: PENDJABI
  },
  {
    isoCode: 'et-EE',
    countryNameRaw: 'Eesti',
    countryNameFr: 'Estonie',
    languageNameRaw: 'Eestlane',
    languageNameFr: 'Estonien',
    sentences: ESTONIAN
  },
  {
    isoCode: 'ht-HT',
    countryNameRaw: 'Ayiti',
    countryNameFr: 'Haïti',
    languageNameRaw: 'Kreyòl ayisyen',
    languageNameFr: 'Créole haïtien',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'sn-ZW',
    countryNameRaw: 'Zimbabwe',
    countryNameFr: 'Zimbabwe',
    languageNameRaw: 'Weshona',
    languageNameFr: 'Shona',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'hmn-CN',
    countryNameRaw: 'Tuam Tshoj',
    countryNameFr: 'Chine',
    languageNameRaw: 'Hmoob',
    languageNameFr: 'Hmoong',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'haw-US',
    countryNameRaw: 'amelike Hui Pū\' Ia',
    countryNameFr: 'Etats-unis',
    languageNameRaw: 'Ōlelo Hawaiʻi',
    languageNameFr: 'Hawaïen',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'ug-CN',
    countryNameRaw: 'جۇڭگو',
    countryNameFr: 'Chine',
    languageNameRaw: 'ئۇيغۇر',
    languageNameFr: 'Ouïghour',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'xh-ZA',
    countryNameRaw: 'Mzantsi Afrika',
    countryNameFr: 'Afrique du Sud',
    languageNameRaw: 'isiXhosa',
    languageNameFr: 'Xhosa',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'yo-NG',
    countryNameRaw: 'Nigeria',
    countryNameFr: 'Nigeria',
    languageNameRaw: 'Yoruba',
    languageNameFr: 'Yoruba',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'ny-MW',
    countryNameRaw: 'Malawi',
    countryNameFr: 'Malawi',
    languageNameRaw: 'Chewa',
    languageNameFr: 'Chewa',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  },
  {
    isoCode: 'mt-MT',
    countryNameRaw: 'Malti',
    countryNameFr: 'Maltais',
    languageNameRaw: 'Malta',
    languageNameFr: 'Malte',
    sentences: ENGLISH_DEFAULT_NO_VOICE
  }
];
