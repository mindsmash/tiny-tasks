import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {Task} from "app/tasks/task";
import {TaskService} from '../task.service';
import {Observable} from "rxjs";

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent {

  @Output() searched: EventEmitter<Task[]> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  onChange(query): void {
    this.searched.emit(query);
  }
}
