import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnDestroy {
  _tasks;
  @Input() set tasks(value) {
    this._tasks = value;
  }

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() updated: EventEmitter<Task> = new EventEmitter();
  @Output() filtered: EventEmitter<string> = new EventEmitter();

  searchText: string = '';

  searchName = new FormControl();

  filteredTasks: Task[];

  unsubscribe$ = new Subject();

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.searchName.valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$))
      .subscribe((searchText) => {
        this.filtered.emit(searchText);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(
      () => {
        this.deleted.emit(task);
        this.snackBar.open(`Task ${task.name} deleted!`);
      },
      (error) => {
        this.snackBar.open(`Deleting ${task.name} failed!`);
      }
    );
  }

  toggleStatus(task: Task) {
    task.done = !task.done;
    this.taskService.update(task).subscribe(
      () => {
        this.updated.emit();
        this.snackBar.open(`Task ${task.name} updated!`);
      },
      (error) => {
        this.snackBar.open(`Task ${task.name} update failed!`);
      }
    );
  }

  deleteAllDone() {
    const doneTasks = this._tasks.filter((task) => task.done);
    forkJoin(
      doneTasks.map((task) => {
        return this.taskService.delete(task.id);
      })
    ).subscribe(
      (result) => {
        this.deleted.emit();
        this.snackBar.open('All done tasks deleted!');
      },
      (error) => {
        this.snackBar.open('Batch delete failed!');
      }
    );
  }

  get hasNoTaskDone() {
    return this._tasks?.filter((task) => task.done).length === 0;
  }

  highlight(text: string) {
    if (!this.searchName.value) {
      return text;
    }
    return text.replace(new RegExp(this.searchName.value, 'gi'), (match) => {
      return '<span class="highlightText">' + match + '</span>';
    });
  }
}
