import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, } from '@angular/core';
import { Task } from 'app/tasks/task';
import { TaskService } from 'app/tasks/task.service';

@Component({
  selector: 'tiny-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private ref: ChangeDetectorRef
  ) {
  }

  private _filteredTasks: Task[] = [];
  public get filteredTasks(): Task[] {
    return this._filteredTasks;
  }

  public set filteredTasks(value: Task[]) {
    this._filteredTasks = value;
    this.ref.detectChanges();
  }

  public tasks: Task[] = [];

  public errorMessage = '';

  private _listFilter = '';
  public get listFilter(): string {
    return this._listFilter;
  }

  public set listFilter(value: string) {
    this._listFilter = value;
    this._filteredTasks = this.getFilteredTasks();
  }

  public ngOnInit(): void {
    this.fetchTasks();
  }

  private fetchTasks(): void {
    this.taskService.getAll().subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = this.getFilteredTasks();
      },
      (error) => {
        this.errorMessage = error.message;
        this.ref.detectChanges();
      }
    );
  }

  private getFilteredTasks(): Task[] {
    return this.listFilter
      ? this.performFilter(this.listFilter)
      : this.tasks;
  }

  public created(): void {
    this.fetchTasks();
  }

  public deleted(): void {
    this.fetchTasks();
  }

  private performFilter(filterBy: string): Task[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tasks.filter(
      (task: Task) => task.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
}
