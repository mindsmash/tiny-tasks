import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {TasksModule} from './tasks/tasks.module';
import {TaskService} from 'app/tasks/task.service';
import {LocalTaskService} from 'app/tasks/local-task.service';
import {DefaultTaskService} from 'app/tasks/default-task.service';
import {environment} from '../environments/environment';
import {BASE_URL} from 'app/app.tokens';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule,
    HttpClientModule
  ],
  providers: [
    {provide: BASE_URL, useValue: 'http://localhost:8080'},
    {provide: 'TaskService', useClass: (environment.mockBackend) ? LocalTaskService : DefaultTaskService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
