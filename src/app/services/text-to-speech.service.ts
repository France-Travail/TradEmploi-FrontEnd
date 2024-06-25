export abstract class TextToSpeechService {
  public audioSpeech: HTMLAudioElement = undefined;
  public isPlaying: boolean = false;
  private sentence: string = undefined;
  private isFemaleSpeech: boolean = false;
  abstract getSpeech(text: string, language: string, isFemaleSpeech: boolean): Promise<void>;

  public play = async (sentence: string, audioCode: string, playAuto: boolean = true, isFemaleSpeech: boolean = false) => {
    if (!this.isPlaying) {
      if (this.sentence !== sentence || this.isFemaleSpeech !== isFemaleSpeech) {
        this.sentence = sentence;
        this.isFemaleSpeech = isFemaleSpeech;
        await this.getSpeech(sentence, audioCode, isFemaleSpeech).then(
          () => {
            if (playAuto) {
              this.audioSpeech.play();
              this.audioSpeech.onplay = () => {
                this.isPlaying = true;
              };
              this.audioSpeech.onended = () => {
                this.isPlaying = false;
              };
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        if (playAuto) {
          this.audioSpeech.play();
        }
      }
    }
    return this.audioSpeech;
  };

  public stop = () => {
    if (this.audioSpeech) {
      this.audioSpeech.pause();
      this.audioSpeech.currentTime = 0;
      this.isPlaying = false;
    }
  };
}
