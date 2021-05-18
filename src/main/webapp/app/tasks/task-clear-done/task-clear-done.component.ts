import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {TaskService} from "app/tasks/task.service";
import {Task} from "app/tasks/task";

@Component({
  selector: 'tiny-task-clear-done',
  templateUrl: './task-clear-done.component.html',
  styleUrls: ['./task-clear-done.component.scss']
})
export class TaskClearDoneComponent {

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  clearDoneTasks() {
    const doneTasks = this.tasks.filter(task => task.done === true).map(task => {
      return task.id
    });
    if (doneTasks.length === 0) {
      return;
    }
    this.taskService.deleteTasks(doneTasks).subscribe(() => {
      this.deleted.emit();
    });
  }

}
