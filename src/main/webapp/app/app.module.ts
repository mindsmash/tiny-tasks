import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {BASE_URL} from './app.tokens';
import {DefaultTaskService} from './_shared/_services/impl/default-task.service';
import {TasksModule} from './tasks/tasks.module';
import {LoginComponent} from "app/tasks/login/login.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "app/tasks/home/home.component";
import {AuthGuard} from "app/_shared/_guards/auth.guard";
import {AppRoutingModule} from "app/app-routing.module";
import {LoginService} from "app/_shared/_services/login.service";
import {LoginServiceImpl} from "app/_shared/_services/impl/login.service";
import {AmazingTimePickerModule} from "amazing-time-picker";
import {JobsService} from "app/_shared/_services/jobs.service";
import {JobsServiceImpl} from "app/_shared/_services/impl/jobs.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    RouterModule,
    MatSnackBarModule,
    AmazingTimePickerModule
  ],
  providers: [
    AuthGuard,
    {provide: BASE_URL, useValue: 'http://localhost:8080'},
    {provide: 'TaskService', useClass: DefaultTaskService},
    {provide: 'JobsService', useClass: JobsServiceImpl},
    {provide: 'LoginService', useClass: LoginServiceImpl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
