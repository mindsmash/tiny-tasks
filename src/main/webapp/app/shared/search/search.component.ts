import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tiny-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>(); 
  
  updateValue(value){
    this.value = value;
    this.valueChange.emit(value);
  }
}
