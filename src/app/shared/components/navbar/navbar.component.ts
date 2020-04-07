import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { NavbarItem } from 'src/app/models/navbar-item';
import { COUNTRIES } from 'src/app/data/countries';
import { AuthService } from 'src/app/services/auth.service';
import { LogoutComponent } from '../logout/logout.component';
import { MatDialog } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() items: NavbarItem[];
  @Output() perform: EventEmitter<any> = new EventEmitter<any>();

  public title: string = 'Traduction Instantanée';
  public language: { raw: string; french: string } = { raw: '', french: '' };
  private isMobile: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private settingsService: SettingsService,
    public dialog: MatDialog,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
    this.settingsService.guest.subscribe((user) => {
      if (user.language !== '') {
        this.language = {
          raw: COUNTRIES.find((c) => c.code.writtenLanguage === user.language).language,
          french: COUNTRIES.find((c) => c.code.writtenLanguage === user.language).LanguageFr,
        };
      }
    });
  }

  ngAfterContentInit(): void {
    this.isConnected();
  }

  public onClick(item: NavbarItem): void {
    if (item.link !== undefined) {
      if (item.link === 'logout') {
        this.dialog.open(LogoutComponent, {
          width: this.isMobile ? '90%' : '800px',
          height: this.isMobile ? '100%' : '300px',
          panelClass: 'customDialog',
        });
      } else {
        this.goto(item.link);
      }
    } else {
      this.perform.emit(item.action);
    }
  }

  public goto(where: string): void {
    if (where === 'return') {
      this.route.params.subscribe((params) => {
        this.router.navigate([params.from]);
      });
    } else {
      this.router.navigate([where]);
    }
  }

  private isConnected() {
    this.authService.auth.subscribe((auth) => {
      if (auth !== null && this.checkItemHaveNotLogoutElement()) {
        this.items.push({
          icon: 'assets/icons/icon-logout.svg',
          infoTitle: 'DECONNEXION',
          link: 'logout',
          isDisplayed: true,
        });
      }
    });
  }

  private checkItemHaveNotLogoutElement() {
    return !this.items.some((i) => i.link === 'logout');
  }
}
