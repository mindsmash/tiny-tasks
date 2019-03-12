import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {SharedModule} from '../../_shared/shared.module';
import {HomeRoutingModule} from './home.routing.module';
import {MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule} from '@angular/material';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    TaskDialogComponent
  ],
  entryComponents: [TaskDialogComponent]
})
export class HomeModule {
}
