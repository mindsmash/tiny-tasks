import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatChipsModule
  ],
  exports: [TaskFormComponent, TaskListComponent]
})
export class TasksModule { }
