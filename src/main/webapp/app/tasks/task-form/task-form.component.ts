import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';

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
export class TaskFormComponent implements OnInit {

  @Output() created: EventEmitter<Task> = new EventEmitter();

  taskForm: FormGroup;

  ngOnInit() {    
    this.taskForm = this.fb.group({
      name: ['', [Validators.required]],
      taskDate: null,
      taskTime: null    
    });
  }
  constructor(@Inject('TaskService') private taskService: TaskService,
              private fb: FormBuilder) { }

  onSubmit(formDirective:FormGroupDirective): void {
    this.taskService.create(this.taskForm.value.name,this.taskForm.value.taskDate,this.taskForm.value.taskTime)
      .subscribe(task => {
        this.created.emit(task);
        this.taskForm.reset();
        formDirective.resetForm();
    });
  }

}
