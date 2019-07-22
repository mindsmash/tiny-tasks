import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';


import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule
  ],
  exports: [UserListComponent]
})
export class UsersModule { }
