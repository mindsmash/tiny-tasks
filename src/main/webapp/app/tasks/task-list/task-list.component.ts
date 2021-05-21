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
  public tempTasks: Task[];
  public hideDoneTasks: boolean = false;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  markAsDone(task: Task): void {
    task.done = true;
    this.updateTaskListOrder(task);
  }

  updateTaskListOrder(task: Task): void {
    for(let i = 0; i < this.tasks.length; i++) {    
      if ( this.tasks[i].id === task.id) {  
          this.tasks.splice(i, 1); 
          this.tasks.push(task);
      }  
    }
  }

  toggleHideDoneTasks(): void {
    if (!this.hideDoneTasks) {
      this.tempTasks = this.tasks;
      this.tasks = this.tasks.filter(
          task => task.done !== true
      );
    } else {
      this.tasks = this.tempTasks;
      this.tempTasks = [];
    }
  }
}
