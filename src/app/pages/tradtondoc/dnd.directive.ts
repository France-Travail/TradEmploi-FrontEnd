import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      this.fileDropped.emit(file);
    }
  }
}
