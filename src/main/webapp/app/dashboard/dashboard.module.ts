import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultTaskService } from 'app/tasks/default-task.service';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { TasksModule } from 'app/tasks/tasks.module';
import { environment } from '../../environments/environment';
import { DashboardComponent } from './dashboard.component';
import { dashboardModule } from './dashboard.routes';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule,
    HttpClientModule,
    dashboardModule
  ],
  providers: [
    {provide: 'TaskService', useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService},
    DefaultTaskService
  ],

})
export class DashboardModule { }
