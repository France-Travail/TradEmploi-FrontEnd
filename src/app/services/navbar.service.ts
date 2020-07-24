import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  public visible: boolean;
  public isDisplay: boolean;

  constructor() {
    this.visible = false;
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }

  public hideItem() {
    this.isDisplay = false;
    console.log('isDisplay :', this.isDisplay)
  }

}
