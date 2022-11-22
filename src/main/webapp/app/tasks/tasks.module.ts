import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskStatusDialogComponent } from './task-status-dialog/task-status-dialog.component';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, TaskStatusDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    DragDropModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [TaskFormComponent, TaskListComponent]
})
export class TasksModule {}
