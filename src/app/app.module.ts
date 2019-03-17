import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatIconModule, MatGridListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TaskService } from './service/task.service';
import { SearchComponent } from './search/search.component';
import { PriorityComponent } from './priority/priority.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PriorityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
