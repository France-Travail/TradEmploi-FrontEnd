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
  languageButtonRAW?: string;
  languageButtonFR?: string;
  gaugeText?: string;
  rate?: Rate;
  gdpr?: Gdpr;
  logout?: Logout;
  modality?: Modality;
  choice?: Choice;
  tooltip?: Tooltip;
}
export interface Tooltip{
  pronouce: string;
  listen:string;
  noListen:string;
  audio:string;
}

export interface Choice{
  mostBtn: string;
  allBtn: string;
  listBtn: string;
  gridBtn: string;
  chooseBtn: string;
  search:string;
  voice?:string;
}

export interface Modality {
  title: string;
  monoSupport: string;
  multiSupport: string;
  monoSentenceFR: string;
  monoSentenceENG: string;
  multiSentenceFR: string;
  multiSentenceENG: string;
  confirm: string;
}
export interface Rate {
  easyToUse: string;
  understand: string;
  comment: string;
  offerLinked: string;
}

export interface NavbarTab {
  language: string;
  logout: string;
  help: string;
}

export interface Logout {
  title: string;
  question: string;
  cancel: string;
  confirm: string;
}
export interface Onboarding {
  image: string;
  indication: string;
  textFR: string;
  textEN: string;
  browserFR?: string;
  browserEN?: string;
}

export interface OnboardingTitle {
  helpFR: string;
  helpEN: string;
  descriptionFR: string;
  descriptionEN: string;
}
