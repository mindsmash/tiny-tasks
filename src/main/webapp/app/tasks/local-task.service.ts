import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { v4 as uuid } from "uuid";

import { Task } from "./task";
import { TaskService } from "./task.service";

@Injectable()
export class LocalTaskService implements TaskService {
  private static readonly STORAGE_KEY: string = "tiny.tasks";

  getAll(): Observable<Task[]> {
    return of(this.readTasks());
  }

  create(name: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = { id: uuid(), name, status: "Started" };
    tasks.push(task);
    tasks.sort((a, b) => (a.status < b.status ? 1 : -1));
    this.writeTasks(tasks);
    return of(task);
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

  toggleStatus(id: string): Observable<void> {
    const tasks = this.readTasks();
    tasks.forEach((task) =>
      task.id === id
        ? task.status === "Started"
          ? (task.status = "Done")
          : (task.status = "Started")
        : null
    );
    tasks.sort((a, b) => (a.status < b.status ? 1 : -1));
    this.writeTasks(tasks);
    return of(null);
  }

  clearDone(): Observable<void> {
    const tasks = this.readTasks().filter((task) => task.status !== "Done");
    this.writeTasks(tasks);
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
