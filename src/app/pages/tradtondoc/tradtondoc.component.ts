import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {RateDialogComponent} from '../translation/dialogs/rate-dialog/rate-dialog.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tradtondoc',
  templateUrl: './tradtondoc.component.html',
  styleUrls: ['./tradtondoc.component.scss'],
})
export class TradtondocComponent implements OnInit {

  constructor(private readonly dialog: MatDialog) {
  }
  private textToSpeechService: any;
  private translationService: any;
  private visionService: any;

  ocrForm = new FormGroup({
    targetLanguageCode: new FormControl(''),
    file: new FormControl([null, [Validators.required]])
  });

  sourceLanguageCode = 'fr-FR';

  languages = [
    {id: 'fr-FR', name: 'Français'},
    {id: 'en-GB', name: 'Anglais'},
    {id: 'ru-RU', name: 'Russe'},
    {id: 'ar-SA', name: 'Arabe'},
    {id: 'bg-BG', name: 'Bulgare'},
    {id: 'de-DE', name: 'Allemagne'},
  ];

  loading: boolean = false;
  file: File | undefined;
  text = '';
  translatedText = '';

  ngOnInit(): void {
  }
  async onSubmit() {
    console.log(this.ocrForm);
    if (this.file && this.file.name) {
      this.loading = !this.loading;
      const fileName = this.file.name;
      const result = await this.visionService.detectText(fileName, this.croppedImage);
      this.text = result.text;
      this.loading = false;
      if (this.text && this.text.length > 0 && this.ocrForm.value.targetLanguageCode && this.ocrForm.value.targetLanguageCode.length > 0) {
        this.translatedText = await this.translationService.translate(this.text, this.ocrForm.value.targetLanguageCode, this.sourceLanguageCode);
        this.textToSpeechService.getSpeech(this.translatedText, this.ocrForm.value.targetLanguageCode);
      }
    }
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.imageChangedEvent = event;
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
}
