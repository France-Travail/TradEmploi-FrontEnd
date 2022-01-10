// Angular
import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { NavbarService } from '../../services/navbar.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements AfterContentInit {
  public opacity = 0;

  constructor(private readonly settingsService: SettingsService, private readonly router: Router, private readonly navbarService: NavbarService) {}

  ngAfterContentInit() {
    this.navbarService.hide();
    const id = setInterval(() => {
      this.opacity = this.opacity + 0.05;
      if (this.opacity > 1) {
        clearInterval(id);
      }
    }, 100);

    setTimeout(() => {
      this.router.navigate(['auth']);
    }, 3000);
  }
}
