import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { BASE_URL } from './app.tokens';
import { DefaultTaskService } from './tasks/default-task.service';
import { LocalTaskService } from './tasks/local-task.service';
import { TasksModule } from './tasks/tasks.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user/user.service';
import { TaskRootComponent } from './task-root/task-root.component';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [AppComponent, LoginComponent, TaskRootComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: BASE_URL, useValue: 'http://localhost:8080' },
    { provide: 'TaskService', useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService },
    { provide: 'UserService', useClass: UserService }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
