import {
  Directive, ElementRef, AfterViewChecked,
  Input, HostListener
} from '@angular/core';

@Directive({
  selector: '[appMatchHeight]'
})
export class MatchHeightDirective implements AfterViewChecked{

  @Input()
  myMatchHeight: string;

  constructor(private el: ElementRef) { 

  }

  ngAfterViewChecked() {
    this.matchHeight(this.el.nativeElement, this.myMatchHeight);
  }

  matchHeight(parent: HTMLElement, className: string) {
    
    if (!parent) return;

    const children = parent.getElementsByClassName(className);
    if (!children) return;

    // Get all child elements heights
    const itemHeights = Array.from(children)
                             .map(x => x.getBoundingClientRect().height);

    // find out the tallest
    const maxHeight = itemHeights.reduce((prev, curr) => {
      return curr > prev ? curr : prev;
    }, 0);

    Array.from(children)
         .forEach((x: HTMLElement) => x.style.height = `${maxHeight}px`);
  }

}
