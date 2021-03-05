import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  getAll(): Observable<Task[]> {
    return of(this.readTasks());
  }

  create(name: string, status: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = { id: uuid(), name, status, done: false };
    tasks.push(task);
    this.writeTasks(tasks);
    return of(task);
  }

  delete(id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.writeTasks(tasks);
    }
    return of(null);
  }

  updateStatus(id: string, status: string): Observable<Task[]> {
    const tasks = this.readTasks();
    const updated_tasks = tasks.map(task => {
      if (task.id === id) {
        task.status = status;
        task.done = (task.status === 'done') ? true : false;
      }
      return task;
    });
    this.writeTasks(updated_tasks);
    return of(updated_tasks);
  }

  clearCompletedTasks(): Observable<void> {
    const tasks = this.readTasks();
    const clearedTasks = tasks.filter(task => task.status !== 'done');
    this.writeTasks(clearedTasks);
    return of(null);
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
