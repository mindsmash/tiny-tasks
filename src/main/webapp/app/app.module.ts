import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { BASE_URL } from './app.tokens';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultTaskService } from './tasks/default-task.service';
import { LocalTaskService } from './tasks/local-task.service';
import { TasksModule } from './tasks/tasks.module';
import { DefaultUserService } from './users/default-user.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersModule } from './users/users.module';


// in production there should be a separate router for each module.
const appRoutes: Routes = [
  { path: 'user/:id',      component: UserDetailComponent },
  {
    path: 'users',
    component: AppComponent,
    data: { title: 'Users List' }
  },
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule,
    UsersModule,
    HttpClientModule
  ],
  providers: [
    {provide: BASE_URL, useValue: 'http://localhost:8080'},
    {provide: 'TaskService', useClass: (environment.useLocalStorage) ? LocalTaskService : DefaultTaskService},
    {provide: 'UserService', useClass: DefaultUserService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
