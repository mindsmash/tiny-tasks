import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { TaskClearComponent } from './task-clear/task-clear.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskSelectStatusComponent } from './task-select-status/task-select-status.component';

@NgModule({
  declarations: [TaskClearComponent, TaskFormComponent, TaskListComponent, TaskSelectStatusComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule
  ],
  exports: [TaskClearComponent, TaskFormComponent, TaskListComponent, TaskSelectStatusComponent]
})
export class TasksModule {}
