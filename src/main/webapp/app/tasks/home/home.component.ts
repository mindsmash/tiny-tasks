import {Component, Inject, OnInit} from '@angular/core';
import {Observable, timer} from "rxjs";
import {Task} from "app/_shared/_entities/task";
import {TaskService} from "app/_shared/_services/task.service";
import {map, startWith} from "rxjs/operators";
import {Jobs} from "app/_shared/_entities/jobs";
import {JobsService} from "app/_shared/_services/jobs.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  now$: Observable<Date>;

  tasks$: Observable<Task[]>;

  job$: Observable<Jobs>;

  constructor(@Inject('TaskService') private taskService: TaskService,
              @Inject('JobsService') private jobsService: JobsService) { }

  ngOnInit(): void {
    this.now$ = timer((60 - new Date().getSeconds()) * 1000, 60 * 1000)
      .pipe(startWith(0))
      .pipe(map(() => new Date()));
    this.tasks$ = this.taskService.getAll();
    this.job$ = this.jobsService.getJobByUser();
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }

  schedulingUpdated(): void {
    this.job$ = this.jobsService.getJobByUser();
  }

}
