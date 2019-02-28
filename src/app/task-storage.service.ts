import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {
  public tasks: Array<string> = [];

  constructor() {
  }

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(task: string): void {
    this.tasks.push(task);
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.tasks.splice(0);
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  remove(index: number): void {
    this.tasks.splice(index, 1);
  }
}
