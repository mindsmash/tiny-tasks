import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

import { Task } from './tasks/task';
import { TaskService } from './tasks/task.service';
import { Category } from './tasks/category';
import { CategoryService } from './tasks/category.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  now$: Observable<Date>;

  tasks$: Observable<Task[]>;

  categories$: Observable<Category[]>;

  constructor(@Inject('TaskService') private taskService: TaskService, @Inject('CategoryService') private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
      this.returnCategories();
  }

  created(): void {
    this.returnCategories();
  }

  createdCategory(): void {
    this.returnCategories();
  }

  deleted(): void {
    this.returnCategories();
  }

  changedCategory(): void {
    this.returnCategories();
  }

  returnTasks() : void {
    this.tasks$ = this.taskService.getAll();
  }

  returnCategories() : void {
    this.categories$ = this.categoryService.getAll();
  }
}
