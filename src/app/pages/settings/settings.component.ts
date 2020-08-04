import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { environment } from '../../../environments/environment';
import { Parser } from 'json2csv';
import { ToastService } from 'src/app/services/toast.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public path: string;

  constructor(
    public router: Router,
    private fireFunction: AngularFireFunctions,
    private toastService: ToastService,
    private navService: NavbarService) {
    const url = this.router.url;
    this.path = url.substring(url.lastIndexOf('/'));
    this.navService.handleTabs(window.location.pathname);
  }

  ngOnInit() {
  }

  public export(): void {
    if (environment.name === 'local') {
      this.fireFunction.functions.useFunctionsEmulator(environment.firefunction.url);
    }
    this.fireFunction
      .httpsCallable('rates')({ login: environment.firefunction.login, password: environment.firefunction.password })
      .toPromise()
      .then((response) => {
        this.exportCsv(response);
      })
      .catch((err) => {
        this.toastService.showToast("Erreur lors de l'export du fichier", 'toast-error');
        throw new Error('An error occurred when export csv file');
      });
  }

  private exportCsv(rates) {
    const json2csvParser = new Parser({ delimiter: ';', encoding: 'utf8' });
    const data = json2csvParser.parse(rates);
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    const date = new Date().toLocaleDateString('ko-KR').replace(/. /g, '');
    const filename = 'PE_Outil_Traduction_KPI_' + date + '.csv';
    a.setAttribute('download', filename);
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
  }

}
