import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Task } from '../task'

@Component({
  selector: 'tiny-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent {

  @Input()
  task: Task;

  @Output()
  remove: EventEmitter<Task> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Task> = new EventEmitter();

  constructor() {
  }

  toggleTaskComplete(task: Task) {
    this.toggleComplete.emit(task);
  }

  removeTask(task: Task) {
    this.remove.emit(task);
  }

}
