import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatToolbarModule , MatGridListModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';


import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    DragDropModule,
    MatToolbarModule,
    MatGridListModule
  ],
  exports: [TaskFormComponent, TaskListComponent]
})
export class TasksModule { }
