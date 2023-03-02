import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightResult]',
  standalone: true,
})
export class HighlightResultDirective implements OnChanges {
  @Input() teamResult: string = '';
  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.teamResult === 'win') {
      this.el.nativeElement.style.backgroundColor = 'green';
    } else if (this.teamResult === 'lose') {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
    console.log(this.teamResult);
  }
}
