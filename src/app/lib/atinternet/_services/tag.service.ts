import {Injectable} from '@angular/core';

declare const ATInternet: any;
export type Tag = any;

export interface PageInfo {
  name: string;
  level2?: string;
  chapter1?: string;
  chapter2?: string;
  chapter3?: string;
  customObject?: any;
}

export interface ClickInfo {
  elem: any;
  name: string;
  level2?: string;
  chapter1?: string;
  chapter2?: string;
  chapter3?: string;
  type: string;
  event?: any;
}

@Injectable({
  providedIn: 'root',
})
export class TagService {

  private tag: Tag;

  constructor() {
   this.setTag();
  }

  private setTag() {
    if (!this.tag) {
      const trakcer = ATInternet.Tracker;
      if (trakcer) {
        this.tag = new trakcer.Tag();
      }
    }
  }

  click(info: ClickInfo): boolean {
    this.setTag();
    return this.tag.click.send(info);
  }

  clickListener(info: ClickInfo): void {
    this.setTag();
    this.tag.clickListener.send(info);
  }

  pageSend(info: PageInfo): void {
    this.setTag();
    this.tag.page.send(info);
  }

}
