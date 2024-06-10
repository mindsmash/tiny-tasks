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
import { UserService } from '../user/user.service';

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
    private userService: UserService,
    private router: Router
  ) {
    this.tasks$ = this.fetch.pipe(switchMap(() => this.taskService.getAll()));
    this.userService.userAuth$.subscribe((user) => {
      if (!user.id) {
        // Use `Router` instead of window.location.href so the template won't be flashing
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    console.log('init home');
    this.fetch.next();
  }

  created(): void {
    this.fetch.next();
  }

  deleted(): void {
    this.fetch.next();
  }
}
