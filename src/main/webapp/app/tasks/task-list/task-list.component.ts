import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

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
export class TaskListComponent implements OnDestroy {

  @Input() tasks: Task[];
  @Input() statusIndex: number;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  private unsubscribe$ = new Subject<boolean>();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  /**
   * delete a task.
   * @param task task data
   */
  delete(task: Task): void {
    this.taskService.delete(task.id, this.statusIndex).pipe(
      takeUntil(this.unsubscribe$),
      take(1),
    ).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  /**
   * TrackBy to increase performance
   * @param index item index number
   * @returns item index number
   */
  trackByFn(index: number): number {
    return index;
  }
}
