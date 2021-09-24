import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

@Directive({
  selector: '[holdable]'
})
export class HoldableDirective {

  @Output() holdTime: EventEmitter<number> = new EventEmitter();
  @Output() stop = new EventEmitter();
  @Output() start = new EventEmitter();
  stop$ = new Subject<any>();

  constructor() {
    this.stop$.subscribe(() => {
      // this.holdTime.emit(0);
      this.stop.emit();
    });
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  onExit() {
    this.stop$.next();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onHold() {
    this.start.emit();
    const ms = 100;

    interval(ms).pipe(
      takeUntil(this.stop$),
      tap(v => {
        this.holdTime.emit(v * ms);
      }),
    ).subscribe();

  }
}
