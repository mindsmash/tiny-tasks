import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A form to search for tiny tasks.
 */
@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSearchComponent implements OnInit {

  @Output() typed: EventEmitter<string> = new EventEmitter();

  taskSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
    this.taskSearch.get('name').valueChanges.subscribe(val => {
        this.typed.emit(val);
    });
  }

  resetForm() {
      this.taskSearch.reset();
  }

}
