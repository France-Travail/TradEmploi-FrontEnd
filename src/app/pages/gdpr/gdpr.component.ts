import {Component, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ENGLISH } from 'src/app/data/sentence';
import { FRENCH } from '../../data/sentence';
import { Gdpr } from 'src/app/models/gdpr';
import { NavbarService } from 'src/app/services/navbar.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<GdprComponent>,
    private navbarService: NavbarService,
    private breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public data: { language: string }
  ){
    this.breakpointObserver.observe(['(max-width: 1050px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
    this.selected = this.data.language;
    this.chooseLanguage(this.selected);
    this.navbarService.handleTabGDPR();
    this.navbarService.show();

  }

  public moreOptions() {
    this.isMoreOptions = true;
    this.chooseLanguage({ value: this.selected });
  }

  public chooseLanguage(option) {
    this.gdprWording = option.value === 'english' ? ENGLISH.gdpr : FRENCH.gdpr;
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
