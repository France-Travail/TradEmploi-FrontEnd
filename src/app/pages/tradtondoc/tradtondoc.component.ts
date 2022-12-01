import {Component, HostListener} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {TextToSpeechService} from '../../services/text-to-speech.service';
import {TradTonDocService} from '../../services/trad-ton-doc.service';
import {TranslateService} from '../../services/translate.service';
import {LoaderComponent} from '../settings/loader/loader.component';
import {RateDialogComponent} from '../translation/dialogs/rate-dialog/rate-dialog.component';
import {SettingsService} from './../../services/settings.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';

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
  croppedImage: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly translationService: TranslateService,
    private readonly textToSpeechService: TextToSpeechService,
    private readonly tradTonDocService: TradTonDocService,
    private readonly settingsService: SettingsService
  ) {
    this.settingsService.user.subscribe((user) => {
      if (user && user.language) {
        this.targetLanguage = user.language.written;
      }
    });
  }

  onChange(event: any) {
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
      const loaderDialog = this.dialog.open(LoaderComponent, {panelClass: 'loader', disableClose: true});
      const result = await this.tradTonDocService.detectText(this.fileName, this.croppedImage ? this.croppedImage : this.file).finally(() => loaderDialog.close());
      this.text = result.text;
      if (this.text.length > 0) {
        this.translatedText = await this.translationService.translate(this.text, this.targetLanguage);
        await this.textToSpeechService
          .getSpeech(this.translatedText, this.targetLanguage)
          .then((_) => {
            this.audioFile = this.textToSpeechService.audioSpeech;
          })
          .catch((err) => {
            console.log(err);
          });
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

  imageCropped($event: ImageCroppedEvent) {
    this.croppedImage = $event.base64;
  }

}
