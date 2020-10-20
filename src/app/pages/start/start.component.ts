// Angular
import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SettingsService } from 'src/app/services/settings.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements AfterContentInit {
  public opacity: number = 0;

  constructor(private settingsService: SettingsService, private router: Router, private navbarService: NavbarService) {}

  ngAfterContentInit() {
    this.settingsService.reset();
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
