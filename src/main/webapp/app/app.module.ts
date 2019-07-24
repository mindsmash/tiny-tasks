import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { AuthenticatedUserHomeComponent } from './authenticated-user-home/authenticated-user-home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "app/app-routing.module";
import {HttpTokenInterceptorService} from "app/interceptor/http-token-interceptor.service";
import {ToastrModule} from "ngx-toastr";
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, AuthenticatedUserHomeComponent, LoginComponent],
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
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: BASE_URL, useValue: 'http://localhost:8080'},
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptorService, multi: true},
    {provide: 'TaskService', useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
