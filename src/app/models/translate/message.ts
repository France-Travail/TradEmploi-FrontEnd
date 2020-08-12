export interface Message {
  lasttime: string;
  text: string;
  languageOrigin: string;
  flag: string;
  translation?: string;
  role?: string;
  audioHtml?: HTMLAudioElement;
  target?: string;
  member?: string;
  notification?:string;
}