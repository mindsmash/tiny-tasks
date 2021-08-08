import { ChangeDetectionStrategy, Component, Inject, OnInit, } from '@angular/core';
import { Task } from 'app/tasks/task';
import { TaskService } from 'app/tasks/task.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'tiny-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  public readonly tasks$ = this.tasksSubject.asObservable();

  private readonly listFilterSubject = new BehaviorSubject<string>('');
  private readonly listFilter$ = this.listFilterSubject.pipe(debounceTime(400));

  public readonly filteredTasks$ = combineLatest([
    this.tasks$,
    this.listFilter$,
  ]).pipe(
    map(([tasks, listFilter]) => {
      if (listFilter) {
        return tasks.filter(
          (task) => task.name.toLocaleLowerCase().indexOf(listFilter) !== -1
        );
      } else {
        return tasks;
      }
    })
  );

  private readonly errorMessageSubject = new BehaviorSubject<string>('');
  public readonly errorMessage$ = this.errorMessageSubject.asObservable();

  public ngOnInit(): void {
    this.fetchTasks();
  }

  private fetchTasks(): void {
    this.taskService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe(
        (tasks) => this.tasksSubject.next(tasks),
        (error) => this.errorMessageSubject.next(error.message)
      );
  }

  public created(): void {
    this.fetchTasks();
  }

  public deleted(): void {
    this.fetchTasks();
  }

  public updateListFilter(event: string): void {
    this.listFilterSubject.next(event);
  }
}
