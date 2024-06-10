import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { BASE_URL } from './app.tokens';
import { DefaultTaskService } from './tasks/default-task.service';
import { LocalTaskService } from './tasks/local-task.service';
import { TasksModule } from './tasks/tasks.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.modue';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent],
  imports: [HomeModule, LoginComponent],
  providers: [
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
