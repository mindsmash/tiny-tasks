import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { StatusLabelMap } from '../../shared/status';
import { Task } from '../../tasks/task';

@Component({
  selector: 'tiny-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusDialogComponent {
  public statusLabelMap = Object.entries(StatusLabelMap);

  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  public changeStatus(event: MatRadioChange): void {
    this.data.status = event.value;
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
