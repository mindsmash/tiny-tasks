import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import {MatIcon} from "@angular/material/icon";

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
    console.log("delete in task-list called on : "+task)
    this.taskService.delete(task.id).subscribe(() => {
      console.log("deleted",task.id)
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
    this.taskService.done(task.id, task.done).subscribe(()=>{
      console.log("donesky task: ",task.id)
      this.donesky.emit(task)
    });
    console.log("returning: "+task)
    return task;
  }

}

