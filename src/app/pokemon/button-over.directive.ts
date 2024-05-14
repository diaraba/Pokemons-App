import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appButtonOver]'
})
export class ButtonOverDirective {
  private initialColor: string = 'black';
  constructor(private el : ElementRef) { 
    this.setOver(this.initialColor)
  }
  @Input('appButtonOver') overColor: string;
  @HostListener('mouseenter') onMouseEnter(){
    this.setOver(this.overColor || this.initialColor );
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.setOver(this.initialColor );
  }

  setOver(color: string){
    this.el.nativeElement.style.color=`${color}`;
  }
}
