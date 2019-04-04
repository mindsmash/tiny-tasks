import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'tiny-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Output() delete: EventEmitter<Task> = new EventEmitter();

  @Input() task: Task;

  onDelete(): void {
    this.delete.emit(this.task);
  }
}
