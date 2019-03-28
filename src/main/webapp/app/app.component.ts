import { Component } from '@angular/core';
import { Task } from './task.model';
import { Sort } from '@angular/material';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tasks: Array<Task> = [];
  search: string;

  /**
   * Adds a new task to the list of tasks.
   *
   * @param taskName the task's name
   */
  add(taskName: string): void {
    this.tasks.push(new Task(taskName));
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  remove(index: number): void {
    this.tasks.splice(index, 1);
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.tasks.splice(0);
  }
}