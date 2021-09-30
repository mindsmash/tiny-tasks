import {Component, EventEmitter, Inject, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Common } from '../../../Utility/common';
/**
 * A dialog created for selection of date and time 
 */
@Component({
  selector: 'tiny-task-due-date-dialog',
  templateUrl: './task-due-date-dialog.component.html',
  styleUrls: ['./task-due-date-dialog.component.scss']
})
export class TaskDueDateDialogComponent {

  @ViewChild('picker') picker: any;
  public disabled = true;
  public disabledDateTime = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: Date = new Date();
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  @Output() deleted: EventEmitter<Date> = new EventEmitter();
  public dateControl = new FormControl();

  constructor(private dialogRef: MatDialogRef<TaskDueDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) {
      console.log(this.dialogData)
    this.minDate = this.dialogData
  }

/**
 * dateSlected methos is called when user selects date from calandar
 */
  dateSelected() {
    this.dialogRef.close({event: true, data: this.dateControl.value});
  }
}
