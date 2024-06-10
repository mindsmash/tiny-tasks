import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { BASE_URL } from './app.tokens';
import { DefaultTaskService } from './tasks/default-task.service';
import { LocalTaskService } from './tasks/local-task.service';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.modue';
import { LoginComponent } from './login/login.component';

import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [RouterOutlet, RouterLink, HomeModule, LoginComponent],
  providers: [
    provideRouter(routes),
    { provide: BASE_URL, useValue: 'http://localhost:8080' },
    {
      provide: 'TaskService',
      useClass: environment.useLocalStorage
        ? LocalTaskService
        : DefaultTaskService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
