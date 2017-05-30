import { Directive, Input, Output, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector:'[getRef]',
  host: {
    '(click)':'show()'
  }
})
export class GetEleDirective {

  constructor(public el: ElementRef) { }
  show() {
    alert();
    console.log(this.el.nativeElement);
    console.log(this.el.nativeElement.offsetLeft);
  }
}
