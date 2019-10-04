import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Task } from './tasks/task';
import { TaskImageResponse } from './tasks/task-image-response';
import { TaskService } from './tasks/task.service';

import { saveAs } from 'file-saver';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  now$: Observable<Date>;

  tasks$: Observable<Task[]>;

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnInit(): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
    this.tasks$ = this.taskService.getAll();
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }

  download(taskImageResponse: TaskImageResponse) {
    const response = taskImageResponse.image;
    const task = taskImageResponse.task;
    const blob = new Blob([response.body], {
      type: response.headers.get('Content-Type'),
    });
    saveAs(blob, task.file);
  }
}
