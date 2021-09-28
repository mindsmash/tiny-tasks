
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  getAll(search?:string): Observable<Task[]> {
    return of(this.readTasks(search));
  }

  create(name: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = {id: uuid(), name};
    tasks.push(task);
    LocalTaskService.writeTasks(tasks);
    return of(task);
  }

  update(id:string,name:string, dueDate:Date) : Observable<void> {
    const tasks = this.readTasks();
    const task = tasks.find(task => task.id === id);
    task!.dueDate = dueDate
    LocalTaskService.writeTasks(tasks);
    return of(void 0);
  }

  delete(id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      LocalTaskService.writeTasks(tasks);
    }
    return of(void 0);
  }

  private readTasks(search?:string): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    if(search && search!.length > 0){
      return tasks ? JSON.parse(tasks).filter((task:Task)=>{
        return task.name.toLowerCase().includes(search.toLowerCase())
      }).sort(function(a:Task,b:Task){
        return a.dueDate! > b.dueDate! ? 1:-1
      }): [];
    }
    return tasks ? JSON.parse(tasks).sort(function(a:Task,b:Task){
      return a.dueDate! > b.dueDate! ? -1:1
    }): [];
  }

   private static writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
