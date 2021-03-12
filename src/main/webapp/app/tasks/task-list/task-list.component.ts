import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isWeb$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  dialogRef: MatDialogRef<TaskFormDialogComponent> | undefined;
  updateTaskSubscription: Subscription;

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() updated: EventEmitter<Task> = new EventEmitter();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private matDialog: MatDialog,
    @Inject('TaskService') private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon('desert', this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/desert.svg"));
  }

  ngOnDestroy(): void {
    this.updateTaskSubscription?.unsubscribe();
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  openTaskFormDialog(task: Task) {
    const subscription = combineLatest([this.isHandset$, this.isWeb$]).subscribe(info => {
      const isHandset = info[0];
      const isWeb = info[1];
      let width, height;

      if (isHandset) {
        height = '100%';
        width = '100%';
      } else if (isWeb) {
        height = undefined;
        width = undefined;
      }

      if (this.dialogRef) {
        this.dialogRef.updateSize(width, height);
        if (isHandset) {
          this.dialogRef.addPanelClass('full-screen-dialog');
        } else {
          this.dialogRef.removePanelClass('full-screen-dialog');
        }
      } else {
        this.dialogRef = this.matDialog.open(TaskFormDialogComponent, {
          disableClose: true,
          ariaLabel: 'Edit the task',
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: height,
          width: width,
          panelClass: ['relatively-positioned-dialog', isHandset ? 'full-screen-dialog' : ''],
          data: {
            task: task
          }
        });
      }
      this.dialogRef.afterClosed().toPromise().then(updatedTask => {
        this.dialogRef = undefined;
        subscription.unsubscribe();
        if (updatedTask) {
          this.updated.emit(updatedTask);
        }
      });
    });
  }
}
