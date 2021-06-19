import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

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
  @Output() updated: EventEmitter<Task> = new EventEmitter();
  @Output() donesky: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  update(task: Task): void {
    this.taskService.update(task.id,task.done,task.name, task.dueDate ).subscribe(()=>{
      this.updated.emit(task);
    })
  }

  done(task: Task): Task {
    console.log("done in task-list is called on: "+task)
    this.taskService.done(task.id).subscribe(()=>{
      this.donesky.emit(task)
    });
    console.log("returning: "+task)
    return task;
  }

}

