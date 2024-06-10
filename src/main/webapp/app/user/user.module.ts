import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UserComponent],
  imports: [MatIconModule],
  exports: [UserComponent],
})
export class UserModule {}
