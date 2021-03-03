import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { BASE_URL } from './app.tokens';
import { routing } from './app-routing.module';

import {
  AuthService,
  AuthGuardService,
  DefaultTaskService,
  LocalTaskService,
  StorageService,
} from './services';

import {
  LoginModule,
  PageNotFoundModule,
  RegisterModule,
  TasksModule,
} from './modules/index';
import { JwtInterceptor } from './services/auth/jwt.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    LoginModule,
    PageNotFoundModule,
    RegisterModule,
    TasksModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    StorageService,
    {provide: BASE_URL, useValue: 'http://localhost:8080'},
    {provide: 'TaskService', useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
