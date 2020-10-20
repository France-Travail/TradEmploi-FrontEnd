export interface Message {
  time: number;
  date: string;
  hour:string;
  text: string;
  languageOrigin: string;
  flag: string;
  translation?: string;
  role?: string;
  audioHtml?: HTMLAudioElement;
  target?: string;
  member?: string;
  translationMode?: string;
}