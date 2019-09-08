import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule, MatInputModule, MatListModule} from '@angular/material';

import {TaskFormComponent} from './task-form/task-form.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskDeleteCompletedComponent} from "app/tasks/task-delete-completed/task-delete-completed.component";

@NgModule({
    declarations: [TaskFormComponent, TaskListComponent, TaskDeleteCompletedComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatListModule
    ],
    exports: [TaskFormComponent, TaskListComponent, TaskDeleteCompletedComponent]
})
export class TasksModule {
}
