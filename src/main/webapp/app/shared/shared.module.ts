import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';
import { SearchComponent } from './search/search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [SearchPipe, SearchComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [SearchPipe, SearchComponent]
})
export class SharedModule { }
