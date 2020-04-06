import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarItem } from 'src/app/models/navbar-item';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { environment } from '../../../environments/environment';
import { Parser } from 'json2csv';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  public navBarItems: NavbarItem[] = [];
  public isAdmin: boolean = false;

  constructor(
    public router: Router,
    private authService: AuthService,
    private fireFunction: AngularFireFunctions
  ) {
    this.setNavBar();
    this.authService.auth.subscribe((auth) => {
      if (auth !== null) {
        this.isAdmin = auth.role === 'ADMIN';
      }
    });
  }

  public setNavBar(): void {
    this.navBarItems = [
      {
        icon: 'assets/icons/icon-return-black.svg',
        infoTitle: 'RETOUR',
        link: 'return',
        isDisplayed: true
      }
    ];
  }

  public export(): void {
    if (environment.name === 'local') {
      this.fireFunction.functions.useFunctionsEmulator(environment.firefunction.url);
    }
    this.fireFunction
      .httpsCallable('rates')({})
      .toPromise()
      .then((response) => {
        this.exportCsv(response);
      })
      .catch((err) => console.error('error', err));
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  private exportCsv(rates) {
    const json2csvParser = new Parser();
    const data = json2csvParser.parse(rates);
    const blob = new Blob([data], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'petraduction.csv');
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
  }

  onItemChange(value) {
    console.log(' Value is : ', value);
  }
}
