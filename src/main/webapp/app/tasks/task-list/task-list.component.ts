import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import {TaskItemComponent} from "app/tasks/task-item/task-item.component";
import { MatDialog } from '@angular/material/dialog';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnChanges {

  @Input() tasks: Task[];

  @Output() updated: EventEmitter<Task> = new EventEmitter();
  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  name: string;
  status: string;
  isFinished: boolean;
  updatedTasks: {}[];
  updatedTask: {id: string, name: string, status: string};

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl('PENDING')
  });

  constructor(@Inject('TaskService') private taskService: TaskService, public dialog: MatDialog) {
    this.name = '';
    this.status = '';
    this.isFinished = false;
    this.updatedTasks = this.tasks;
    this.updatedTask = {id: '', name: '', status: ''};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.tasks){
      this.sortTasks();
    }
  }

  /**
   * Opening a dialog to edit task
   * @param task
   */
   openDialog(task): void {
    console.log(task.name, task.status);
    const dialogRef = this.dialog.open(TaskItemComponent, {
      width: '250px',
      data: {id: task.id, name: task.name, status: task.status}
    });

     /**
      * Triggers popup closing
      */
     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.isFinished = (result.status === 'DONE');
      this.updatedTask = result;
      this.handleUpdatedTask(result);
      this.updated.emit(result);
    });
  }

  /**
   * Update the list of tasks to apply the changes
   * @param task
   */
  handleUpdatedTask(task){
    console.log('handler', task, this.tasks);
    if(this.tasks.length > 0) {
      this.tasks.forEach((item) => {
        if(task.id === item.id){
          item.status = task.status;
        }
      });
    }
    console.log('final', this.tasks);
  }

  /**
   * Sort Tasks According to status
   */
  sortTasks(){
    let sortedTasks = [];
    if(this.tasks){
      let done = this.tasks.filter((item) => item.status === "DONE");
      let pending = this.tasks.filter((item) => item.status === "PENDING");
      sortedTasks = [...pending, ...done];
      this.tasks = sortedTasks;
    }
  }

  /**
   * Update task
   */
  update(): void {
    let task = this.updatedTask;
    if(this.updatedTask){
      this.taskService.update(task.id, task.name, task.status).subscribe(() => {
        this.updated.emit(task);
      });
    }
  }

  /**
   * Delete task
   * @param task
   */
  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }
}

