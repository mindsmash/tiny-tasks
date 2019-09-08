import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ITask} from "app/models/Task";

/**
 * A form to create tiny tasks.
 */
@Component({
  selector: 'tiny-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnChanges {

  @Output() updated: EventEmitter<Task> = new EventEmitter();

  task: any;
  showFinish: boolean;

  taskUpdateForm: FormGroup = new FormGroup({
    status: new FormControl('DONE')
  });

  constructor(@Inject('TaskService') private taskService: TaskService, public dialogRef: MatDialogRef<TaskItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ITask) {
    this.task = data;
    this.showFinish = false;
  }

  onNoClick(): void {
    this.dialogRef.close(this.task);
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log('log', changes);
  }

  setStatus(event) {
    console.log(event);
    this.task.status = (event === true) ? 'DONE' : 'PENDING';
  }

  update(){
    console.log(this.task);
    this.taskService.update(this.task.id, this.task.name, this.task.status).subscribe(
      task => {
                this.updated.emit(task);
                this.taskUpdateForm.reset();
                this.onNoClick();
              },
      error => console.log(error)
    );
  }
}

