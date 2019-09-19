import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "app/login/login.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule
  ],
  declarations: [
    LoginComponent
  ],
  entryComponents: [],
  exports: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule {
}
