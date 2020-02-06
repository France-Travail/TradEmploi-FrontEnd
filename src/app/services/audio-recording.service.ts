import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {
  public blob: Blob;
  public conversation: Blob;
  private chunks: any[] = [];
  private conversations: any[] = [];
  private constraints = { audio: true };
  private mediaRecorder: MediaRecorder;

  public audioSpeech: HTMLAudioElement;

  constructor() {}

  public record(state: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (state === 'start') {
        // Get the audio stream
        navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
          // Create new MediaRecorder
          this.mediaRecorder = new MediaRecorder(stream);

          // Start recording
          this.mediaRecorder.start();

          resolve('started');
        });
      } else {
        this.mediaRecorder.stop();

        this.mediaRecorder.ondataavailable = async e => {
          // Push data into the chunks Array
          this.chunks.push(e.data);

          // Add the data into the conversation
          this.conversations.push(e.data);

          // Create a Blob to be able to listen inside an HTMLAudioElement
          this.blob = new Blob(this.chunks, { type: 'audio/mp3; codecs=opus' });

          // Convert the Blob into a String because Audio only get String
          const blobAsString = await this.convertBlobToBase64(this.blob);

          // Create the HTMLAudioElement
          this.audioSpeech = new Audio(blobAsString);

          // Reset the chunks for the next audio recording
          this.chunks = [];

          resolve('ended');
        };
      }
    });
  }

  public setConversation(): void {
    this.conversation = new Blob(this.conversations, { type: 'audio/mp3; codecs=opus' });
  }

  /**
   * Encode blob into Base64
   */
  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    });
  }
}
