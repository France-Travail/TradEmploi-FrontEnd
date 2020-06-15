import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { NavbarItem } from 'src/app/models/navbar-item';
import { LogoutComponent } from '../logout/logout.component';
import { MatDialog } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() items: NavbarItem[];
  @Output() perform: EventEmitter<any> = new EventEmitter<any>();

  public title: string = 'Traduction Instantanée';
  private isMobile: boolean = false;

  constructor(private route: ActivatedRoute, public router: Router, private settingsService: SettingsService, public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
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
}
