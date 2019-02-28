import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('taskNameInput',  { read: Input }) taskNameInput: Input;
  public taskNameControl: FormControl = new FormControl();
  tasks: Array<string> = [];

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(task: string): void {
    this.tasks.push(task);
  }

  submit(event: Event): void {
    this.add(this.taskNameControl.value);
    this.taskNameControl.reset();
    event.preventDefault();
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
