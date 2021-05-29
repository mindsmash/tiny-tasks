import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Status } from './enums';

import { Task, TaskList } from './task';
import { TaskService } from './task.service';

const INITIAL_DATA: TaskList[] = [
  {
    id: Status.TODO,
    name: 'To Do',
    data: [],
  },
  {
    id: Status.DONE,
    name: 'Done',
    data: [],
  }
];

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  private initialData = INITIAL_DATA;

  /**
   * Initialize data if data is not exist to local storage or data is wrong
   * set new empty data
   * @returns task list that have sorted by status.
   */
  init(): Observable<TaskList[]> {
    const taskList = this.readTasks();
    if (taskList.length && taskList[0].id === Status.TODO) {
      return of(taskList);
    } else {
      this.writeTasks(this.initialData);
      return of(this.readTasks());
    }
  }

  getAll(): Observable<TaskList[]> {
    return of(this.readTasks());
  }

  updateAll(tasksList: TaskList[]): Observable<TaskList[]> {
    this.writeTasks(tasksList);
    return of(this.readTasks());
  }

  create(name: string): Observable<Task> {
    const taskList = this.readTasks();
    const task = {id: uuid(), name};
    taskList[0].data.push(task);
    this.writeTasks(taskList);
    return of(task);
  }

  delete(id: string, statusIndex: number): Observable<void> {
    const taskList = this.readTasks();
    const index = taskList[statusIndex].data.findIndex(task => task.id === id);
    if (index !== -1) {
      taskList[statusIndex].data.splice(index, 1);
      this.writeTasks(taskList);
    }
    return of(null);
  }

  private readTasks(): TaskList[] {
    const taskList = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return taskList ? JSON.parse(taskList) : [];
  }

  private writeTasks(tasksList: TaskList[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasksList));
  }
}
