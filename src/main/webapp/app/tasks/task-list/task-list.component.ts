import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';

import {Task} from '../task';
import {TaskService} from '../task.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ToastrService} from "ngx-toastr";


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

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  taskStatus: string;

  todoList: Task[];
  inProgressList: Task[];
  blockedList: Task[];
  doneList: Task[];

  constructor(@Inject('TaskService') private taskService: TaskService,private toastr: ToastrService) {
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    }, error1 => {
      setTimeout(() => this.toastr.success(error1.error.body))
    });
  }

  changeStatus(task: Task) {
    this.taskService.changeStatus(task).subscribe(() => {
      task.taskStatus = task.taskStatus;
    });
  }


  ngOnChanges(): void {
    if (this.tasks != null) {
      this.todoList = this.tasks.filter(task => task.taskStatus == 'TODO');
      this.inProgressList = this.tasks.filter(task => task.taskStatus == 'IN_PROGRESS');
      this.blockedList = this.tasks.filter(task => task.taskStatus == 'BLOCKED');
      this.doneList = this.tasks.filter(task => task.taskStatus == 'DONE');
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      let taskString: string;
      taskString = JSON.stringify(event.container.data[event.currentIndex]);
      let task: Task = JSON.parse(taskString);
      task.taskStatus = event.container.id.toUpperCase();
      this.changeStatus(task);
    }
  }

  deleteAllTasksDone() {
    this.taskService.deleteAllTasksDone().subscribe((res) =>{
      this.tasks.filter( task => task.taskStatus!='DONE');
    }, error1 => {
      setTimeout(() => this.toastr.success(error1.error.body))
    });
    this.doneList=[];
  }
}
