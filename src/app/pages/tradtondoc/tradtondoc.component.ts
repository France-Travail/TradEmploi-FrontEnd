import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {RateDialogComponent} from '../translation/dialogs/rate-dialog/rate-dialog.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TextToSpeechService} from '../../services/text-to-speech.service';
import {TradTonDocService} from '../../services/trad-ton-doc.service';
import {TranslateService} from '../../services/translate.service';

@Component({
  selector: 'app-tradtondoc',
  templateUrl: './tradtondoc.component.html',
  styleUrls: ['./tradtondoc.component.scss'],
})
export class TradtondocComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              private readonly translationService: TranslateService,
              private readonly textToSpeechService: TextToSpeechService,
              private readonly tradTonDocService: TradTonDocService) {
  }

  ocrForm = new FormGroup({
    file: new FormControl([null, [Validators.required]])
  });

  sourceLanguageCode = 'fr-FR';
  targetLanguageCode = 'en-GB';

  languages = [
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
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = async () => {
        const result = await this.tradTonDocService.detectText(fileName, reader.result);
        this.text = result.text;
        this.loading = false;
        if (this.text && this.text.length > 0 && this.targetLanguageCode) {
          this.translatedText = await this.translationService.translate(this.text, this.targetLanguageCode, this.sourceLanguageCode);
          this.textToSpeechService.getSpeech(this.translatedText, this.targetLanguageCode);
        }
      };

    }
  }

  onChange(event: any) {
    this.file = event.target.files[0];
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
