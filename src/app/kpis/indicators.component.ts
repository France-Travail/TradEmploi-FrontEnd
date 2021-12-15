import { Component, OnInit } from '@angular/core';
import { Language } from '../models/db/language';
import { AngularFirestore } from '@angular/fire/firestore';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  public languagesByAverage = [];
  public languagesByOccurences = [];
  public languagesByTime = [];
  public view = [1200, 600];

  constructor(private afs: AngularFirestore, private settingsService: SettingsService) {
  }

  ngOnInit(): void {

    if (this.settingsService.isMobile) {
      this.view = [500, 200];
    }
    if (this.settingsService.isTablet) {
      this.view = [700, 300];
    }
    const rateObs = this.afs.collection<any>('rates', (rf) => rf.orderBy('date', 'asc')).valueChanges();

    rateObs.subscribe((rates) => {
      const rateMap = this.buildRateMap(rates);
      this.setLanguagesByTime(rateMap);
      this.languagesByTime = [...this.languagesByTime];
    });
    const langObs = this.afs.collection<Language>('languages').valueChanges();
    langObs.subscribe((langauges) => {
      for (const language of langauges) {
        if (language.isoCode.includes('-')) {
          this.languagesByAverage.push({ name: language.isoCode, value: language.average });
          this.languagesByOccurences.push({ name: language.isoCode, value: language.occurrences });
        }
      }
      this.languagesByAverage = [...this.languagesByAverage];
      this.languagesByOccurences = [...this.languagesByOccurences];
    });
  }

  private setLanguagesByTime(rateMap: Map<string, Language[]>) {
    rateMap.forEach((value, key) => {
      const series = [];
      for (const l of value) {
        series.push({ name: l.isoCode, value: l.occurrences });
      }
      this.languagesByTime.push({ name: key, series });
    });
  }

  private buildRateMap(rates: any[]): Map<string, Language[]> {
    const rateMap = new Map<string, Language[]>();
    for (const rate of rates) {
      if (this.hasValidIsoCode(rate)) {
        const date: Date = rate.date.toDate();
        const formattedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

        if (rateMap.has(formattedDate)) {
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
        } else {
          const newLangauge: Language = { isoCode: rate.language, occurrences: 1, average: rate.grades[0] };
          rateMap.set(formattedDate, [newLangauge]);
        }
      }
    }
    return rateMap;
  }

  private hasValidIsoCode(rate) {
    return rate.language && rate.language.includes('-') && !rate.language.includes(',');
  }
}
