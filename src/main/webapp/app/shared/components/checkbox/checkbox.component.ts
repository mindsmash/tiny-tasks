import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tiny-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  @Input() name: string;
  @Input() click: string;

  pushChanges(value: string): void {
    this.onChange();
  }

  protected onChange = () => {};

}
