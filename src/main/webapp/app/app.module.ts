import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {BASE_URL} from './app.tokens';
import {DefaultTaskService} from './tasks/shared/default-task.service';
import {LocalTaskService} from './tasks/shared/local-task.service';
import {TasksModule} from './tasks/tasks.module';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule,
    AppRoutingModule
  ],
  providers: [
    { provide: BASE_URL, useValue: 'http://localhost:8080' },
    { provide: 'TaskService', useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
