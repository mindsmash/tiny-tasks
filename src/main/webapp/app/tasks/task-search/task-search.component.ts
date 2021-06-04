import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSearchComponent implements OnInit {
  @Output() searchUpdated: EventEmitter<string> = new EventEmitter<string>();
  searchField = new FormControl();
  routerParamsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
    // added query param to work with /URL?q=search
    this.routerParamsSubscription = this.route.queryParams.subscribe(
      params => {
        if (params?.q) {
          this.searchField.setValue(params.q);
        }
      });
  }

  ngOnInit(): void {
    this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe((term: string) => {
      this.searchUpdated.emit(term);
    });
  }

  resetSearch() {
    this.searchField.setValue('');
  }
}
