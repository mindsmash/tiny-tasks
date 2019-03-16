import { Component, ElementRef, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'tiny-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const notFirstUsage = !localStorage.getItem("not-first-usage");
    
    if (notFirstUsage) {
      this.show();
      localStorage.setItem("not-first-usage", "true");
    }
  }

  public show() {
    $(this.el.nativeElement).find(".modal").modal();
  }

}
