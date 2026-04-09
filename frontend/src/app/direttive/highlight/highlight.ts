import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight=''

  constructor(private element: ElementRef) { 
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.cambiaColore(this.appHighlight)
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.cambiaColore('blue')
  }

  cambiaColore(colore: string){
    this.element.nativeElement.style.color=colore
  }

}