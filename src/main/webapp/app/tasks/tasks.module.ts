import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDatepickerModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule } from '@angular/material';
import { OrderByPresencePipe } from './order-by-presence.pipe';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, OrderByPresencePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [TaskFormComponent, TaskListComponent]
})
export class TasksModule { }
