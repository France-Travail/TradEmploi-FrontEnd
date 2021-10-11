import { Component, OnInit } from '@angular/core';
import { Parser } from 'json2csv';
import { NavbarService } from 'src/app/services/navbar.service';
import { SettingsService } from 'src/app/services/settings.service';
import { RateService } from 'src/app/services/rate.service';
import { KpiService } from 'src/app/services/kpi.service';
import { ERROR_FUNC_EXPORT_KPI, ERROR_FUNC_EXPORT_STATS } from 'src/app/models/error/errorFunctionnal';
import { ToastService } from 'src/app/services/toast.service';
import { MatDialog } from '@angular/material';
import { LoaderComponent } from './loader/loader.component';
import { Role } from 'src/app/models/role';
import { Router } from '@angular/router';
import {exportCsv} from '../../utils/utils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private navService: NavbarService,
    private settingsService: SettingsService,
    private rateService: RateService,
    private kpiService: KpiService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.navService.handleTabsSettings();
  }

  public isGuest: boolean;
  ngOnInit(): void {
    this.settingsService.user.subscribe((user) => {
      this.isGuest = (user.role === Role.GUEST);
      if (this.isGuest) {
        this.router.navigateByUrl('/start');
      }
    });
  }
  public exportKpi(firstCall: boolean) {
    if (firstCall){
      this.dialog.open(LoaderComponent, { panelClass: 'loader' });
    }
    this.kpiService
      .getkpi(true)
      .then((kpi) => {
        exportCsv(kpi, 'PE_Outil_Traduction_KPIs_');
        this.dialog.closeAll();
      })
      .catch(async (_) => {
        if (firstCall) {
          await new Promise((f) => setTimeout(f, 10000));
          this.exportKpi(false);
        } else {
          this.toastService.showToast(ERROR_FUNC_EXPORT_KPI.description, 'toast-error'), this.dialog.closeAll();
        }
      });
  }

  public exportEval(firstCall: boolean) {
    if (firstCall){
      this.dialog.open(LoaderComponent, { panelClass: 'loader' });
    }
    this.rateService
      .getRates(true)
      .then((rates) => {
        exportCsv(rates, 'PE_Outil_Traduction_Evaluation_');
        this.dialog.closeAll();
      })
      .catch(async (_) => {
        if (firstCall) {
          await new Promise((f) => setTimeout(f, 10000));
          this.exportEval(false);
        } else {
          this.toastService.showToast(ERROR_FUNC_EXPORT_STATS.description, 'toast-error'), this.dialog.closeAll();
        }
      });
  }

  public goBack() {
    this.settingsService.user.next({ ...this.settingsService.user.value, connectionTime: Date.now() });
    window.history.back();
  }
}
