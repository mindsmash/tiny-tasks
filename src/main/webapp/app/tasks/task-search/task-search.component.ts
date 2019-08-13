import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { HelperUtlis } from 'app/helper-utlis.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSearchComponent implements OnInit {


  public searchWithdebounce: Function;
  @Input() searchValue: string;
  @Input() debounceTime = 250;
  @Output() searchValueChange: EventEmitter<string> = new EventEmitter();

  constructor( private helperUtlis: HelperUtlis) { }
  ngOnInit(): void {
    this.searchWithdebounce = this.helperUtlis.debounce(this.search, this.debounceTime, false);
  }
  search(event): void {
      this.searchValueChange.emit(event.target.value);
  }

}
