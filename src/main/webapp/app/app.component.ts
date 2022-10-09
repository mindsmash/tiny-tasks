import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from './tasks/task';
import { TaskService } from './tasks/task.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public tasks$: Observable<Task[]>;

  public constructor(@Inject('TaskService') private taskService: TaskService) {
    this.tasks$ = this.taskService.getAll();
  }

  public ngOnInit(): void {
    this.tasks$ = this.taskService.getAll();
  }

  public created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  public deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }

  public refresh(): void {
    this.tasks$ = this.taskService.getAll();
  }

  public search(searchValue: string): void {
    this.tasks$ = this.taskService.search(searchValue);
  }
}
