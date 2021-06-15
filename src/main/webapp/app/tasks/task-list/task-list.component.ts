import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

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
export class TaskListComponent {

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() updated: EventEmitter<Task> = new EventEmitter();
  @Output() donesky: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }
  // update():void{
  //   this.taskService.update(
  //     this.taskForm.value.id,
  //     this.taskForm.value.done,
  //     this.taskForm.value.name,
  //     this.taskForm.value.dueDate).subscribe(task =>{
  //     // @ts-ignore
  //     this.updated.emit(task);
  //     this.taskForm.reset();
  //   })
  // }

  update(task: Task): void {
    this.taskService.update(task.id,task.done,task.name, task.dueDate, ).subscribe(()=>{
      this.updated.emit(task);
    })
  }

  // done(task: Task): void {
  //   this.taskService.done(task.id,task.done, task.name).subscribe(()=>{
  //     this.donesky.emit(task);
  //   })
  // }

  onCheck(task: Task) {

  }
}
