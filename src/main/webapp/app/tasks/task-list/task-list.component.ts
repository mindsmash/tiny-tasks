import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';

import {Task} from '../task';
import {TaskService} from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() downloaded: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  downloadFile(task: Task) {
    this.taskService.downloadFile(task.fileName).subscribe((res) => {
      this.downloaded.emit(task);
      const blob = new Blob([res.body], {
        type: res.headers.get('Content-Type'),
      });
      const anchor = document.createElement("a");
      anchor.download = task.fileName;
      anchor.href =  window.URL.createObjectURL(blob);
      anchor.click();
    });
  }
}
