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
    const task = {id: uuid(), name, completed: false};
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

  updateStatus(id: string, status: boolean): Observable<Task> {
    const tasks = this.readTasks();
    const selected = tasks.filter(task => task.id === id)[0];
    if (selected) {
      selected.completed = status;
      this.writeTasks(tasks);
    }
    return of(null);
  }

  clearCompleted(completedTasks: Task[]): Observable<Task> {
    if (completedTasks) {
      completedTasks.map((item) => {
        this.delete(item.id);
      });
    }
    return of(null);
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    tasks.sort(task => task.completed ? 1 : -1);
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
