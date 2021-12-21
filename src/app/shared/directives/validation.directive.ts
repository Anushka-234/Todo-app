import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appValidation]'
})
export class ValidationDirective {

  private regex:RegExp = new RegExp(/^[a-zA-Z]+$/);

  constructor(private el : ElementRef) { }


  @HostListener('keydown', ['$event'])onKeyDown( event : KeyboardEvent){
    const inputVal:string = this.el.nativeElement.value.concat(event.key);
    console.log(event.key)
    if(inputVal && !String(inputVal).match(this.regex)){
      event.preventDefault();
    }
    return;
  }

}
