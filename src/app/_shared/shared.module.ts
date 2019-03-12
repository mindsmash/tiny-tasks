import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {BsModalRef, ModalModule} from 'ngx-bootstrap';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
  ],
  providers: [BsModalRef],
  declarations: [],
  entryComponents: [],
  exports: [
    TranslateModule,
    ModalModule,
  ]
})
export class SharedModule {
}
