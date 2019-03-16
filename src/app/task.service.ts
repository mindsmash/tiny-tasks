import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: string[];
  
  constructor() { 
    this._tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  add(task: string): void {
    this._tasks.push(task);
    this.save();
  }

  remove(task: number): void {
    this._tasks.splice(task, 1);
    this.save();
  }

  clear(): void {
    this._tasks = [];
    this.save();
  }

  public get tasks(): string[] {
    return this._tasks;
  }

  private save(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  
}
