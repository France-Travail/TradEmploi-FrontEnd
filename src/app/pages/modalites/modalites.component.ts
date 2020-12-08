import { Component, OnInit } from '@angular/core';
import { FRENCH } from '../../data/sentence';
@Component({
  selector: 'app-modalites',
  templateUrl: './modalites.component.html',
  styleUrls: ['./modalites.component.scss'],
})
export class ModalitesComponent implements OnInit {
  public sentences = FRENCH.modalites;
  public target = 'mono';
  public checkIconStyle = "url('../../../assets/icons/check-circle.svg') no-repeat center center";
  constructor() {}

  ngOnInit(): void {}

  public switchModalites(current: string) {
    this.target = current;
  }
}
