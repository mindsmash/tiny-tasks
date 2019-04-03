import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Array<string>;

  constructor() {
  }

  /**
   * Get the list of tasks
   */
  getAll(): Array<string> {
    if (environment.mockBackend) {
      const tasks = localStorage.getItem('tasks');
      if (tasks === null || tasks === undefined) {
        localStorage.setItem('tasks', '[]');
      }
      return JSON.parse(localStorage.getItem('tasks'));
    }
    // TODO: Implement http call
    return [];
  }

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(task: string): void {
    if (environment.mockBackend) {
      const tasks: Array<string> = JSON.parse(localStorage.getItem('tasks'));
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    // TODO: Implement http call
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  remove(index: number): void {
    if (environment.mockBackend) {
      const tasks: Array<string> = JSON.parse(localStorage.getItem('tasks'));
      tasks.splice(index);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    // TODO: Implement http call
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    if (environment.mockBackend) {
      localStorage.clear();
    }
    // TODO: Implement http call
  }
}
