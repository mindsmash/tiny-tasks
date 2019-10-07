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
    const task = {id: uuid(), name, isDone: false};
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

  update(task: Task, id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(taskItem => taskItem.id === id);
    if (index !== -1) {
      tasks.splice(index, 1, task);
      this.writeTasks(tasks);
      this.getAll();
    }
    return of(null);
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    tasks.sort(this.sortTasks);
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }

  /*
    Compare method for the tasks array to sort the array items by 'isDone' boolean property.
    Setting array elements with isDone boolean value of 'false' first and array elements with truthy values below.
  */
  private sortTasks(a, b) {
    console.log('sortTasks: ');
    return (a.isDone === b.isDone) ? 0 : a.isDone ? 1 : -1;
  }
}
