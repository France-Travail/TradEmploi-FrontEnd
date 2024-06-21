import { Directive, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { interval, Subject, Subscription, take, takeUntil } from 'rxjs';

@Directive({
  selector: '[holdable]'
})
export class HoldableDirective implements OnInit {

  @Output() holdTime: EventEmitter<number> = new EventEmitter();
  @Output() stop = new EventEmitter();
  @Output() start = new EventEmitter();
  @Input() erase: EventEmitter<any>;
  @Input() altMicroActif: boolean;
  private subscribe: Subscription;
  stop$ = new Subject<any>();
  private longPush = false;
  private started = false;
  private typeEvent = '';

  constructor() {
  }


  ngOnInit(): void {
    this.subscribe = this.erase.subscribe(() => {
      this.started = false;
      this.stop.emit();
    });
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  onExit(){
    this.stop$.next(true);
    if (this.longPush) {
      this.reset();
    }
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onHold(onHold: Event) {
    if (!this.longPush && this.started && this.typeEvent === onHold.type) {
      this.reset();
    } else if ((this.typeEvent === onHold.type || this.typeEvent === '') && !this.altMicroActif ) {
      this.typeEvent = onHold.type;
      this.started = true;
      this.start.emit();
      const ms = 100;

      interval(ms).pipe(
        take(1),
        takeUntil(this.stop$))
        .subscribe(value => this.longPush = true);

      interval(ms).pipe(
        takeUntil(this.stop),
      ).subscribe(v => this.holdTime.emit(v * ms));

    }
  }

  reset() {
    this.stop.emit();
    this.started = false;
    this.longPush = false;
  }
}
