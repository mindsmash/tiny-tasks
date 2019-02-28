import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskStorageService } from './task-storage.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public taskNameControl: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2)]);
  @ViewChild('taskNameInput') public taskNameInput: ElementRef<HTMLInputElement>;

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
    this.taskNameControl.setErrors(null);
    event.preventDefault();
  }
}
