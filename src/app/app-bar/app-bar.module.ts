import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './app-bar/app-bar.component';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [AppBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    AppBarComponent
  ]
})
export class AppBarModule { }
