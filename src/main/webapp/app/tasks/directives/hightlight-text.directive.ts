import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[tinyHighlightText]',
})
export class HightlightTextDirective implements OnInit {
  @Input('tinyHighlightText') highlightText: string;
  @Input() searchText: string;
  @Input() highlightStyle: string;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    console.log(this.highlightText);

    // this.el.nativeElement.style.backgroundColor = 'yellow';
    this.el.nativeElement.innerHTML = this.highlight();
  }

  highlight() {
    if (!this.searchText) {
      return this.highlightText;
    }
    return this.highlightText.replace(
      new RegExp(this.searchText, 'gi'),
      (match) => {
        return `<span class="${this.highlightStyle}">${match}</span>`;
      }
    );
  }
}
