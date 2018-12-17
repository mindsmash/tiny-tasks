import { Component } from '@angular/core';
import {Task} from './shared/task.model';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tasks: Array<Task> = [];

  add(taskName: string) {
    if (taskName.length > 0) {
      this.tasks.push(new Task(taskName, false));
    }
  }

  remove(index: number) {
    this.tasks.splice(index, 1);
  }

  clear() {
    this.tasks.splice(0);
  }

  toggleDone(index: number) {
    this.tasks[index].done = !this.tasks[index].done;
  }
}
