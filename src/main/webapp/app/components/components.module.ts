import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusChipComponent } from './status-chip/status-chip.component';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [StatusChipComponent, StatusDialogComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [StatusChipComponent, StatusDialogComponent],
})
export class ComponentsModule {}
