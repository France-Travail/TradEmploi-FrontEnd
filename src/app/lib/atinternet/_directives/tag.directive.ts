import {Directive, ElementRef, Input} from '@angular/core';
import {TagService} from '../_services/tag.service';

@Directive({
  selector: '[atTag]'
})

export class TagDirective {

  constructor(private el: ElementRef, private tagService: TagService) {}

  @Input() clickData: any;
  @Input() pageData: any;

  ngAfterViewInit() {
    if (this.pageData && typeof this.pageData === 'object') {
      this.tagService.pageSend(this.pageData);
    }
    if (this.clickData && typeof this.clickData === 'object') {
      this.clickData.elem = this.el.nativeElement;
      this.tagService.clickListener(this.clickData);
    }
  }
}
