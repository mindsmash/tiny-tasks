import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core'
import { Task } from '../task'
import { TaskService } from '../task.service'
import { MatCheckboxChange } from '@angular/material/checkbox'
/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() tasks: Task[]

  @Output() deleted: EventEmitter<Task> = new EventEmitter()

  @Output() statusChanged: EventEmitter<Task> = new EventEmitter()

  @Output() deletedDoneTasks: EventEmitter<Task> = new EventEmitter()

  constructor(@Inject('TaskService') private taskService: TaskService) {}

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task)
    })
  }

  setIsDone(task: Task): void {
    this.taskService
      .setIsDone(task.id)
      .subscribe(() => this.statusChanged.emit(task))
  }

  deleteDoneTasks(task: Task): void {
    this.taskService.delete(task.status).subscribe(() => {
      this.deletedDoneTasks.emit(task)
    })
  }
}

/* setIsDone(event:MatCheckboxChange, task: Task): void {
  this.taskService.done(task.id).subscribe(() => {
    this.statusChanged.emit(task);
  });
} */

/* setIsDone(checked: boolean, task: Task): void {
  task.done = checked;
  this.taskService.done(task).subscribe(() => {
    this.statusChanged.emit(task);
  });
} */
