import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {environment} from '../environments/environment';
import {BASE_URL} from './app.tokens';
import {DefaultTaskService} from './tasks/default-task.service';
import {LocalTaskService} from './tasks/local-task.service';
import {TasksModule} from './tasks/tasks.module';
import {AppRoutingModule} from "app/app-routing.module";
import {LoginModule} from "app/login/login.module";
import {AppComponent} from './app.component';
import {UserService} from "app/user/user.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    TasksModule,
    HttpClientModule
  ],
  providers: [
    {provide: BASE_URL, useValue: 'http://localhost:8080'},
    {
      provide: 'TaskService',
      useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService
    },
    {
      provide: 'UserService',
      useClass: UserService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
