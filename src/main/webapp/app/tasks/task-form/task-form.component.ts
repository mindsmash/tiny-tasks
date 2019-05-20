import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { CategoryService } from '../category.service';
import { Category } from '../category';

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

  @Output() createdCategory: EventEmitter<Category> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService, @Inject('CategoryService') private categoryService: CategoryService) { }

  onSubmit(): void {
    this.taskService.create(this.taskForm.value.name).subscribe(task => {
      this.created.emit(task);
      this.taskForm.reset();
    });
  }

  onCreateCategory(): void {
    this.categoryService.create(this.categoryForm.value.name).subscribe(task => {
      this.createdCategory.emit(task);
      this.categoryForm.reset();
    });
  }
}
