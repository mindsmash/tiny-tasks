import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Task } from '../../interfaces/task';
import { StorageService } from '../storage/storage.service';
import { TaskService } from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  constructor(
    private storageService: StorageService,
  ) {
  }
  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  public reloadTasks$: Subject<void> = new Subject<void>();

  getAll(userId: string): Observable<Task[]> {
    return of(this.readTasks());
  }

  create(name: string, creator: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = {id: uuid(), name, creator};
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
    const tasks = this.storageService.get(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    this.storageService.save(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
