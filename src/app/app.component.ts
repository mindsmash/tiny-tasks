import { Component } from '@angular/core';
import { Task } from './task'
import { TaskState } from './task-state.enum';
@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  tasks: Array<Task> = [];
  selectedDate: Date = new Date();
  dateTimepickerSettings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy HH:mm',
    defaultOpen: false
  }

  add(description: string, dueDate: Date) {
    this.tasks.push(new Task(description, TaskState.TODO, dueDate));
  }
  //does not seem to work in the current version of firefox
  remove(index: number) {
    this.tasks.splice(index, 1);
  }

  clear() {
    this.tasks.splice(0);
  }
}
