import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { BASE_URL } from "./app.tokens";
import { DefaultTaskService } from "./tasks/default-task.service";
import { LocalTaskService } from "./tasks/local-task.service";
import { TasksModule } from "./tasks/tasks.module";
import { AuthComponent } from "./login/auth.component";
import { AppRoutingModule } from "./app-routing.module";
import { TaskComponent } from "./tasks/task.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, AuthComponent, TaskComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: BASE_URL, useValue: "http://localhost:8080" },
    {
      provide: "TaskService",
      useClass: environment.useLocalStorage
        ? LocalTaskService
        : DefaultTaskService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
