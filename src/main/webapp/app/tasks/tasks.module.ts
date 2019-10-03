import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';

import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, TaskDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatListModule
  ],
  exports: [TaskFormComponent, TaskListComponent, TaskDialogComponent],
  entryComponents: [TaskDialogComponent]
})
export class TasksModule { }
