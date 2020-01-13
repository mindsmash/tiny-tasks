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
import {DefaultTaskService} from './tasks/default-task.service';
import {LocalTaskService} from './tasks/local-task.service';
import {TasksModule} from './tasks/tasks.module';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "app/app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RegisterComponent} from './register/register.component';
import {LocalUserServiceService} from "app/utils/local-user-service.service";
import {DefaultUserServiceService} from "app/utils/default-user-service.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {ChangePassComponent} from './change-pass/change-pass.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, RegisterComponent, ChangePassComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatGridListModule,
    MatDividerModule
  ],
  providers: [
    {provide: BASE_URL, useValue: 'http://localhost:8080/v1'},
    {provide: 'TaskService', useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService},
    {
      provide: 'UserService',
      useClass: DefaultUserServiceService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
