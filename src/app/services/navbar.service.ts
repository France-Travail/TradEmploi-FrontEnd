import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  public visible: boolean;

  constructor() {
    this.visible = false;
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }

}
