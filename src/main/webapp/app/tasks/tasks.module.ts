import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDueDateDialogComponent } from './dialog/task-due-date-dialog/task-due-date-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskSearchComponent } from './task-search/task-search.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    TaskFormComponent, 
    TaskListComponent, 
    TaskDueDateDialogComponent, TaskSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatLineModule,
    NgxMatMomentModule,
    MatDialogModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
 ],
  exports: [TaskFormComponent, TaskListComponent, TaskSearchComponent]
})
export class TasksModule {}
