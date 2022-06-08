import { Gdpr } from './gdpr';

export interface Vocabulary {
  isoCode: string;
  countryNameRaw?: any;
  countryNameFr?: string;
  languageNameRaw?: string;
  languageNameFr?: string;
  sentences: Sentence;
  navbarTabs?: NavbarTab;
  audioCode?: string;
  audioVoiceCode?: string;
}
export interface Sentence {
  applicationName: string;
  send: string;
  translate: string;
  translationH2: string;
  thanks: string;
  listen: string;
  recordText: string;
  displayedWelcome: string;
  readedWelcome: string;
  autoListen?: string;
  audioSupported?: boolean;
  voiceNotSupported?: boolean;
  languageButtonRAW?: string;
  languageButtonFR?: string;
  gaugeText?: string;
  rate?: Rate;
  gdpr?: Gdpr;
  logout?: Logout;
  modality?: Modality;
  choice?: Choice;
  tooltip?: Tooltip;
  introMessage?: IntroMessage;
  translationH2Ios?: string;
  translationH2Mobile?: string;

}
export interface Tooltip {
  pronounce: string;
  noPronounce: string;
  listen: string;
  noListen: string;
  audio: string;
}
export interface IntroMessage {
  welcomeFR: string;
  welcomeRAW: string;
  notifMultiFR: string;
  notifMultiRAW: string;
  voiceavailabilityRAW: string;
  voiceavailabilityFR: string;
}
export interface Choice {
  mostBtn: string;
  allBtn: string;
  listBtn: string;
  gridBtn: string;
  chooseBtn: string;
  search: string;
  voice?: string;
}

export interface Modality {
  title: string;
  monoSupport: string;
  multiSupport: string;
  monoSentenceFR: string;
  multiSentenceFR: string;
  confirm: string;
}
export interface Rate {
  qualityTranslate: string;
  rating: string;
  comment: string;
  technical: string;
  typeInterview?: string;
}

export interface NavbarTab {
  language: string;
  logout: string;
  help: string;
  gdpr: string;
}

export interface Logout {
  title: string;
  question: string;
  cancel: string;
  confirm: string;
}
export interface Onboarding {
  image: string;
  indicationFR?: string;
  indicationEN: string;
  textFR?: string;
  textEN: string;
  browserFR?: string;
  browserEN?: string;
}
export interface OnboardingTitle {
  helpFR?: string;
  helpEN: string;
  descriptionFR?: string;
  descriptionEN: string;
}
