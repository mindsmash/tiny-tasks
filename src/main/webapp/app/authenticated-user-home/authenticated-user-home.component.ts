import {Component, Inject, OnInit} from '@angular/core';
import {Observable, timer} from "rxjs";
import {Task} from "app/tasks/task";
import {TaskService} from "app/tasks/task.service";
import {map, startWith} from "rxjs/operators";
import {AppGlobalValuesService} from "app/service/app-global-values.service";

@Component({
  selector: 'tiny-authenticated-user-home',
  templateUrl: './authenticated-user-home.component.html',
  styleUrls: ['./authenticated-user-home.component.scss']
})
export class AuthenticatedUserHomeComponent implements OnInit {

  now$: Observable<Date>;

  tasks$: Observable<Task[]>;

  constructor(@Inject('TaskService') private taskService: TaskService,
              private globalAppValuesService: AppGlobalValuesService) {
  }

  ngOnInit(): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
    this.tasks$ = this.taskService.getAllByUser(this.globalAppValuesService.getUserProfileObject().id);
  }

  created(): void {
    this.tasks$ =  this.taskService.getAllByUser(this.globalAppValuesService.getUserProfileObject().id);
  }

  deleted(): void {
    this.tasks$ =  this.taskService.getAllByUser(this.globalAppValuesService.getUserProfileObject().id);
  }

  logout() {
    this.globalAppValuesService.logOut();
  }
}
