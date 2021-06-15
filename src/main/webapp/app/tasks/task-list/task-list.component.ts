import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';


import {Task} from '../task';
import {TaskService} from '../task.service';
import {FileAttachment} from 'app/tasks/fileAttachment';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  // from child
  @Output() fileAttached: EventEmitter<FileAttachment> = new EventEmitter();
  @Output() fileDetached: EventEmitter<FileAttachment> = new EventEmitter();


  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  passFileAttached($event): void {
    this.fileAttached.emit($event);
  }

  passFileDetached($event): void {
    this.fileDetached.emit($event);
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }
}
