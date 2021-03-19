import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// import moment from 'moment';
import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A form to create tiny tasks.
 */
import * as moment from 'moment';
@Component({
  selector: 'tiny-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {

  @Output() created: EventEmitter<Task> = new EventEmitter();
  today = new Date();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    duedate: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  onSubmit(): void {
    let duedate = moment(this.taskForm.value.duedate).format("DD MMM YYYY")
    if(duedate == "Invalid date"){
      duedate = null;
      }
      this.taskService.create(this.taskForm.value.name, duedate).subscribe(task => {
        this.created.emit(task);
        this.taskForm.reset();
      });
    }
  
}
