import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  getAll(): Observable<Task[]> {
    const tasks = this.readTasks();
    tasks.sort(task => {
      return task.completed ? 1 : -1
    });

    return of(tasks);
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
    return of(void 0);
  }

  toggleCompletion(task: Task): Observable<void> {
    const tasks = this.readTasks();
    const currentTask = tasks.find(result => result.id === task.id);

    if (currentTask) {
      currentTask.completed = !currentTask.completed;
      this.writeTasks(tasks);
    }
    return of(void 0);
  }

  clearCompletedTasks(): Observable<void> {
    const tasks = this.readTasks();
    const remainingTasks = tasks.filter(task => {
      return !task.completed
    });
    this.writeTasks(remainingTasks);

    return of(void 0);
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
