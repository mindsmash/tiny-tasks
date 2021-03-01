import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output,  SimpleChanges } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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
export class TaskListComponent implements OnChanges {

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() checkedDone: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges) {
    // I've chosen to sort the tasks in component due to there's warning to sort it by pipe.
    if (changes['tasks'].currentValue) {
      this.tasks.sort((a , b) => a.isDone ? 1 : -1);
    }
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  checkingDone(event: MatSlideToggleChange, index: number, tasks: Task[]) {
    tasks[index] = { ...tasks[index] , isDone: event.checked};
    this.taskService.update(tasks[index].id , tasks[index]).subscribe(() => {
      this.checkedDone.emit(tasks[index]);
    });
  }

  clearAllDoneTasks() {
    this.tasks.filter(task => task.isDone).forEach(task => {
      this.taskService.delete(task.id).subscribe(() => {
        this.deleted.emit(task);
      });
    });
  }
}
