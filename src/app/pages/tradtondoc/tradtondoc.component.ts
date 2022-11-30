import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { ToastService } from 'src/app/services/toast.service';
import { TextToSpeechService } from '../../services/text-to-speech.service';
import { TradTonDocService } from '../../services/trad-ton-doc.service';
import { TranslateService } from '../../services/translate.service';
import { LoaderComponent } from '../settings/loader/loader.component';
import { RateDialogComponent } from '../translation/dialogs/rate-dialog/rate-dialog.component';
import { SettingsService } from './../../services/settings.service';

@Component({
  selector: 'app-tradtondoc',
  templateUrl: './tradtondoc.component.html',
  styleUrls: ['./tradtondoc.component.scss'],
})
export class TradtondocComponent {
  private targetLanguage: string;
  public ocrForm = new FormGroup({
    file: new FormControl([null, [Validators.required]]),
  });

  imageChangedEvent: boolean;
  fileName: string;
  audioFile: any;
  file: File;
  text: string;
  translatedText: string;
  isPlaying: boolean = false;
  showAudioControls: boolean = false;
  private isAudioSupported: boolean;
  constructor(
    private readonly dialog: MatDialog,
    private readonly translationService: TranslateService,
    private readonly textToSpeechService: TextToSpeechService,
    private readonly tradTonDocService: TradTonDocService,
    private readonly settingsService: SettingsService,
    private readonly toastService: ToastService
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user && user.language) {
        this.targetLanguage = user.language.written;
      }
    });
    const language = VOCABULARY.find((i) => i.isoCode === this.targetLanguage || i.audioCode === this.targetLanguage);
    this.isAudioSupported = language.sentences.audioSupported !== undefined;
  }

  onChange(event: any) {
    this.audioFile = null;
    this.showAudioControls = false;
    this.translatedText = null;
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.file = e.target.result;
    };
    reader.readAsDataURL(this.file);
    this.imageChangedEvent = event;
  }

  async onSubmit() {
    if (this.file && this.fileName) {
      const loaderDialog = this.dialog.open(LoaderComponent, { panelClass: 'loader', disableClose: true });
      const result = await this.tradTonDocService
        .detectText(this.fileName, this.file)
        .catch((err) => {
          loaderDialog.close();
          this.toastService.showToast('Une erreur est survenue, veuillez réessayer plus tard', 'toast-error');
          console.log(err);
        })
        .finally(() => loaderDialog.close());
      this.text = result.text;
      if (this.text.length > 0) {
        this.translatedText = await this.translationService.translate(this.text, this.targetLanguage);
        if (this.isAudioSupported) {
          await this.textToSpeechService
            .getSpeech(this.translatedText, this.targetLanguage)
            .then((_) => {
              this.showAudioControls = true;
              this.audioFile = this.textToSpeechService.audioSpeech;
            })
            .catch((err) => {
              this.audioFile = null;
              this.toastService.showToast("L'audio n'a pas pu être generé.", 'toast-error');
              console.log(err);
            });
        }
        loaderDialog.close();
      }
    }
  }

  play() {
    this.audioFile.play();
    this.audioFile.onended = () => {
      this.isPlaying = false;
    };
    this.isPlaying = true;
  }

  pause() {
    this.audioFile.pause();
    this.isPlaying = false;
  }

  @HostListener('window:unload')
  public canDeactivate(): any {
    localStorage.setItem('isLogged', 'false');
    this.settingsService.reset();
  }

  public evaluate() {
    return this.dialog.open(RateDialogComponent, {
      width: '750px',
      height: '750px',
      panelClass: 'customDialog',
      disableClose: false,
      data: {
        tradtondoc: true,
      },
    });
  }
}
