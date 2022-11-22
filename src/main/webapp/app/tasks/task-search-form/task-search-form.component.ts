import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'tiny-task-search-form',
  templateUrl: './task-search-form.component.html',
  styleUrls: ['./task-search-form.component.scss']
})
export class TaskSearchFormComponent implements OnInit, OnDestroy {
  @Input() initialTerm = '';
  @Output() searched: EventEmitter<string> = new EventEmitter();

  public searchControl: FormControl;
  private destroy$ = new Subject();


  constructor(private fb: FormBuilder) {
    this.searchControl = this.fb.control('');
  }

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300)
      )
      .subscribe({
        next: (value: string) => {
          this.searched.emit(value);
        }
      });

    this.searchControl.setValue(this.initialTerm, {emitEvent: false});
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onClick(): void {
    this.searchControl.reset('');
  }
}
