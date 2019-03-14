import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatIconModule, MatListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppBarModule } from './app-bar/app-bar.module';
import { TasksModule } from './tasks/tasks.module';
import { HammerConfig } from 'src/hammerconfig/HammerConfig';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppBarModule,
    TasksModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
