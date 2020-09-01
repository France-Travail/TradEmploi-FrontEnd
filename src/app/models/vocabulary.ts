import { Gdpr } from './gdpr';

export interface Vocabulary {
  isoCode: string;
  countryNameRaw?: any;
  countryNameFr?: string;
  languageNameRaw?: string;
  languageNameFr?: string;
  flag?: string;
  sentences: Sentence;
  navbarTabs?: NavbarTab
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
}
