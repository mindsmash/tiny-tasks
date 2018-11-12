import { Component } from '@angular/core';
import {Task} from "./task";

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tasks: Array<Task> = [];

  constructor() {
  }

  onAddTask(text: string) {
    this.tasks.push(new Task({
      text: text,
      complete: false
    }));
    return this;
  }

  onToggleTaskComplete(task) {
    let index = this.tasks.indexOf(task);
    task.complete = !task.complete;
    this.tasks[index] = task;

  }

  onRemoveTask(task) {
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }

  clear() {
    this.tasks.splice(0);
  }
}
