import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A form to create tiny tasks.
 */
@Component({
  selector: 'tiny-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {

  @Output() created: EventEmitter<Task> = new EventEmitter();
  @Output() searched: EventEmitter<string> = new EventEmitter();
  @Output() clearedSearch: EventEmitter<void> = new EventEmitter();
  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    searchTxt: new FormControl('')

  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  onSubmit(): void {
    if (!isNullOrUndefined(this.taskForm.value.name) && this.taskForm.value.name.length)
    this.taskService.create(this.taskForm.value.name).subscribe(task => {
      this.created.emit(task);
      this.taskForm.controls["name"].setValue('');
    });
  }
  clear(): void {
    this.taskForm.controls["searchTxt"].setValue('');
    this.clearedSearch.emit();
  }
  onSearch(): void {
    let txt: string = this.taskForm.value.searchTxt;
    this.searched.emit(txt);
  }
}
