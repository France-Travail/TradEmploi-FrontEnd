import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ENGLISH } from 'src/app/data/sentence';
import { FRENCH } from '../../data/sentence';
import { Gdpr } from 'src/app/models/gdpr';
import { NavbarService } from 'src/app/services/navbar.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss'],
})
export class GdprComponent {
  public selected = 'english';
  public isMoreOptions: boolean = false;
  public isSmallScreen: boolean = false;
  public gdprWording: Gdpr = ENGLISH.gdpr;

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe(['(max-width: 1050px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
    this.navbarService.handleTabGDPR();
    this.navbarService.show();
  }

  public agree() {
      this.router.navigateByUrl('choice');
  }

  public moreOptions() {
    this.isMoreOptions = true;
    this.language({ value: this.selected });
  }

  public language(option) {
    this.gdprWording = option.value === 'english' ? ENGLISH.gdpr : FRENCH.gdpr;
  }
}
