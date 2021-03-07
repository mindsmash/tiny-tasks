import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './task';
import { TaskService } from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  /**
   * Returns all tasks added by users from local storage
   */
  getAll(): Observable<Task[]> {
    return of(this.readTasks());
  }

  /**
   * Adds a new task to local storage with given name
   * @param name name of the task
   */
  create(name: string): Observable<Task> {
    const tasks: Array<Task> = this.readTasks();
    const task: Task = { id: uuid(), name, status: TaskStatus.New};
    tasks.push(task);
    this.writeTasks(tasks);
    return of(task);
  }

  /**
   * Deletes task from local storage list of a given id
   * @param id identifier of the task that needs to be deleted
   */
  delete(id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.writeTasks(tasks);
    }
    return of(null);
  }

  /**
   * Updates status of the given task to the passed value
   * @param id identifier of the task of which status needs to be updated
   * @param status type of status which needs to be updated for the task
   */
  changeStatus(id: string, status: TaskStatus): Observable<void> {
    let tasks: Array<Task> = this.readTasks();
    tasks = tasks.map(task => task.id === id ? {...task, status: status} : task);
    this.writeTasks(tasks);
    return of(null);
  }

  deleteAllTasks(): Observable<void> {
    const tasks: Array<Task> = this.readTasks().filter(task => task.status !== TaskStatus.Done);
    this.writeTasks(tasks);
    return of(null);
  }

  /**
   * Reads all task from local storage and parse to json
   */
  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  /**
   * Writes list of tasks to local storage with defined storage key
   * @param tasks tasks that needs to be updated in local storage
   */
  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
