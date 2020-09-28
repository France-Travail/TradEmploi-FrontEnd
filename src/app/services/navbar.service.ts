import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  public visible: boolean = false;
  public choiceTab: boolean = false;
  public shareTab: boolean = false;
  public settingsTab: boolean = false;

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }

  public handleTabsChoice() {
    this.choiceTab = false;
    this.shareTab = false;
    this.settingsTab = true;
  }

  public handleTabsTranslation() {
    this.choiceTab = true;
    this.shareTab = true;
    this.settingsTab = true;
  }

  public handleTabsSettings() {
    this.choiceTab = true;
    this.shareTab = false;
    this.settingsTab = false;
  }
}
