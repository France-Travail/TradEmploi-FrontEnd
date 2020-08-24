export interface Message {
  time: number;
  text: string;
  languageOrigin: string;
  flag: string;
  translation?: string;
  role?: string;
  audioHtml?: HTMLAudioElement;
  target?: string;
  member?: string;
}
