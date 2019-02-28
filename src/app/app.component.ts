import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskStorageService } from './task-storage.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('taskNameInput') public taskNameInput: ElementRef<HTMLInputElement>;
  public taskNameControl: FormControl = new FormControl();

  constructor(
    public taskStorage: TaskStorageService,
  ) {}

  /**
   * Takes the submit event, adds the Task and prevents reload.
   * @param event forms submit event
   */
  public submit(event: Event): void {
    this.taskStorage.add(this.taskNameControl.value);
    this.taskNameControl.reset();
    this.taskNameInput.nativeElement.blur();
    event.preventDefault();
  }
}
