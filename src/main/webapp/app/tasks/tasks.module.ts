import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { TaskCreateFormComponent } from './task-create-form/task-create-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskSearchFormComponent } from './task-search-form/task-search-form.component';
import { TasksComponent } from './tasks.component';
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [TaskCreateFormComponent, TaskListComponent, TaskSearchFormComponent, TasksComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule
  ],
  exports: [TasksComponent]
})
export class TasksModule {}
