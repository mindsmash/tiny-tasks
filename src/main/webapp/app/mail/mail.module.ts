import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MailSettingsComponent} from "./mail-settings/mail-settings.component";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";

@NgModule({
  declarations: [MailSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatCheckbox,
    MatIconModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
  ],
  exports: [MailSettingsComponent],
  bootstrap: [MailSettingsComponent]
})
export class MailModule {
}
