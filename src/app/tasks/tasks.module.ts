import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import {
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatListModule,
  MatInputModule,
  MatCardModule,
  MatBadgeModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent,
    DialogAddTaskComponent,
    ListTasksComponent,
  ],
  entryComponents: [
    DialogAddTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    TasksComponent
  ]
})
export class TasksModule { }
