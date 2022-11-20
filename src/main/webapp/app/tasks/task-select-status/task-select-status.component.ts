import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

import { TaskStatus } from '../task';

export interface SelectDatum {
  label: string;
  value: TaskStatus;
}

const DEFAULT_SELECT_VALUES: Array<SelectDatum> = [
  {
    label: 'In Progress',
    value: TaskStatus.PROGRESS,
  },
  {
    label: 'Blocked',
    value: TaskStatus.BLOCKED,
  },
  {
    label: 'Done',
    value: TaskStatus.DONE,
  },
  {
    label: 'Default',
    value: TaskStatus.DEFAULT,
  }
]

/**
 * A form to create tiny tasks.
 */
@Component({
  selector: 'tiny-task-select-status',
  templateUrl: './task-select-status.component.html',
  styleUrls: ['./task-select-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskSelectStatusComponent {
  @Input() data: Array<SelectDatum> = DEFAULT_SELECT_VALUES;

  @Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly elementRef: ElementRef,
  ) { }

  public isOpen: boolean = false;

  /**
   * Event handler for open
   */
  onOpen(): void {
    this.isOpen = !this.isOpen;
  }

  /**
   * Event handler for select
   */
  onSelect(datum: SelectDatum): void {
    this.selectEvent.emit(datum);
    this.isOpen = false;
  }

  /**
   * Event handler for clicking outside
   */
  @HostListener('document:mousedown', ['$event'])
  onOutside(event: Event): void {
    if (this.elementRef.nativeElement.contains(event.target)) { return; }
    this.isOpen = false;
  }
}
