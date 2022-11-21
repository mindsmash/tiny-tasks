import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Task} from "./shared/task";
import {TaskService} from "./shared/task.service";

@Component({
  selector: 'tiny-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(@Inject('TaskService') private taskService: TaskService) {
    this.tasks$ = this.taskService.getAll();
  }

  public ngOnInit(): void {
    this.loadTasks()
  }

  public loadTasks(): void {
    this.tasks$ = this.taskService.getAll();
  }

}
