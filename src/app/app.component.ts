import { Component } from '@angular/core';
import { Task } from './model/Task';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  checked = false;
  tasks: Array<Task> = [];
  task: Task;
  taskInput: "";

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(task: string, priority: number): void {
    if(task != ""){
      this.task = new Task(task);
      this.task.priority = priority;
      this.tasks.push(this.task);
    }
    else{
      // validation error
    }
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  remove(index: number): void {
    this.tasks.splice(index, 1);
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.tasks.splice(0);
  }

  checkedChanged(ischecked:boolean, index:number){
    this.tasks[index].status = ischecked;
  }
}
