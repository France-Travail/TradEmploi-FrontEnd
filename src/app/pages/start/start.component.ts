import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from '../../services/navbar.service';
import {params} from '../../../environments/params';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements AfterContentInit, OnInit {
  public opacity = 0;

  constructor(private readonly router: Router, private readonly navbarService: NavbarService) {
  }

  /*
  onInit used only for Pôle Emploi needs.
  */
  ngOnInit(): void {
    const location = window.location.host;
    if (location === params.organization.etabsDomain) {
      window.location.href = params.organization.officalDomain;
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
