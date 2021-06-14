import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  @Output() updated: EventEmitter<Task> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  onSubmit(name: string, done: false): void {
    this.taskService.create(this.taskForm.value.name, this.taskForm.value.done, this.taskForm.value.dueDate).subscribe(task => {
      this.created.emit(task);
      this.taskForm.reset();
    });
  }

  onCheck():void{
    this.taskService.update(this.taskForm.value.id, this.taskForm.value.done).subscribe(task =>{
      // @ts-ignore
      this.updated.emit(task);
      this.taskForm.reset();
    })
  }

}
