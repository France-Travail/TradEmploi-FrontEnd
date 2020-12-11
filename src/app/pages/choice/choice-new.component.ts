import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { Vocabulary } from 'src/app/models/vocabulary';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-choice-new',
  templateUrl: './choice-new.component.html',
  styleUrls: ['./choice-new.component.scss'],
})
export class ChoiceNewComponent {

  public columns: string[] = ['country', 'flag', 'traduction', 'language'];
  public countries: Vocabulary[] = [];
  public dataCountriesSource: MatTableDataSource<Vocabulary>;
  public countriesSelected: string[] = ['en-GB', 'ar-XA', 'ps-AF', 'fa-IR', 'bn-BD', 'es-ES', 'de-DE', 'pt-PT', 'it-IT', 'zh-CN', 'ru-RU'];

  @ViewChild(MatSort, { static: true }) sorting: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.displayMost()
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCountriesSource.filter = filterValue.trim().toLowerCase();
  }

  public chooseLanguage(selectedCountry: string) {
    const voice = this.countries.filter((country) => country.isoCode === selectedCountry)[0];
    const audioCode = voice.audioCode ? voice.audioCode : voice.isoCode;
    this.settingsService.user.next({ ...this.settingsService.user.value, language: { audio: audioCode, written: voice.isoCode, languageName: voice.languageNameFr }, connectionTime: Date.now() });
    if (localStorage.getItem('user') != null) {
      const user = JSON.parse(localStorage.getItem('user'));
      user.language = { audio: audioCode, written: voice.isoCode };
      user.connectionTime = Date.now();
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      const user = JSON.parse(sessionStorage.getItem('user'));
      user.language = { audio: audioCode, written: voice.isoCode };
      user.connectionTime = Date.now();
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }
  public isoCodeToFlag(isoCode: string) {
    return isoCode.split('-')[1].toLowerCase();
  }

  public displayMost(){
    this.countries = this.countriesSelected.map((country) => VOCABULARY.find((i) => i.isoCode === country));
    this.dataCountriesSource = new MatTableDataSource(this.countries);
  }

  public displayAll(){
    this.countries = VOCABULARY.filter((country) => country.isoCode !== 'ar-XA')
    this.dataCountriesSource = new MatTableDataSource(this.countries);
    this.sorting.direction = 'asc';
    this.sorting.active = 'countryNameFr';
    this.dataCountriesSource.sort = this.sorting;
    this.dataCountriesSource.paginator = this.paginator;
  }

  public displayList(){
    
  }

  public displayGrid(){
    
  }
}
