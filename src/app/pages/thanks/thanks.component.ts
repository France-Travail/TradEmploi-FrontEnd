import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements AfterViewInit {
  public message: string = 'Pôle Emploi vous remercie.';

  constructor(private router: Router,private navbarService: NavbarService) {
  }

  ngAfterViewInit() {
    this.navbarService.hide();
    setTimeout(() => {
      this.router.navigate(['start']);
    }, 3000);
  }
}
