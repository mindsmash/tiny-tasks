import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isNullOrUndefined } from 'util';
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
    const task = { id: uuid(), name };
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

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }

  readTasksByNameAndId(txt: string): Observable<Task[]> {
    let filtered = this.readTasks();
    if (!isNullOrUndefined(txt) && txt.length && filtered.length) {
      filtered = filtered.filter(f => f.name.toLowerCase().includes(txt.toLowerCase()) || f.id.toLowerCase().includes(txt.toLowerCase()));
    }
    return of(filtered);
  }

}
