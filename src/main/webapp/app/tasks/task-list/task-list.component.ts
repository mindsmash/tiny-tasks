import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StatusDialogComponent } from '../../components/status-dialog/status-dialog.component';
import { Status } from '../../shared/status';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnChanges {
  @Input() tasks: Task[] | null = null;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() refresh: EventEmitter<string> = new EventEmitter();

  public searchInput = new FormControl('');

  public hasDoneTasks: boolean = false;

  constructor(
    @Inject('TaskService') public taskService: TaskService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const query = params['query'];

      if (query) {
        this.searchInput.setValue(query);
      }
    });

    this.searchInput.valueChanges.subscribe(() => {
      this.refreshTasks();
    });
  }

  public ngOnChanges(): void {
    this.hasDoneTasks = !!this.tasks?.some(
      (task) => task.status === Status.DONE
    );
  }

  public delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  public refreshTasks(): void {
    if (!!this.searchInput.value) {
      this.search.emit(this.searchInput.value);
    } else {
      this.refresh.emit();
    }
  }

  public openDialog(task: Task): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '350px',
      height: '375px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result?: Task) => {
      if (result) {
        this.updateTask(result);
      }
    });
  }

  public updateTask(task: Task): void {
    this.taskService.update(task).subscribe(() => {
      this.refreshTasks();
    });
  }

  public clearDoneTasks(): void {
    this.taskService.clearDoneTasks().subscribe(() => {
      this.refreshTasks();
    });
  }
}
