import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  exports: [CheckboxComponent]
})
export class SharedModule { }
