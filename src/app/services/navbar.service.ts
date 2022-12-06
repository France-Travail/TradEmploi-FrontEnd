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
  }

  public handleTabsTranslation() {
    this.choiceTab = !this.settingsService.user.value.isMultiDevices || this.settingsService.user.value.role === Role.GUEST;
    this.modalityTab = this.settingsService.user.value.role !== Role.GUEST;
    this.helpTab = true;
    this.tradDocTab = this.settingsService.user.value.role !== Role.GUEST;
  }

  public handleTabsChoice() {
    this.choiceTab = false;
    this.tradDocTab = false;
    this.modalityTab = this.settingsService.user.value.role !== Role.GUEST;
    this.helpTab = true;
  }

  public handleTabsSettings() {
    this.choiceTab = true;
    this.tradDocTab = false;
    this.modalityTab = true;
    this.helpTab = true;
  }

  public handleTabsTradTonDoc() {
    this.choiceTab = true;
    this.tradDocTab = false;
    this.modalityTab = true;
    this.helpTab = true;
  }
}
