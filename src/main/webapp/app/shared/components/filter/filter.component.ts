import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFilterData } from './utilities/filter.model';

@Component({
  selector: 'tiny-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnDestroy {

  @Output() filterChanged: EventEmitter<IFilterData> = new EventEmitter<IFilterData>();

  form: FormGroup | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm(this.formBuilder);

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.setQueryParams(this.form as FormGroup, this.router, this.activatedRoute);
          this.filterChanged.emit({
            taskName: data.taskName
          });
        }
      });

    setTimeout(() => {
      this.setFromQueryParams(this.activatedRoute.snapshot.queryParams, this.form as FormGroup);
      this.form!.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete();
  }

  resetFilter(): void {
    this.form!.reset();
    this.setQueryParams(this.form as FormGroup, this.router, this.activatedRoute);
  }

  private buildForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      taskName: ''
    });
  }

  private setQueryParams(form: FormGroup, router: Router, activatedRoute: ActivatedRoute): void {
    const navigationExtras: NavigationExtras = {
      relativeTo: activatedRoute,
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        ...this.getQueryParamsFromForm(form),
      },
    };
    router.navigate([], navigationExtras);
  }

  private setFromQueryParams(queryParams: Params, form: FormGroup): void {
    Object.entries(queryParams)
      .forEach(([key, val]) => {
        form.get(key)?.setValue(val, { emitEvent: false });
      });
  }

  private getQueryParamsFromForm(form: FormGroup): Record<string, any> {
    return Object.entries(form.value)
      .reduce((total, [prop, val]) => ({ ...total, [prop]: val === '' ? null : val }), {});
  }
}
