import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatOptionModule, MatToolbarModule } from '@angular/material';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { TaskComponent } from './task.component';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, TaskSearchComponent, TaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatOptionModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatToolbarModule
  ],
  exports: [TaskFormComponent, TaskListComponent, TaskSearchComponent, TaskComponent]
})
export class TasksModule { }
