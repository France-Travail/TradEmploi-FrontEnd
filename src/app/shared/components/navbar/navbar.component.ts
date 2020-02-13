// Angular
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { SettingsService } from 'src/app/services/settings.service';

// Models
import { NavbarItem } from 'src/app/models/navbar-item';

// Data
import { COUNTRIES } from 'src/app/data/countries';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() items: NavbarItem[];
  @Output() perform: EventEmitter<any> = new EventEmitter<any>();

  public language: { raw: string; french: string } = { raw: '', french: '' };

  constructor(private route: ActivatedRoute, public router: Router, private settingsService: SettingsService) {
    this.settingsService.guest.subscribe(user => {
      if (user.language !== '') {
        this.language = {
          raw: COUNTRIES.find(c => c.code.writtenLanguage === user.language).language,
          french: COUNTRIES.find(c => c.code.writtenLanguage === user.language).frenchVersion
        };
      }
    });
  }

  ngOnInit(): void {}

  public onClick(item: NavbarItem): void {
    if (item.link !== undefined) {
      this.goto(item.link);
    } else {
      this.perform.emit(item.action);
    }
  }

  /**
   * Redirect to a page
   */
  public goto(where: string): void {
    if (where === 'return') {
      this.route.params.subscribe(params => {
        this.router.navigate([params.from]);
      });
    } else {
      this.router.navigate([where]);
    }
  }
}
