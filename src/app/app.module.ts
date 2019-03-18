import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatIconModule, MatTableModule, MatDatepickerModule, MatDialogModule, MatNativeDateModule, MatSelectModule,  } from '@angular/material';

import { AppComponent } from './app.component';
import { StatusLabelComponent } from './components/status-label/status-label.component';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';
import {FormsModule, ReactiveFormsModule, } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StatusLabelComponent,
    CreateTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateTaskDialogComponent]

})
export class AppModule { }
