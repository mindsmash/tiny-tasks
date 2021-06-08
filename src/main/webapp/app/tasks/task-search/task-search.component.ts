import {Component, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent {
  @Output()
  searchKey: string;
  taskSearch: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor() {}

  resetSearch(): void {
    this.taskSearch.reset();
  }

}
