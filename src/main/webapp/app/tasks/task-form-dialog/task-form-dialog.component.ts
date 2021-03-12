import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Task } from '../task';
import { CancellationApprovalBottomSheetComponent } from 'app/cancellation-approval-bottom-sheet/cancellation-approval-bottom-sheet.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'tiny-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss']
})
export class TaskFormDialogComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isLoading = false;
  form: FormGroup = new FormGroup({
    id: new FormControl(this.data.task.id),
    name: new FormControl(this.data.task.name, Validators.required),
    dueDate: new FormControl(this.data.task.dueDate)
  });
  taskSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private bottomSheet: MatBottomSheet,
    private breakpointObserver: BreakpointObserver,
    private dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject('TaskService') private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
  }

  openCancellationApproval() {
    if (this.form.pristine) {
      this.dialogRef.close();
      return;
    }
    this.bottomSheet.open(CancellationApprovalBottomSheetComponent).afterDismissed().toPromise().then(areChangesDiscarded => {
      if (areChangesDiscarded) {
        this.dialogRef.close();
      }
    });
  }

  submit() {
    if (!this.form.valid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    let newTask$: Observable<Task>;
    if (this.data.task.id) {
      newTask$ = this.taskService.update(this.form.value);
    } else {
      // create functionality
    }

    this.taskSubscription = newTask$.subscribe(task => {
      this.isLoading = false;
      if (this.dialogRef?.close) {
        this.dialogRef.close(task);
      }
    }, error => {
      this.isLoading = false
    });
  }
}
