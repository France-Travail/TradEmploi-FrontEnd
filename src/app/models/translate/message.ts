export interface Message {
  message: string;
  translation?: string;
  user?: string;
  languageOrigin?: string;
  translatedSpeech?: HTMLAudioElement;
  flag?: string;
  id?: string;
  target: string; 
}
