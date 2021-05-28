import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {

  searchInput = new FormControl('');
  @Output() search = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.searchInput.valueChanges.subscribe(value => this.search.emit(value));
  }

}
