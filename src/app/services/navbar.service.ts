import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  public visible: boolean;
  public choiceTab: boolean;
  public shareTab: boolean;
  public settingsTab: boolean;

  constructor() {
    this.visible = false;
    this.choiceTab = false;
    this.shareTab = false;
    this.settingsTab = false;
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }

  public handleTabs(path) {
    console.log('path : ', path)
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
