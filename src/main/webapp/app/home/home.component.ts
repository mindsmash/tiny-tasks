import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';

import { Task } from '../tasks/task';
import { TaskService } from '../tasks/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tiny-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private fetch: Subject<void> = new BehaviorSubject<void>(void 0);
  tasks$: Observable<Task[]>;

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private router: Router
  ) {
    // Use `Router` instead of window.location.href so the template won't be flashing
    const isAuthenticated = false;
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    this.tasks$ = this.fetch.pipe(switchMap(() => this.taskService.getAll()));
  }

  ngOnInit(): void {
    this.fetch.next();
  }

  created(): void {
    this.fetch.next();
  }

  deleted(): void {
    this.fetch.next();
  }
}
