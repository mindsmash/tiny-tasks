import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { LocalTaskService } from "./tasks/local-task.service";

import { Task } from "./tasks/task";

@Component({
  selector: "tiny-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  tasks$: Observable<Task[]>;
  doneTasks: Task[];
  startedTasks: Task[];

  tasksSubscription: Subscription;

  constructor(@Inject("TaskService") private taskService: LocalTaskService) {}

  sortTasks(): void {
    this.tasksSubscription = this.tasks$.subscribe((tasks) => {
      this.doneTasks = tasks.filter((task) => task.status === "Done");
      this.startedTasks = tasks.filter((task) => task.status !== "Done");
    });
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getAll();
    this.sortTasks();
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
    this.sortTasks();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
    this.sortTasks();
  }

  onStatusToggled(): void {
    this.tasks$ = this.taskService.getAll();
    this.sortTasks();
  }

  clearDone(): void {
    this.taskService.clearDone();
    this.tasks$ = this.taskService.getAll();
    this.sortTasks();
  }
}
