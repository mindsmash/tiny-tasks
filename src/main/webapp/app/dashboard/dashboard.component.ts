import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/authentication/authentication.service';
import { User } from 'app/authentication/user';
import { DefaultTaskService } from 'app/tasks/default-task.service';
import { Task } from 'app/tasks/task';
import { TaskService } from 'app/tasks/task.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'tiny-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DashboardComponent implements OnInit {

  tasks$: Observable<Task[]>;
  user:any = {};

  constructor(@Inject('TaskService') private taskService: TaskService , private authenticationService: AuthenticationService, private router: Router,
  private defaulttaskservice : DefaultTaskService) { }

  ngOnInit(): void {
    console.log("local storage ",Number(localStorage.getItem('userid')))
          this.getTasksByUser();
  }

  created(event): void {
    // this.tasks$ = this.taskService.getAll();

    this.getTasksByUser();
  }

  deleted(event): void {
    // this.tasks$ = this.taskService.getAll();
    this.getTasksByUser();
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['']);

  }

getTasksByUser(){
  this.tasks$=this.defaulttaskservice.getTasksByUser(Number(localStorage.getItem('userid')));

}


}
