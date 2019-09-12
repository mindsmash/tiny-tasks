import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from "@angular/core";
import { Observable, timer } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { Task } from "./task";
import { TaskService } from "./task.service";
import { AuthService } from "app/login/auth.service";
import { Router } from "@angular/router";
import { PersistanceService } from "app/shared/persistance.service";

@Component({
  selector: "tiny-root",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {
  now$: Observable<Date>;
  tasks$: Observable<Task[]>;
  currentUser: any;
  private uid: string;

  constructor(
    @Inject("TaskService") private taskService: TaskService,
    private authentication: AuthService,
    private persister: PersistanceService,
    private router: Router
  ) {
    this.authentication.currentUser.subscribe(
      authenticatedUser => (this.currentUser = authenticatedUser)
    );
  }

  ngOnInit(): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
    this.uid = this.persister.get("currentUser").id;
    this.tasks$ = this.taskService.getAll(this.uid);
  }

  created(): void {
    this.tasks$ = this.taskService.getAll(this.uid);
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll(this.uid);
  }

  logout(): void {
    this.authentication.logout().subscribe();
    this.router.navigate([""]);
  }
}
