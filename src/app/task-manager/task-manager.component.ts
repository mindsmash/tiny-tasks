import { Component } from '@angular/core';
import { TaskList } from '../task-list';

@Component({
  selector: 'tiny-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent {

  scheduledTasks = new TaskList();
  tasksInProgress = new TaskList();
  doneTasks = new TaskList();

  nameFact(name: string) {
   return name;
  }

}
