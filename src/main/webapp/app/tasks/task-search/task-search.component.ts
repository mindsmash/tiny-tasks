import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSearchComponent implements OnInit, OnDestroy {
  @Output() searched: EventEmitter<string> = new EventEmitter();
  searchInputFormControl: FormControl;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchInputFormControl = this.fb.control('');
    this.onSearch();
  }

  onSearch() {
    this.subscriptions.push(
      this.searchInputFormControl.valueChanges.subscribe(searchValue => {
        searchValue =  searchValue || '';
        this.searched.emit(searchValue);
      })
    );
  }

  onClear() {
    this.searchInputFormControl.reset();
  }

  ngOnDestroy() {
    if (this.subscriptions && this.subscriptions?.length) { this.subscriptions.forEach(subscription =>  subscription.unsubscribe()); }
  }
}
