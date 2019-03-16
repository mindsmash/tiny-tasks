import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tiny-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {

  @Output() onCreateTask: EventEmitter<String> = new EventEmitter();

  emitOnCreateTask(task: string): void {
    this.onCreateTask.emit(task);
  }

}
