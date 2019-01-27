import { Component } from '@angular/core';
import { Task } from './objects/task';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tasks: Array<Task> = [];

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(taskName: string, selectedDate: string): void {
    this.tasks.push(new Task(taskName, selectedDate));
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
   * Changes status to Done
   */
  finish(index: number): void {
    this.tasks[index].finishTask();
  }

  /**
   * Changes status of task to started
   */
  start(index: number): void{
    this.tasks[index].startTask();
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.tasks.splice(0);
  }

  getTasksWithStatus(status:string):Array<Task>{
    return this.tasks.filter(task=>task.compareStatus(status))
  }
}
