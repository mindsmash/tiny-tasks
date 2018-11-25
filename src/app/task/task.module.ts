import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { TaskService } from './task.service';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskManagerComponent,
    AddTaskDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    FlexLayoutModule,

    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports: [
    TaskManagerComponent
  ],
  providers: [
    TaskService
  ],
  entryComponents: [
    AddTaskDialogComponent
  ]
})
export class TaskModule { }
