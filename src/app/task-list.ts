import { Task } from './task';

export class TaskList {
  tasks: Task[];

  constructor() { this.tasks = []; }

  public addTask(description) {
    this.tasks.push({description} as Task);
  }

  public removeTask(taskIndex: number) {
    this.tasks.splice(taskIndex, 1);
  }

  public clearTasks() {
    this.tasks = [];
  }

  public moveTaskTo(targetTaskList: TaskList, taskIndex: number) {
    targetTaskList.tasks.push(this.tasks[taskIndex]);
    this.removeTask(taskIndex);
  }
}
