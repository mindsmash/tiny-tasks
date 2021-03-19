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

  create(name: string, duedate: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = {id: uuid(), name, duedate};
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
    const taskJson = JSON.parse(tasks); 
    taskJson.sort(comp);
    return taskJson;
    function comp(a, b) {
      if (a.duedate === null) {
          return 1;
       }
       else if (b.duedate === null) {
          return -1;
       }
       else{
          return new Date(a.duedate).getTime() - new Date(b.duedate).getTime();
       }
    } 
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
