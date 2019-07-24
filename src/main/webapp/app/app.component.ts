import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {Task} from './tasks/task';
import {TaskService} from './tasks/task.service';
import {AuthService} from "app/service/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AppGlobalValuesService} from "app/service/app-global-values.service";
import {Router} from "@angular/router";

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {



  constructor(@Inject('TaskService') private taskService: TaskService,
              private authService: AuthService,
              private toastr: ToastrService,
              public globalAppValuesService: AppGlobalValuesService,
              private router: Router) {
  }

  ngOnInit(): void {

  }



}
