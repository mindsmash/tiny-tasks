import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('taskNameInput') taskNameInput: ElementRef<HTMLInputElement>;
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
    this.taskNameInput.nativeElement.blur();
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
