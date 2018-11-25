import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Array<Task> = [];
  tasksDone: Array<Task> = [];

  constructor() { }

  getTasks(): Task[] {
    return this.tasks;
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  getTasksDone(): Task[] {
    return this.tasksDone;
  }

  setTasksDone(tasksDone: Task[]) {
    this.tasksDone = tasksDone;
  }
}
