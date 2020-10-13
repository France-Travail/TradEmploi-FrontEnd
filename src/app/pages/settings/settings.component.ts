import { Component } from '@angular/core';
import { Parser } from 'json2csv';
import { ToastService } from 'src/app/services/toast.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { SettingsService } from 'src/app/services/settings.service';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(
    private navService: NavbarService, 
    private settingsService: SettingsService,
    private rateService: RateService) {
    this.navService.handleTabsSettings();
  }

  public async exportKpi(){
    const rates = await this.rateService.getRates()
    this.exportCsv(rates,"kpi")
  }
  public async exportEval() {
    const rates = await this.rateService.getRates()
    this.exportCsv(rates,"eval")
  }

  private exportCsv(rates, name: string) {
    const json2csvParser = new Parser({ delimiter: ';', encoding: 'utf8' });
    const data = json2csvParser.parse(rates);
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    const date = new Date().toLocaleDateString('ko-KR').replace(/. /g, '');
    const filename = name === "eval" ? 'PE_Outil_Traduction_Evaluation_' + date + '.csv' : 'PE_Outil_Traduction_KPIs_' + date + '.csv';
    a.setAttribute('download', filename);
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
  }

  public goBack() {
    this.settingsService.user.next({ ...this.settingsService.user.value, connectionTime: Date.now() });
    window.history.back();
  }
}
