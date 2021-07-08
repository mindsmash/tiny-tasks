import {NgModule} from '@angular/core';
import {TinyLetDirective} from 'app/shared/tiny-let/tiny-let.directive';

@NgModule({
  exports: [
    TinyLetDirective
  ],
  declarations: [
    TinyLetDirective
  ]
})
export class SharedModule { }
