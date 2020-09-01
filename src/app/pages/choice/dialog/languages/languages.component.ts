import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { VoicesService } from 'src/app/services/voices.service';
import { TranslateService } from 'src/app/services/translate.service';
import { COUNTRIES } from 'src/app/data/countries';
import { Language } from 'src/app/models/language';
import { SettingsService } from 'src/app/services/settings.service';

export interface Countries {
  country: string;
  traduction: string;
  flag: string;
  LanguageFr: string;
  code: Language;
  language: string;
}
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  public displayedColumns: string[] = ['country', 'flag', 'traduction', 'language'];
  public countries: Countries[] = COUNTRIES;
  public dataCountriesSource: MatTableDataSource<Countries> = new MatTableDataSource(this.countries);

  @ViewChild(MatSort, { static: true }) sorting: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<LanguagesComponent>, private translateService: TranslateService, private voicesService: VoicesService, private settingsService: SettingsService) {}
  ngOnInit() {
    this.sorting.direction = 'asc';
    this.sorting.active = 'traduction';
    this.dataCountriesSource.sort = this.sorting;
    this.dataCountriesSource.paginator = this.paginator;
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCountriesSource.filter = filterValue.trim().toLowerCase();
  }
  public close(): void {
    this.dialogRef.close('closed');
  }

  public chooseLanguage(SelectedCountry: string) {
    const voice = this.countries.filter((country) => country.country === SelectedCountry)[0];
    this.voicesService.guest = voice.code;
    this.settingsService.user.next({ ...this.settingsService.user.value, language: { audio: voice.code.audio, written: voice.code.written }, connectionTime: Date.now() });
    this.dialogRef.close('chosen');
  }
}
