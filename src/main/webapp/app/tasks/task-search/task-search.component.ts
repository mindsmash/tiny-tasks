import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Search field for tiny tasks.
 */
@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent {

  taskSearch: FormGroup = new FormGroup({
    queryInput: new FormControl('', Validators.required)
  });

  @Output() query = new EventEmitter<string>();

  constructor() { }

  searchQuery(event) {
    this.query.emit(event.target.value);
  }

}
