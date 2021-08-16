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

  create(name: string, status: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = {id: uuid(), name, status};
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
  editTask(task: Task): any {
    const tasks = this.readTasks();
    const item = tasks.find(x => x.id === task.id);
    if (item){
      item.status = 'done';
    }
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
    this.sortTasks();
  }

  sortTasks(): any{
    const tasks =  this.readTasks();
    tasks.sort((a, b) => {
      if (a.status === 'done') { return 1; }
      else  if (a.status === 'uncompleted'){
        return -1;
      }else{
        return 0;
      }
    });
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }

  clearDoneTasks(): any{
    const items = this.readTasks();
    const uncompleted = items.filter(x => x.status === 'uncompleted');
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(uncompleted));

  }

}
