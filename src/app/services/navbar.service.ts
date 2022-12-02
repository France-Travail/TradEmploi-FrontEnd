import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { Role } from '../models/role';
import { Router } from '@angular/router';

@Injectable()
export class NavbarService {
  public visible = false;
  public choiceTab = false;
  public modalityTab = false;
  public helpTab = false;
  public endTab = false;
  public tradDocTab = false;
  constructor(private readonly settingsService: SettingsService, private readonly router: Router) {}

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }

  public handleTabModality() {
    this.choiceTab = false;
    this.tradDocTab = false;
    this.modalityTab = false;
    this.helpTab = true;
    this.endTab = false;
  }

  public handleTabGDPR() {
    this.choiceTab = false;
    this.tradDocTab = false;
    this.modalityTab = this.settingsService.user.value && this.settingsService.user.value.role !== Role.GUEST;
    this.helpTab = true;
    this.endTab = false;
  }

  public handleTabsTranslation() {
    this.choiceTab = !this.settingsService.user.value.isMultiDevices || this.settingsService.user.value.role === Role.GUEST;
    this.modalityTab = this.settingsService.user.value.role !== Role.GUEST;
    this.helpTab = true;
    this.tradDocTab = this.settingsService.user.value.role !== Role.GUEST;
    const isOnTranslation = this.router.url.indexOf('translation') > 0;
    const isNotGuest = this.settingsService.user.value.role !== Role.GUEST;
    this.endTab = isOnTranslation && isNotGuest;
  }

  public handleTabsChoice() {
    this.choiceTab = false;
    this.tradDocTab = false;
    this.modalityTab = this.settingsService.user.value.role !== Role.GUEST;
    this.helpTab = true;
    this.endTab = false;
  }

  public handleTabsSettings() {
    this.choiceTab = true;
    this.tradDocTab = false;
    this.modalityTab = true;
    this.helpTab = true;
    this.endTab = false;
  }
  public handleTabsTradTonDoc() {
    this.choiceTab = true;
    this.tradDocTab = false;
    this.modalityTab = true;
    this.helpTab = true;
    this.endTab = false;
  }
}
