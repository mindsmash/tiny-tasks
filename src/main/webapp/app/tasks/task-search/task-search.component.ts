import { Component, EventEmitter, OnInit, Output } from '@angular/core';
/**
 * A Search Task.
 */
@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent {
  @Output() searchDataEmitter = new EventEmitter<string>();
  search : string ="";
  constructor() { }

  searchTask(){
    this.searchDataEmitter.emit(this.search)
  }

  /**
 * Called when ever text is called
 */
  onTextChange(){
    this.searchDataEmitter.emit(this.search)
  }
}
