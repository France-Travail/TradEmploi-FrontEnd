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
  public displayedColumns: string[] = ['country', 'flag', 'traduction', 'language'];
  public countries: Vocabulary[] = VOCABULARY;
  public dataCountriesSource: MatTableDataSource<Vocabulary> = new MatTableDataSource(this.countries);

  @ViewChild(MatSort, { static: true }) sorting: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<LanguagesComponent>, private voicesService: VoicesService, private settingsService: SettingsService) {}
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
    this.settingsService.user.next({ ...this.settingsService.user.value, language: { audio: audioCode, written: voice.isoCode } });
    this.dialogRef.close('chosen');
  }
}
