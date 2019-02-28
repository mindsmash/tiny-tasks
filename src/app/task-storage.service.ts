import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {
  public tasks: Array<string>;

  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('TT.tasks')) || [];
  }

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  public add(task: string): void {
    this.tasks.push(task);
    localStorage.setItem('TT.tasks', JSON.stringify(this.tasks));
  }

  /**
   * Clears the list of tasks.
   */
  public clear(): void {
    this.tasks.splice(0);
    localStorage.setItem('TT.tasks', JSON.stringify(this.tasks));
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  public remove(index: number): void {
    this.tasks.splice(index, 1);
    localStorage.setItem('TT.tasks', JSON.stringify(this.tasks));
  }
}
