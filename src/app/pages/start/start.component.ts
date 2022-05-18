// Angular
import { Component, AfterContentInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements AfterContentInit, OnInit {
  public opacity = 0;

  constructor(private readonly router: Router, private readonly navbarService: NavbarService) {}
  ngOnInit(): void {
    const location = window.location.host;
    if (location === environment.organization.etabsDomain) {
      window.location.href = environment.organization.officalDomain;
    }
  }
  ngAfterContentInit() {
    this.navbarService.hide();
    const id = setInterval(() => {
      this.opacity = this.opacity + 0.05;
      if (this.opacity > 1) {
        clearInterval(id);
      }
    }, 100);

    setTimeout(() => {
      this.router.navigate(['auth']);
    }, 3000);
  }
}
