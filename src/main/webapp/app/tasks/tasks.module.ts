import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SearchFieldComponent } from 'app/tasks/search-field/search-field.component';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, SearchFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    FormsModule
  ],
  exports: [TaskFormComponent, TaskListComponent, SearchFieldComponent]
})
export class TasksModule { }
