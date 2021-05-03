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

  create(name: string): Observable<Task> {
    const tasks = this.readTasks();
    // Added new key value pair
    const task = {id: uuid(), name, isCompleted: false};
    tasks.push(task);
    this.writeTasks(tasks);
    return of(task);
  }

  update(id: string, task: Task): Observable<Task> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(t => t.id === id);

    if (index !== -1) {
      task.isCompleted = !task.isCompleted;
      tasks[index].isCompleted = !tasks[index].isCompleted;
      this.writeTasks(tasks);
    }

    return of(task);
  }

  delete(id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.writeTasks(tasks);
    }
    return of(null);
  }

  clearCompletedTasks(tasks): void {
    this.writeTasks(tasks);
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks).sort(task => task.isCompleted ? 1 : -1) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
