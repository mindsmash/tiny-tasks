import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { IFilterData } from './shared/components/filter/utilities/filter.model';
import { ISelectValue } from './shared/models/select.model';
import { ISort, SortDirection, TaskSortType } from './shared/models/sort.model';
import { Task } from './tasks/task';
import { TaskService } from './tasks/task.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  tasks$: Observable<Task[]> | undefined;

  sortOptions: ISelectValue[] = [];

  sort: ISort = { sortBy: { value: TaskSortType.NONE, label: 'None' }, sortDir: SortDirection.ASC };

  sortBy: TaskSortType = TaskSortType.NONE;

  private localFilter: IFilterData | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initialize();

    setTimeout(() => {
      this.setFromQueryParams(this.activatedRoute.snapshot.queryParams);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete();
  }

  onFilterChanged(fiter: IFilterData): void {
    this.tasks$ = this.taskService.getFiltered(fiter, this.sort);
  }

  loadTasks(): void {
    setTimeout(() => { this.tasks$ = this.taskService.getFiltered(this.localFilter, this.sort); })
  }

  onSortChanged(option: ISelectValue): void {
    this.sort.sortBy = { value: option.value, label: option.label };
    this.setSortQueryParams();
    this.loadTasks();
  }

  onSorDirChanged(): void {
    this.sort.sortDir = ((this.sort.sortDir === SortDirection.ASC) ? SortDirection.DESC : SortDirection.ASC);
    this.setSortQueryParams();
    this.loadTasks();
  }

  private setSortQueryParams(): void {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        sortBy: this.sort.sortBy.value !== TaskSortType.NONE ? this.sort.sortBy.label : null,
        sortDir: this.sort.sortBy.value !== TaskSortType.NONE ? this.sort.sortDir : null,
      },
    };
    this.router.navigate([], navigationExtras);
  }

  private setFromQueryParams(queryParams: Params): void {
    this.sort.sortBy = this.sortOptions.find((el) => el.label === queryParams.sortBy) || { value: null, label: '' };
    this.sortBy = this.sort.sortBy.value as TaskSortType;
    this.sort.sortDir = queryParams.sortDir;
  }

  private initialize(): void {
    this.sortOptions = [
      { value: TaskSortType.NONE, label: 'None' },
      { value: TaskSortType.DUE_DATE, label: 'Task due date' },
      { value: TaskSortType.NAME, label: 'Task name' },
    ];
  }
}
