import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTestcolor]'
})
export class TestcolorDirective {

  constructor(private el:ElementRef) { 
    el.nativeElement.style.color = "white";
    el.nativeElement.style.backgroundColor = "black";
  }

}
