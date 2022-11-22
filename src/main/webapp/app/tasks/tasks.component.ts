import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Task} from './shared/task';
import {TaskService} from './shared/task.service';


@Component({
  selector: 'tiny-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  public tasks$: Observable<Task[]> = of([]);
  public searchMode = false;
  public searchedTerm = '';
  private destroy$ = new Subject<void>();

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (params) => {
          this.searchedTerm = params.q || '';
          this.searchMode = params.q !== undefined;
          this.loadTasks();
        }
      });
  }

  public loadTasks(): void {
    this.tasks$ = this.taskService.getTasksByName(this.searchedTerm);
  }

  public loadFilteredTasks(searchTerm: string): void {
    this.router.navigate([''], {
        queryParams: {q: searchTerm}
      }
    );
  }

  public getButtonText(): string {
    return this.searchMode ? 'Add new tasks' : 'Search through tasks';
  }

  public toggleMode(): void {
    this.router.navigate(['']);
    this.searchMode = !this.searchMode;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
