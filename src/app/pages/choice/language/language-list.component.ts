import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { Vocabulary } from 'src/app/models/vocabulary';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
    selector: 'app-language-list',
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.scss'],
})
export class LanguageListComponent implements OnChanges{
    
    @Input() search: String;
    @Input() displayAll: Boolean = false;

    public columns: string[] = ['country', 'flag', 'traduction', 'language'];
    public countries: Vocabulary[] = [];
    public dataCountriesSource: MatTableDataSource<Vocabulary>;
    public countriesSelected: string[] = ['en-GB', 'ar-XA', 'ps-AF', 'fa-IR', 'bn-BD', 'es-ES', 'de-DE', 'pt-PT', 'it-IT', 'zh-CN', 'ru-RU'];

    @ViewChild(MatSort, { static: true }) sorting: MatSort;
    
    constructor(private settingsService: SettingsService) {}
    
    ngOnChanges() {
        this.displayAll ? this.getCountriesALl() : this.getCountriesSelected()
        this.dataCountriesSource.filter = this.search.trim().toLowerCase();
    }

    public getCountriesSelected(){
        this.countries = this.countriesSelected.map((country) => VOCABULARY.find((i) => i.isoCode === country));
        this.dataCountriesSource = new MatTableDataSource(this.countries);
    }
    
    public getCountriesALl(){
        this.countries = VOCABULARY.filter((country) => country.isoCode !== 'ar-XA')
        this.dataCountriesSource = new MatTableDataSource(this.countries);
        this.sorting.direction = 'asc';
        this.sorting.active = 'countryNameFr';
        this.dataCountriesSource.sort = this.sorting;
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
}