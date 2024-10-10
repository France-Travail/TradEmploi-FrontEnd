import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public currentUserDomain: string;
  public currentUserHash: string;

  constructor() {
    this.currentUserDomain = '';
    this.currentUserHash = '';
  }
}
