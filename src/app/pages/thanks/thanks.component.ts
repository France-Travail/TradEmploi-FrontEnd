import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements AfterViewInit {
  public message = 'Pôle Emploi vous remercie.';

  constructor(private readonly router: Router, private readonly navbarService: NavbarService) {
  }

  ngAfterViewInit() {
    this.navbarService.hide();
    setTimeout(() => {
      this.router.navigate(['start']);
    }, 3000);
  }
}
