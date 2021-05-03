import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tiny-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() name: string;
  @Input() click: string;
  value = '';

  writeValue(value: string): void {
    this.value = value || '';
  }

  pushChanges(value: string) {
    this.writeValue(value);
    this.onChange(this.value);
  }

  protected onChange = (value: string) => {};

  constructor() { }

  ngOnInit(): void {
  }

}
