import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SortTasksPipe } from './task-list/sort-tasks.pipe';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, SortTasksPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule
  ],
  exports: [TaskFormComponent, TaskListComponent]
})
export class TasksModule { }
