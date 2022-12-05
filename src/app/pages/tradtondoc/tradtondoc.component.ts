import {NavbarService} from 'src/app/services/navbar.service';
import {Component, HostListener, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {VOCABULARY} from 'src/app/data/vocabulary';
import {ToastService} from 'src/app/services/toast.service';
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
export class TradtondocComponent implements OnDestroy {
  private targetLanguage: string;
  public ocrForm = new FormGroup({
    file: new FormControl([null, [Validators.required]]),
  });

  imageChangedEvent: any;
  fileName: string;
  audioFile: any;
  file: File;
  text: string;
  translatedText: string;
  isPlaying: boolean = false;
  showAudioControls: boolean = false;
  croppedImage: string;
  private isAudioSupported: boolean;

  constructor(
    private readonly dialog: MatDialog,
    private readonly translationService: TranslateService,
    private readonly textToSpeechService: TextToSpeechService,
    private readonly tradTonDocService: TradTonDocService,
    private readonly settingsService: SettingsService,
    private readonly toastService: ToastService,
    private readonly navService: NavbarService
  ) {
    this.navService.handleTabsTradTonDoc();
    this.settingsService.user.subscribe((user) => {
      if (user && user.language) {
        this.targetLanguage = user.language.written;
      }
    });
    const language = VOCABULARY.find((i) => i.isoCode === this.targetLanguage || i.audioCode === this.targetLanguage);
    this.isAudioSupported = language.sentences.audioSupported !== undefined;
  }

  ngOnDestroy() {
    if (this.audioFile) {
      this.audioFile.pause();
      this.audioFile = null;
    }
  }

  async onSubmit() {
    if (this.file && this.fileName) {
      const loaderDialog = this.dialog.open(LoaderComponent, {panelClass: 'loader', disableClose: true});
      const result = await this.tradTonDocService
        .detectText(this.fileName, this.croppedImage ? this.croppedImage : this.file)
        .catch((err) => {
          loaderDialog.close();
          this.toastService.showToast('Une erreur est survenue, veuillez réessayer plus tard', 'toast-error');
          console.log(err);
        })
        .finally(() => loaderDialog.close());
      this.croppedImage = null;
      this.text = result ? result.text : '';
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

  imageCropped($event: ImageCroppedEvent) {
    this.croppedImage = $event.base64;
  }

  onFileDropped($event) {
    const file = $event;
    this.prepareFile(file);
    this.imageChangedEvent = {target: {files: [file]}};
  }

  fileBrowseHandler($event) {
    const files = $event.target.files;
    this.prepareFile(files[0]);
    this.imageChangedEvent = $event;
  }


  prepareFile(file: any) {
    this.file = file;
    this.audioFile = null;
    this.showAudioControls = false;
    this.translatedText = null;
    this.fileName = this.file.name;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.file = e.target.result;
    };
    reader.readAsDataURL(this.file);
  }

}
