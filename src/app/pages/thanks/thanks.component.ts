import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import {FRENCH} from '../../data/sentence';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss'],
})
export class ThanksComponent implements AfterViewInit {
  public message = FRENCH.thanks;

  constructor(private readonly router: Router, private readonly navbarService: NavbarService) {}

  ngAfterViewInit() {
    this.navbarService.hide();
    setTimeout(() => {
      this.router.navigate(['start']);
    }, 3000);
  }
}
