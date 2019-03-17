import {Task} from '../model/task.model';
import { Injectable } from '@angular/core';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';

@Injectable()
export class TaskService {
  tasks: Array<Task>;

  constructor() {
    this.getAll();
  }

  public numberOfCompleted() {
    return this.tasks.length === this.getCompleted.length;
  }

  public completeAll(completed: Boolean) {
    this.tasks.forEach((task: Task) => task.completed = completed);
    this.updateList();
  }

  public removeCompleted() {
    this.tasks = this.getCompleted(false);
    this.updateList();
  }

  public getCompletedList() {
    return this.getCompleted(true);
  }

  public getRemainingList() {
    return this.getCompleted(false);
  }

  public setCompleted(task: Task) {
    task.completed = !task.completed;
    this.updateList();
  }

  public removeTask(task: Task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
    this.updateList();
  }

  public addTask(value: string, priority: number) {
    this.tasks.push(new Task(value, priority));
    this.updateList();
  }

  public update(task: Task, newValue: string) {
    this.removeTask(task);
    let tempTask = task;
    this.addTask(newValue, tempTask.priority);
  }

  public clearTasks() {
    this.tasks.splice(0);
    this.updateList();
  }

  public getAll(){
    let persistedList = JSON.parse(localStorage.getItem('tinyTask') || '[]');
    this.tasks = persistedList.map((task: { value: string, completed: Boolean, priority: number }) => {
      let val = new Task(task.value, task.priority);
      val.completed = task.completed;
      return val;
    });
    return this.tasks;
  }

  public sort(order: boolean) {
    //order desc
    if(order){
      return this.tasks.sort((a,b) => a.priority - b.priority);
    } else {
      return this.tasks.sort((a,b) => b.priority - a.priority);
    }
    
  }

  private updateList() {
    localStorage.setItem('tinyTask', JSON.stringify(this.tasks));
  }

  private getCompleted(completed: Boolean) {
    return this.tasks.filter((task: Task) => task.completed === completed);
  }
  
}
