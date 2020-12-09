import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { Role } from '../models/role';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable()
export class NavbarService {
  public visible: boolean = false;
  public choiceTab: boolean = false;
  public modalityTab: boolean = false;
  public settingsTab: boolean = false;
  public helpTab: boolean = false;
  public endTab: boolean = false;
  public shareTab: boolean = true; // TODO: shareTab must be deleted when modality component is created

  constructor(private settingsService: SettingsService, private router: Router) {}

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }

  public handleTabModality() {
    this.choiceTab = false;
    this.modalityTab = false;
    this.settingsTab = this.settingsService.user.value.role === Role.ADMIN;
    this.helpTab = true;
    this.endTab = false;
  }

  public handleTabGDPR() {
    this.choiceTab = false;
    this.modalityTab = this.settingsService.user.value && this.settingsService.user.value.role !== Role.GUEST;
    this.settingsTab = this.settingsService.user.value && this.settingsService.user.value.role === Role.ADMIN;
    this.helpTab = true;
    this.endTab = false;
  }

  public handleTabsTranslation() {
    this.choiceTab = true;
    this.modalityTab = this.settingsService.user.value.role !== Role.GUEST;
    this.settingsTab = this.settingsService.user.value.role === Role.ADMIN;
    this.helpTab = true;
    const isOnTranslation =  this.router.url.indexOf('translation') > 0;
    const isNotGuest = this.settingsService.user.value.role !== Role.GUEST;
    this.endTab = isOnTranslation && isNotGuest;
    // this.breakpointObserver.observe(['(max-width: 820px)']).subscribe((result) => {
    //   const isSmallScreen = result.matches
    //   const isOnTranslation =  this.router.url.indexOf('translation') > 0
    //   const isNotGuest = this.settingsService.user.value.role !== Role.GUEST
    //   this.endTab = isSmallScreen
    //     && isOnTranslation
    //     && isNotGuest
    // });
  }

  public handleTabsChoice() {
    this.choiceTab = false;
    this.modalityTab = this.settingsService.user.value.role !== Role.GUEST;
    this.settingsTab = this.settingsService.user.value.role === Role.ADMIN;
    this.helpTab = true;
    this.endTab = false;
  }

  public handleTabsSettings() {
    this.choiceTab = true;
    this.modalityTab = true;
    this.settingsTab = false;
    this.helpTab = true;
    this.endTab = false;
  }
}
