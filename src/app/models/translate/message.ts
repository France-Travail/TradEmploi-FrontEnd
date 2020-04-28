export interface Message {
  message: string;
  translation?: string;
  user?: string;
  language?: string;
  translatedSpeech?: HTMLAudioElement;
  flag?: string;
  id?: string;
}
