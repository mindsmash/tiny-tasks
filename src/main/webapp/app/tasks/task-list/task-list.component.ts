import { Component, Input } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input() tasks: Array<Task>;
}
