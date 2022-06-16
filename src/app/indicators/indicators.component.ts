import { Component, OnInit } from '@angular/core';
import { Language } from '../models/db/language';
import { AngularFirestore } from '@angular/fire/firestore';
import { VOCABULARY_GCP } from '../data/vocabulary-gcp';
import { CSS_COLOR_NAMES } from './colors';
import * as moment from 'moment';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss'],
})
export class IndicatorsComponent implements OnInit {
  constructor(private readonly afs: AngularFirestore) {}

  public languagesByAverage = [];
  public languagesByOccurences = [];
  public languagesByTime = [];
  public languagesAverageByTime = [];
  public languagesOccurencesByTime = [];
  public colorScheme;
  public blueScheme;
  public view = [1200, 500];

  ngOnInit(): void {
    this.setColorScheme();
    const dataThreshold = moment().subtract(1, 'month').toDate();
    const rateObs = this.afs.collection<any>('rates', (rf) => rf.where('date', '>=', dataThreshold).orderBy('date', 'asc')).valueChanges();
    rateObs.subscribe((rates) => {
      const rateMap = this.buildRateMap(rates);
      this.fillLanguagesByTime(rateMap);
      this.refreshLanguagesByTime();
    });

    const langObs = this.afs.collection<Language>('languages').valueChanges();
    langObs.subscribe((languages) => {
      this.fillLanguages(languages);
      this.refreshLanguages();
    });
  }

  private setColorScheme() {
    this.blueScheme = { domain: ['blue'] };
    const domain = [...CSS_COLOR_NAMES].sort((a, b) => b.length - a.length);
    this.colorScheme = { domain };
  }

  /**
   * fill languagesByAverage and languagesByOccurences objects with elements from langauges
   */

  private fillLanguages(languages: Language[]) {
    languages.sort((a, b) => b.occurrences - a.occurrences);
    for (const language of languages) {
      if (language.isoCode.includes('-')) {
        const lang = VOCABULARY_GCP.find((v) => v.isoCode === language.isoCode);
        if (lang) {
          const name = `${lang.languageNameFr} (${lang.countryNameFr}) `;
          this.languagesByAverage.push({
            name,
            value: language.average,
          });
          this.languagesByOccurences.push({
            name,
            value: language.occurrences,
          });
        }
      }
    }
  }

  private refreshLanguages() {
    this.languagesByAverage = [...this.languagesByAverage];
    this.languagesByOccurences = [...this.languagesByOccurences];
  }

  private refreshLanguagesByTime() {
    this.languagesByTime = [...this.languagesByTime];
    this.languagesAverageByTime = [...this.languagesAverageByTime];
    this.languagesOccurencesByTime = [...this.languagesOccurencesByTime];
  }

  /**
   * fill languagesAverageByTime, languagesOccurencesByTime, languagesByTime objects with elements from rateMap
   */
  private fillLanguagesByTime(rateMap: Map<string, Language[]>) {
    rateMap.forEach((value, key) => {
      const series = [];
      let average = 0;
      let total = 0;
      for (const l of value) {
        const lang = VOCABULARY_GCP.find((v) => v.isoCode === l.isoCode);
        if (lang) {
          series.push({ name: `${lang.languageNameFr} (${lang.countryNameFr}) `, value: l.occurrences });
          average = average + l.average;
          total += l.occurrences;
        }
      }
      average = average / value.length;
      this.languagesAverageByTime.push({ name: key, value: average });
      this.languagesOccurencesByTime.push({ name: key, value: total });
      this.languagesByTime.push({ name: key, series });
    });
  }

  private buildRateMap(rates: any[]): Map<string, Language[]> {
    const rateMap = new Map<string, Language[]>();
    for (const rate of rates) {
      if (this.hasValidIsoCode(rate)) {
        const date: Date = rate.date.toDate();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        if (rateMap.has(formattedDate)) {
          this.updateRateMap(rateMap, formattedDate, rate);
        } else {
          const newLangauge: Language = { isoCode: rate.language, occurrences: 1, average: rate.grades[0] };
          rateMap.set(formattedDate, [newLangauge]);
        }
      }
    }
    return rateMap;
  }

  private updateRateMap(rateMap: Map<string, Language[]>, formattedDate: string, rate) {
    const languagesByDate = rateMap.get(formattedDate);
    let found = false;
    for (const l of languagesByDate) {
      if (l.isoCode === rate.language) {
        l.occurrences++;
        l.average = (l.average + rate.grades[0]) / 2;
        found = true;
      }
    }
    if (!found) {
      const newLangauge: Language = { isoCode: rate.language, occurrences: 1, average: rate.grades[0] };
      languagesByDate.push(newLangauge);
    }
  }

  private hasValidIsoCode(rate) {
    return rate.language && rate.language.includes('-') && !rate.language.includes(',');
  }
}
