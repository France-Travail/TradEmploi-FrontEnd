import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoaderComponent } from './loader/loader.component';
import { Router } from '@angular/router';
import { exportCsv } from '../../utils/utils';
import { NavbarService } from '../../services/navbar.service';
import { SettingsService } from '../../services/settings.service';
import { RateService } from '../../services/rate.service';
import { KpiService } from '../../services/kpi.service';
import { ToastService } from '../../services/toast.service';
import { Role } from '../../models/role';
import { ERROR_FUNC_EXPORT_KPI, ERROR_FUNC_EXPORT_STATS } from '../../models/error/errorFunctionnal';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(
    private readonly navService: NavbarService,
    private readonly settingsService: SettingsService,
    private readonly rateService: RateService,
    private readonly kpiService: KpiService,
    private readonly toastService: ToastService,
    private readonly dialog: MatDialog,
    private readonly router: Router
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
    if (firstCall) {
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
          this.toastService.showToast(ERROR_FUNC_EXPORT_KPI.description, 'toast-error');
          this.dialog.closeAll();
        }
      });
  }

  public exportEval(firstCall: boolean) {
    if (firstCall) {
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
          this.toastService.showToast(ERROR_FUNC_EXPORT_STATS.description, 'toast-error');
          this.dialog.closeAll();
        }
      });
  }

  public goBack() {
    this.settingsService.user.next({ ...this.settingsService.user.value, connectionTime: Date.now() });
    window.history.back();
  }
}
