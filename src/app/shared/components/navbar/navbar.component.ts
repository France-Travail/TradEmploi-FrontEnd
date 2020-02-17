import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { NavbarItem } from 'src/app/models/navbar-item';
import { COUNTRIES } from 'src/app/data/countries';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() items: NavbarItem[];
  @Output() perform: EventEmitter<any> = new EventEmitter<any>();

  public title: string = 'Traduction Instantanée';
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

  public onClick(item: NavbarItem): void {
    if (item.link !== undefined) {
      this.goto(item.link);
    } else {
      this.perform.emit(item.action);
    }
  }

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
