import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'translation';
  protected showCreateShortcut = false;
  protected deferredPrompt: any;

  constructor(private readonly router: Router, public readonly navbarService: NavbarService) {
    addEventListener('storage', this.storageChange.bind(this));
  }

  storageChange(event) {
    if (event.storageArea.isLogged === 'false') {
      this.router.navigate(['/start']);
    }
  }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  }
}
