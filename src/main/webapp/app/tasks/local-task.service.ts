import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { v4 as uuid } from "uuid";

import { Task } from "./task";
import { TaskService } from "./task.service";
import { sortTasksByStatus } from "./utils";

@Injectable()
export class LocalTaskService implements TaskService {
  private static readonly STORAGE_KEY: string = "tiny.tasks";

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

  update(task: Task): Observable<Task> {
    const tasks = this.readTasks();
    const index = tasks.findIndex((t) => t.id == task.id);
    if (index !== -1) {
      tasks.splice(index, 1, task);
      this.writeTasks(tasks);
      return of(task);
    }
    return of(null);
  }

  delete(id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.writeTasks(tasks);
    }
    return of(null);
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? sortTasksByStatus(JSON.parse(tasks)) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
