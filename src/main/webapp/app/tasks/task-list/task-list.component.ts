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


  done(task: Task): Task {
    let toggleDone = !task.done;
    let modified = Date.now().toLocaleString();
    this.taskService.done(task.id, toggleDone, modified ).subscribe(()=>{
      this.donesky.emit(task)
    });
    return task;
  }

  edit(task: Task): Task {
    let modified = Date.now().toLocaleString();
    let name = "";
    let dueDate = "";
    this.taskService.edit(task.id, name, dueDate, modified ).subscribe(()=>{

    })
    return task;
  }

}

