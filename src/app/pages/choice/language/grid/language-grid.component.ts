import { Component, Input, OnChanges } from '@angular/core';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { Vocabulary } from 'src/app/models/vocabulary';

@Component({
    selector: 'app-language-grid',
    templateUrl: './language-grid.component.html',
    styleUrls: ['./language-grid.component.scss'],
})
export class LanguageGridComponent implements OnChanges{
    
    @Input() search: String;
    @Input() displayAll: Boolean = false;

    public countries: Vocabulary[] = [];
    public countriesSelected: string[] = ['en-GB', 'ar-XA', 'ps-AF', 'fa-IR', 'bn-BD', 'es-ES', 'de-DE', 'pt-PT', 'it-IT', 'zh-CN', 'ru-RU'];
    
    ngOnChanges() {
        this.displayAll ? this.getCountriesALl() : this.getCountriesSelected()
    }

    public getCountriesSelected(){
        this.countries = this.countriesSelected.map((country) => VOCABULARY.find((i) => i.isoCode === country));
    }
    
    public getCountriesALl(){
        const data = VOCABULARY.filter((country) => country.isoCode !== 'ar-XA')
        this.countries = data.sort((a,b) => this.sortCountryNameFr(a.languageNameFr,b.languageNameFr));   
    }

    public isoCodeToFlag(isoCode: string) {
        return  isoCode.split('-')[1].toLowerCase()
    }

    private sortCountryNameFr (a: String, b: String) {  
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;  
    } 
}