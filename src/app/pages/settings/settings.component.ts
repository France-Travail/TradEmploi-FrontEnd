import { Component } from '@angular/core';
import { Parser } from 'json2csv';
import { NavbarService } from 'src/app/services/navbar.service';
import { SettingsService } from 'src/app/services/settings.service';
import { RateService } from 'src/app/services/rate.service';
import { KpiService } from 'src/app/services/kpi.service';
import { ERROR_FUNC_EXPORT_KPI, ERROR_FUNC_EXPORT_STATS } from 'src/app/models/error/errorFunctionnal';
import { ToastService } from 'src/app/services/toast.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(
    private navService: NavbarService,
    private settingsService: SettingsService,
    private rateService: RateService,
    private kpiService: KpiService,
    private toastService: ToastService,
    public dialog: MatDialog
  ) {
    this.navService.handleTabsSettings();
  }

  public exportKpi() {
    this.dialog.open(LoaderComponent);
    this.kpiService
      .getkpi()
      .then((kpi) => {
        this.exportCsv(kpi, 'kpi');
        this.dialog.closeAll();
      })
      .catch((_) => this.toastService.showToast(ERROR_FUNC_EXPORT_KPI.description, 'toast-error'));
  }
  public exportEval() {
    this.dialog.open(LoaderComponent);
    this.rateService
      .getRates()
      .then((rates) => {
        this.exportCsv(rates, 'eval');
        this.dialog.closeAll();
      })
      .catch((_) => this.toastService.showToast(ERROR_FUNC_EXPORT_STATS.description, 'toast-error'));
  }

  private exportCsv(data, name: string) {
    const json2csvParser = new Parser({ delimiter: ';', encoding: 'utf8' });
    const csv = json2csvParser.parse(data);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    const date = new Date().toLocaleDateString('ko-KR').replace(/. /g, '');
    const filename = name === 'eval' ? 'PE_Outil_Traduction_Evaluation_' + date + '.csv' : 'PE_Outil_Traduction_KPIs_' + date + '.csv';
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
