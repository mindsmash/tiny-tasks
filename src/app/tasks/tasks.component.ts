import { Component, Input } from '@angular/core';
import {TaskList} from '../task-list';

@Component({
  selector: 'tiny-tasks-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent  {
  @Input() listName: string;
  @Input() taskList: TaskList;
  @Input() targetTaskList: TaskList;
}
