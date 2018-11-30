import { Component } from '@angular/core';

interface Task {
  description: string;
  isDone: boolean;
}

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tasks: Array<Task> = [];

  add(description: string) {
    this.tasks.push({ description, isDone: false });
  }

  toggle(index: number) {
    const currentTask = this.tasks[index];
    this.tasks.splice(index, 1, { ...currentTask, isDone: !currentTask.isDone });
  }

  remove(index: number) {
    this.tasks.splice(index, 1);
  }

  clear() {
    this.tasks.splice(0);
  }
}
