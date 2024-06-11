import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  slides = [0, 1];
  currentSlide = 0;
  public title: string;
  constructor(private readonly dialogRef: MatDialogRef<CarouselComponent>){}
  ngOnInit(): void {
    this.setTitle();
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    this.setTitle();
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    this.setTitle();
  }

  private setTitle() {
    switch (this.currentSlide) {
      case 0:
        this.title = 'Maitriser son environnement';
        break;
      case 1:
        this.title = 'Adapter son discours';
        break;
    }
  }
  public closeModal() {
    this.dialogRef.close();
  }
}
