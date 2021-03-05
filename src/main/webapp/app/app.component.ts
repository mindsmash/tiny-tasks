import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { isEmpty } from 'cypress/types/lodash';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { Task } from './tasks/task';
import { TaskService } from './tasks/task.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  tasks$: Observable<Task[]>;
  private txt = undefined;
  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getAll();
  }

  created(): void {
    this.tasks$ = this.taskService.readTasksByNameAndId(this.txt);
  }
  searched(txt: string): void {
    this.txt = txt;
    this.tasks$ = this.taskService.readTasksByNameAndId(txt);
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }
  clearedSearch(): void {
    this.txt = undefined;
    this.tasks$ = this.taskService.getAll();
  }
}
