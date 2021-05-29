import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { StatusFormComponent } from './status-form/status-form.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, StatusFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    DragDropModule,
    SharedModule
  ],
  exports: [TaskFormComponent, TaskListComponent, StatusFormComponent]
})
export class TasksModule { }
