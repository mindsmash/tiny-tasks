import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskState } from 'src/main/webapp/app/enum/task-state.enum';
import { v4 as uuid } from 'uuid';

import { Task } from '../model/task';
import { TaskService } from './task.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  getAll(): Observable<Task[]> {
    return of(this.readTasks());
  }

  create(name: string, state?: TaskState): Observable<Task> {
    const tasks = this.readTasks();
    const task = { id: uuid(), name, state };
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

  update(task: Task): Observable<Task> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
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
