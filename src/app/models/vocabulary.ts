export interface Vocabulary {
  isoCode: string;
  countryNameRaw?: any;
  countryNameFr?: string;
  languageNameRaw?: string;
  languageNameFr?: string;
  flag?: string;
  sentences: Sentence;
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
}

export interface Rate {
  easyToUse: string;
  understand: string;
  comment: string;
}
