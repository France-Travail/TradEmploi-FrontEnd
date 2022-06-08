export abstract class TextToSpeechService {
  public audioSpeech: HTMLAudioElement = undefined;

  abstract getSpeech(text: string, language: string): Promise<void>;
}
