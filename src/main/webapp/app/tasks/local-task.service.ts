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
    tasks.unshift(task);
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

  setDoneStatus(task: Task): Observable<Task> {
    const tasks = this.readTasks();
    const taskToUpdate = tasks.find(
      (taskOfTasks) => taskOfTasks.id === task.id
    );
    if (taskToUpdate !== null) {
      taskToUpdate.isDone = task.isDone;
      if(task.isDone) {
        tasks.push(tasks.splice(tasks.indexOf(taskToUpdate), 1)[0]);
      } else {
        tasks.unshift(tasks.splice(tasks.indexOf(taskToUpdate), 1)[0]);
      }
      this.writeTasks(tasks);
    }
    return of(task);
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
