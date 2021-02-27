import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup = new FormGroup({
    text: new FormControl('')
  });

  subscriptions = new Subscription();
  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.bindEvents();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  clearSearchInput(): void {
    this.searchForm.reset();
  }

  bindEvents(): void {
    this.subscriptions.add(
      this.searchForm.get('text').valueChanges.pipe(distinctUntilChanged()).subscribe(val => {
        this.searchEvent.emit(val);
      })
    );

  }



}
