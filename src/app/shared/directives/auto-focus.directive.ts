import { Directive, AfterContentInit, OnChanges, OnDestroy, ElementRef, Input, SimpleChanges } from '@angular/core';
const BASE_TIMER_DELAY = 10;
@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit, OnChanges, OnDestroy{

  public shouldFocusElement: any;
  public timerDelay: number | string;
  private timer: any;

  constructor(public elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.shouldFocusElement = '';
    this.timer = null;
    this.timerDelay = BASE_TIMER_DELAY;
  }

  @Input() set appAutoFocus(bool: boolean) {
    this.timer = setTimeout(() => {
      if (bool) {
        this.startFocusWorkflow();
      }
    }, 30);
  }

  ngOnDestroy(): void {
    this.stopFocusWorkflow();
  }

  ngAfterContentInit(): void {
    if ( this.shouldFocusElement === '' ) {
      this.startFocusWorkflow();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes.appAutoFocus.currentValue) {
      this.elementRef.nativeElement.focus();
    }
  }


  stopFocusWorkflow() {
    clearTimeout( this.timer );
    this.timer = null;
  }

  startFocusWorkflow() {
    this.timer = setTimeout((): void => {
        this.timer = null;
        this.elementRef.nativeElement.focus();
      }, 10);
  }
}
