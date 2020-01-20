import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  private searchTerm = new Subject<string>();

  searchTerm$ = this.searchTerm.asObservable();

  getAll(): Observable<Task[]> {
    return of(this.readTasks());
  }

  sendSearchTerm(search: string) {
    this.searchTerm.next(search);
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
