import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { environment } from '../../environments/environment';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  constructor() { }

  getAll(): Observable<Array<Task>> {
    if (environment.mockBackend) {
      return of(this.readTasks());
    }
    return of([]); // TODO: Implement http call
  }

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  create(name: string): Observable<Task> {
    if (environment.mockBackend) {
      const tasks = this.readTasks();
      const task = { id: uuid(), name };
      tasks.push(task);
      this.writeTasks(tasks);
      return of(task);
    }
    return of(null); // TODO: Implement http call
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  delete(id: string): Observable<void> {
    if (environment.mockBackend) {
      const tasks = this.readTasks();
      const index = tasks.findIndex(task => task.id === id);
      tasks.splice(index);
      this.writeTasks(tasks);
    }
    return of(); // TODO: Implement http call
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(TaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(TaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
