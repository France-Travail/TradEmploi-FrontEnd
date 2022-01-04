import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'translation';
  constructor(private readonly router: Router, public readonly navbarService: NavbarService) {
    addEventListener('storage', this.storageChange.bind(this));
  }

  storageChange(event) {
    if (event.storageArea.isLogged === 'false') {
      this.router.navigate(['/start']);
    }
  }
}
