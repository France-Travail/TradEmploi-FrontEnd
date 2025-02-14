import { PdfConvertService } from '../../services/pdf-convert.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { ToastService } from 'src/app/services/toast.service';
import { TextToSpeechService } from '../../services/text-to-speech.service';
import { TradTonDocService } from '../../services/trad-ton-doc.service';
import { TranslateService } from '../../services/translate.service';
import { LoaderComponent } from '../loader/loader.component';
import { RateDialogComponent } from '../translation/dialogs/rate-dialog/rate-dialog.component';
import { SettingsService } from '../../services/settings.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-tradtondoc',
  templateUrl: './tradtondoc.component.html',
  styleUrls: ['./tradtondoc.component.scss']
})
export class TradtondocComponent implements OnDestroy {
  private targetLanguage: string;
  public ocrForm = new FormGroup({
    file: new FormControl([null, [Validators.required]])
  });

  imageChangedEvent: any;
  fileName: string;
  file: File;
  text: string;
  isConform: boolean;
  translatedText: string;
  audioFile: HTMLAudioElement;
  isPlaying: boolean = false;
  showAudioControls: boolean = false;
  croppedImage: string;
  isPdf: boolean = false;
  private isAudioSupported: boolean;
  targetCountry: string;
  nbTranslatedCharacters: number = 0;
  imageBase64String: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly translationService: TranslateService,
    private readonly textToSpeechService: TextToSpeechService,
    private readonly tradTonDocService: TradTonDocService,
    private readonly settingsService: SettingsService,
    private readonly toastService: ToastService,
    private readonly navService: NavbarService,
    private readonly pdfConvertService: PdfConvertService,
    private readonly globalService: GlobalService
  ) {
    this.navService.handleTabsSettings();
    this.settingsService.user.subscribe((user) => {
      if (user && user.language) {
        this.targetLanguage = user.language.written;
        this.targetCountry = user.language.written.split('-')[1].toLowerCase();
      }
    });
    const language = VOCABULARY.find((i) => i.isoCode === this.targetLanguage || i.audioCode === this.targetLanguage);
    this.isAudioSupported = language.sentences.audioSupported !== undefined;
  }

  ngOnDestroy() {
    if (this.textToSpeechService.audioSpeech) {
      this.textToSpeechService.stop();
    }
  }

  async onSubmit() {
    if (this.file && this.fileName) {
      const loaderDialog = this.dialog.open(LoaderComponent, { panelClass: 'loader', disableClose: true });
      const result = await this.tradTonDocService
        .detectText(this.fileName.replace('.pdf', '.png'), this.croppedImage ? this.croppedImage : this.imageBase64String)
        .catch((err) => {
          loaderDialog.close();
          this.toastService.showToast('Une erreur est survenue, veuillez réessayer plus tard', 'toast-error');
          console.log(err);
        })
        .finally(() => loaderDialog.close());
      this.text = result ? result.text : '';
      this.nbTranslatedCharacters += result ? result.numberCharactersInText : 0;
      this.isConform = this.checkNumberTranslatedCharacters(this.nbTranslatedCharacters);
      if (this.text.length > 0) {
        this.translatedText = await this.translationService.translate(this.text, this.targetLanguage, this.globalService.currentUserDomain, true);
        if (this.isAudioSupported) {
          await this.textToSpeechService
            .play(this.translatedText, this.targetLanguage, false)
            .then((_) => {
              this.audioFile = this.textToSpeechService.audioSpeech;
              this.showAudioControls = true;
            })
            .catch((err) => {
              this.toastService.showToast('L\'audio n\'a pas pu être generé.', 'toast-error');
              console.log(err);
            });
        }
        loaderDialog.close();
      }
    }
  }

  resume() {
    this.isPlaying = !this.isPlaying;
    this.audioFile.play();
    this.audioFile.onended = () => {
      this.isPlaying = false;
    };
  }

  pause() {
    this.isPlaying = !this.isPlaying;
    this.audioFile.pause();
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
        nbTranslatedCharacters: this.nbTranslatedCharacters
      }
    });
  }

  imageCropped($event: ImageCroppedEvent) {
    this.blobToBase64($event.blob).then(base64 => {
      this.croppedImage = base64 as string;
    });
  }

  async onFileDropped($event) {
    const file = $event;
    this.isConform = false;
    this.isPdf = false;
    this.prepareFile(file);
    this.applyControls(file);
    this.imageChangedEvent = { target: { files: [file] } };
    this.imageBase64String = '';
  }

  fileBrowseHandler($event) {
    const files = $event.target.files[0];
    this.isConform = false;
    this.isPdf = false;
    this.prepareFile(files);
    this.applyControls(files);
    this.imageChangedEvent = $event;
    this.imageBase64String = '';
  }

  prepareFile(file: any) {
    this.file = file;
    this.showAudioControls = false;
    this.translatedText = null;
    this.fileName = this.file.name;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.file = e.target.result;
    };
    reader.readAsDataURL(this.file);
  }

  applyControls(file) {
    if (file.type === 'application/pdf') {
      this.convertPdf();
      this.isConform = this.checkFileSize(file.size) && this.checkTypeFile(file.type);
      this.assertOnePage();
    } else {
      this.isConform = this.checkFileSize(file.size) && this.checkTypeFile(file.type);
    }
  }

  public convertPdf() {
    this.isPdf = true;
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onloadend = async () => {
      const loaderDialog = this.dialog.open(LoaderComponent, { panelClass: 'loader', disableClose: true });
      await this.pdfConvertService
        .convert(reader.result.toString(), this.fileName)
        .then((res) => {

          this.imageBase64String = res.data;

          // Convertir la chaîne Base64 en Blob
          const blob = this.base64ToBlob(res.data, 'data:image/png;base64');

          // Créer un fichier à partir du Blob
          // Attribuer le nouveau fichier
          this.file = new File([blob], 'converted-image.png', { type: 'image/png' });


        })
        .catch((err) => {
          this.isConform = false;
          loaderDialog.close();
          this.toastService.showToast('Une erreur est survenue, veuillez réessayer plus tard', 'toast-error');
          console.log('error', err.message);
        })
        .finally(() => loaderDialog.close());
    };
  }

  checkFileSize(size) {
    if (size > 10485760) {
      // 10Mo
      this.toastService.showToast('Fichier non conforme. Le fichier est trop lourd !', 'toast-warning');
      return false;
    }
    return true;
  }

  checkTypeFile(type) {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(type)) {
      this.toastService.showToast('Fichier non conforme. Ce type de fichier n\'est pas pris en charge', 'toast-warning');
      return false;
    }
    return true;
  }

  assertOnePage() {
    const reader = new FileReader();
    reader.readAsBinaryString(this.file);
    reader.onloadend = () => {
      const numberPagesDoc = (reader.result as string).match(/\/Type[\s]*\/Page[^s]/g).length;
      if (numberPagesDoc > 1) {
        this.toastService.showToast('Fichier non conforme. Le PDF fourni contient plus d\'une page ', 'toast-warning');
        this.isConform = false;
      } else {
        this.isConform = true;
      }
    };
  }

  checkNumberTranslatedCharacters(numberTranslatedCharacters) {
    if (numberTranslatedCharacters > 10000) {
      this.toastService.showToast('Fichier non conforme. Le fichier contient trop de caractères !', 'toast-warning');
      return false;
    }
    return true;
  }

  private base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
