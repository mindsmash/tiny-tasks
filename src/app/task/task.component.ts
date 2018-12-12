import { Component, Input } from '@angular/core';
import { TaskState } from '../task-state.enum';

@Component({
  selector: 'tiny-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: any;

  get stateIcon() {
    switch (this.task.state) {
      case TaskState.INPROGRESS: return "access_time";
      case TaskState.DONE: return "check_box";
      default: return "check_box_outline_blank";
    }
  }

  updateState() {
    switch (this.task.state) {
      case TaskState.TODO: this.task.state = TaskState.INPROGRESS; break;
      case TaskState.INPROGRESS: this.task.state = TaskState.DONE; break;
      default: break;
    }
  }
}
