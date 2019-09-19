import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule, MatInputModule, MatListModule} from '@angular/material';

import {TaskFormComponent} from './task-form/task-form.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskComponent} from "app/tasks/task.component";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, TaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule
  ],
  exports: [TaskFormComponent, TaskListComponent, TaskComponent]
})
export class TasksModule {
}
