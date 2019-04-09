import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {TasksModule} from './tasks/tasks.module';
import {TaskService} from 'app/tasks/task.service';
import {LocalTaskService} from 'app/tasks/local-task.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule
  ],
  providers: [
    {provide: 'TaskService', useClass: LocalTaskService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
