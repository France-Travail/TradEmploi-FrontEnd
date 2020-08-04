import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  public visible: boolean = false;
  public choiceTab: boolean = false;
  public shareTab: boolean = false;
  public settingsTab: boolean = false;
  public isGuest: boolean = false;

  constructor() {
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }

  public handleTabs(path) {
    if(path === '/choice') {
      this.choiceTab = false;
      this.shareTab = false;
      this.settingsTab = true;
    } else if (path === '/translation') {
      this.choiceTab = true;
      this.shareTab = true;
      this.settingsTab = true;
    } else if (path === '/settings/translation') {
      this.choiceTab = true;
      this.shareTab = false;
      this.settingsTab = false;
    }
  }

}
