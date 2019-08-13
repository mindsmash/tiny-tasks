import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TaskService } from './task.service';
import { Observable, timer } from 'rxjs';
import { Task } from './task';
import { ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';


/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  now$: Observable<Date>;

  tasks$: Observable<Task[]>;
  searchValue: string ;
  constructor(@Inject('TaskService') private taskService: TaskService, private activatedRoute: ActivatedRoute) { }

  ngOnInit (): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
    this.tasks$ = this.taskService.getAll();
    this.activatedRoute.queryParams.subscribe(params => {
      const searchValue = params['search'];
      this.searchValue = searchValue;
      this.search(searchValue);
    });
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }
  search(value: string): void {
    this.searchValue = value;
    this.tasks$ = this.taskService.search(value);
  }


}
