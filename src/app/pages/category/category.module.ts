import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryRoutingModule} from './category.routing.module';
import {CategoryComponent} from './category.component';
import {SharedModule} from '../../_shared/shared.module';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    SharedModule
  ],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
