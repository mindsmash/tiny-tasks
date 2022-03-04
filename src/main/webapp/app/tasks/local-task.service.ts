import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {v4 as uuid} from 'uuid';

import {Task} from './task';
import {TaskService} from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  getAll(): Observable<Task[]> {
    const tasks = this.readTasks();
    tasks.sort((task: Task) => task.isDone ? -1 : 1)
    return of(tasks);
  }

  create(name: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = {id: uuid(), name};
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

  markAsDone(id: string): Observable<Task> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index].isDone = true;
      this.writeTasks(tasks)
      return of(tasks[index]);
    } else {
      return throwError("404");
    }
  }

  clearDone(): Observable<Task[]> {
    const tasks = this.readTasks();
    const tasksNotDone = tasks.filter(task => !task.isDone);
    this.writeTasks(tasksNotDone);
    return of(tasksNotDone);
  }


  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
