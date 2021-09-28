import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Common } from '../../Utility/common';
import { TaskDueDateDialogComponent } from '../dialog/task-due-date-dialog/task-due-date-dialog.component';
import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] | null = null;
  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() updated: EventEmitter<Task> = new EventEmitter();
  @ViewChild('picker') picker: any;
  public disabled = true;
  public dateSelected = ""
  public timeSelected = ""
  public disabledDateTime = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: Date = new Date();
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  
  constructor(@Inject('TaskService') private taskService: TaskService,
   public dialog: MatDialog) {
  }

  ngOnInit() {
    this.minDate = Common.setMinDate()
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

 
  getObject(task: Task) {
    return !!task.dueDate;
  }

  addEvent(event: any, task:Task) {
    this.taskService.update(task.id,task.name,event.value._d).subscribe(()=>{
      this.updated.emit(task)
    })
  }

  /**
 * This will open a calandar in pop up
 */
  openCalander(task: Task): void {
    const dialogRef = this.dialog.open(TaskDueDateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == true){
        this.taskService.update(task.id,task.name,result.data._d).subscribe(()=>{
          this.updated.emit(task)
        })

      }
    });
  }
}

