import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {v4 as uuid} from 'uuid';

import {Task} from './task';
import {TaskService} from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  getAll(): Observable<Task[]> {
    return of(this.readTasks());
  }

  create(name: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = {id: uuid(), name, done: false};
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

  markAsDone(id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(task => task.id === id);

    if (index !== -1) {
      const task = tasks[index];
      task.done = true;
      this.writeTasks(tasks);
    }
    return of(null);
  }

  deleteAllDone(): Observable<void> {
    const tasks = this.readTasks();
    if (tasks && tasks.length) {

      for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].done) {
          tasks.splice(index--, 1);
        }
      }
      this.writeTasks(tasks);
    }
    return of(null);
  }

  private readTasks(): Task[] {
    const tasks: string = localStorage.getItem(LocalTaskService.STORAGE_KEY);

    const arr: Array<Task> = tasks ? JSON.parse(tasks) : [];

    arr.sort((taskA: Task, taskB: Task): number => {
      if (taskA.done && !taskB.done) {
        return 1
      }
      if (!taskA.done && taskB.done) {
        return -1
      }

      return 0;
    });

    return arr;
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
