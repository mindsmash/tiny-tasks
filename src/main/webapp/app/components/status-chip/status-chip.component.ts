import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  Status,
  StatusChipClassMap,
  StatusLabelMap,
} from '../../shared/status';

@Component({
  selector: 'tiny-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusChipComponent implements OnInit {
  @Input() status: Status | null = null;

  @Output() openUpdateStatusDialog: EventEmitter<void> = new EventEmitter();

  public chipText: string = '';
  public chipClass: string = '';

  public constructor() {}

  public ngOnInit(): void {
    if (this.status) {
      this.chipText = StatusLabelMap[this.status];
      this.chipClass = StatusChipClassMap[this.status];
    }
  }

  public clickedStatus(): void {
    this.openUpdateStatusDialog.emit();
  }
}
