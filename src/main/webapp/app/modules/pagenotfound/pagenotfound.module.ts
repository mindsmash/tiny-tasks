import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageNotFoundComponent } from './pagenotfound.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    BrowserModule,
  ],
  exports: [
    PageNotFoundComponent,
  ],
})
export class PageNotFoundModule { }
