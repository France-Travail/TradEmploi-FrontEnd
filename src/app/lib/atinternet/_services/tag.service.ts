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
    this.tag = new ATInternet.Tracker.Tag();
  }

  click(info: ClickInfo): boolean {
    return this.tag.click.send(info);
  }

  clickListener(info: ClickInfo): void {
    this.tag.clickListener.send(info);
  }

  pageSend(info: PageInfo): void {
    this.tag.page.send(info);
  }

}
