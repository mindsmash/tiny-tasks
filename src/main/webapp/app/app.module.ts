import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent} from './components/home.component';
import { Register} from './components/register.component';
import { Login} from './components/login.component';

import { BASE_URL } from './app.tokens';
import { DefaultTaskService } from './tasks/default-task.service';
import { LocalTaskService } from './tasks/local-task.service';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';

import { TasksModule } from './tasks/tasks.module';


const routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Register,
    Login],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
    ],
  providers: [
    {provide: BASE_URL, useValue: 'http://localhost:8080'},
    {provide: 'TaskService', useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService},
    RegisterService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
