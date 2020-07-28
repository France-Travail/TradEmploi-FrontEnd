// Angular
import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SettingsService } from 'src/app/services/settings.service';
import { HistoryService } from 'src/app/services/history.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements AfterContentInit {
  public opacity: number = 0;

  constructor(private historyService: HistoryService, private settingsService: SettingsService, private router: Router, private navbarService: NavbarService) {}

  ngAfterContentInit() {
    this.settingsService.newConversation = true;
    this.settingsService.reset();
    this.historyService.startConversation(this.settingsService.advisor, this.settingsService.guest.value);
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
