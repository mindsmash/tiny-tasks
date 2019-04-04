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

  /**
   * Returns the list of all tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
  getAll(): Observable<Task[]> {
    if (environment.mockBackend) {
      return of(this.readTasks());
    }
    return of([]); // TODO: Implement http call
  }

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's name
   * @returns an `Observable` holding the created task
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
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void> {
    if (environment.mockBackend) {
      const tasks = this.readTasks();
      const index = tasks.findIndex(task => task.id === id);
      console.log(index);
      if (index !== -1) {
        tasks.splice(index, 1);
        this.writeTasks(tasks);
      }
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
