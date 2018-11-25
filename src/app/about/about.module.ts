import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about.routing';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
