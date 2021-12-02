import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  slides = [0, 1, 2];
  currentSlide = 0;
  public title: string;

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
        this.title = 'Video d\'explication';
        break;
      case 1:
        this.title = 'Maitriser son environnement';
        break;
      case 2:
        this.title = 'Adapter son discours';
        break;
    }
  }
}
