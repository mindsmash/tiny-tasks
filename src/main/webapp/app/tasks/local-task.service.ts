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

  getTasksNotDone(): Observable<Task[]> {
    const tasks = this.readTasks();
    const tasksNotDone = tasks.filter(task => !task.done);
    return of(tasksNotDone);
  }

  getTasksDone(): Observable<Task[]> {
    const tasks = this.readTasks();
    const tasksDone = tasks.filter(task => task.done);
    return of(tasksDone);
  }

  create(name: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = {id: uuid(), name, done: false};
    tasks.push(task);
    this.writeTasks(tasks);
    return of(task);
  }

  update(tasks: Task[]): Observable<void> {
    this.writeTasks(tasks);
    return of(null);
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

  deleteAllDone(): Observable<void> {
    const tasksNotDone = this.readTasks().filter(task => !task.done);
    this.writeTasks(tasksNotDone);
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
