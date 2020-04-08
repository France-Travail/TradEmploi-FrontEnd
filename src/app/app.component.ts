import { Component } from '@angular/core';
import { VoicesService } from './services/voices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'translation';
  constructor(private voicesService: VoicesService) {

  }
}
