import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Array<Task> = [];

  constructor() { }

  list(): Array<Task> {
    return this.tasks;
  }

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  create(task: Task): void {
    this.tasks.push(task);
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  delete(index: number): void {
    this.tasks.splice(index, 1);
  }
}
