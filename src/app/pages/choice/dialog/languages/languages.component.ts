import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { VoicesService } from 'src/app/services/voices.service';
import { SettingsService } from 'src/app/services/settings.service';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { Vocabulary } from 'src/app/models/vocabulary';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  public displayedColumns: string[];
  public countries: Vocabulary[] = VOCABULARY;
  public dataCountriesSource: MatTableDataSource<Vocabulary>;

  @ViewChild(MatSort, { static: true }) sorting: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<LanguagesComponent>, private voicesService: VoicesService, private settingsService: SettingsService) {
    this.displayedColumns = ['country', 'flag', 'traduction', 'language'];
    this.countries = this.countries.filter((country) => country.isoCode !== 'ar-XA');
    this.dataCountriesSource = new MatTableDataSource(this.countries);
  }
  ngOnInit() {
    this.sorting.direction = 'asc';
    this.sorting.active = 'countryNameFr';
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

  public chooseLanguage(selectedCountry: string) {
    const voice = this.countries.filter((country) => country.isoCode === selectedCountry)[0];
    const audioCode = voice.audioCode ? voice.audioCode : voice.isoCode;
    this.voicesService.guest = { audio: audioCode, written: voice.isoCode };
    this.settingsService.user.next({ ...this.settingsService.user.value, language: { audio: audioCode, written: voice.isoCode }, connectionTime: Date.now() });
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
    this.dialogRef.close('chosen');
  }
  public isoCodeToFlag(isoCode: string) {
    return isoCode.split('-')[1].toLowerCase();
  }
}
