import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Task, Status } from './task';
import { TaskService } from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';
  /**
   * getAll reads the sorted tasks
   */
  getAll(): Observable<Task[]> {
    return of(this.sort(this.readTasks()));
  }
  /**
   * sort takes the tasks and sorts the tasks where the todo tasks is before the done tasks
   * @param tasks {Task[]}
   */
  sort(tasks: Task[]): Task[] {
    return tasks.sort((task1, task2) => (task1.checked && !task2.checked) ? 1 : -1)
  }
  /**
   * creates the task with its properties
   * @param name {string}
   */
  create(name: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = { id: uuid(), name, checked: false, status: Status.none };
    tasks.push(task);
    this.writeTasks(tasks);
    return of(task);
  }
  /**
   * deletes the task with selected id
   * @param id {string}
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
   * marks task as done by toggling the checked property in the task
   * @param id {string}
   */
  markAsDone(id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index].checked = !tasks[index].checked;
      this.writeTasks(tasks);
    }
    return of(null);
  }
  /**
   * deletes all the tasks where checked is true
   */
  deleteAll(): Observable<void> {
    let tasks = this.readTasks();
    tasks = tasks.filter(task => !task.checked);
    this.writeTasks(tasks);

    return of(null);
  }
  /**
   * updates the status of the task
   * @param task {Task}
   */
  update(task: Task): Observable<Task[]> {
    let tasks = this.readTasks();
    tasks = tasks.map(element => {
      if (element.id == task.id) {
        return task
      }
      return element;
    });
    this.writeTasks(tasks);

    return of(tasks);
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }

}
