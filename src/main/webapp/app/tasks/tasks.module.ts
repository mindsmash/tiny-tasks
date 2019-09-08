import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import {TaskItemComponent} from "app/tasks/task-item/task-item.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, TaskItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    FormsModule
  ],
  exports: [TaskFormComponent, TaskListComponent],
  entryComponents: [TaskItemComponent]
})
export class TasksModule { }
