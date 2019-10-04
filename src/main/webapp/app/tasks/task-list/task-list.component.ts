import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { BASE_URL } from '../../app.tokens';

import { Task } from '../task';
import { TaskImageResponse } from '../task-image-response';
import { TaskService } from '../task.service';

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

  @Output() download: EventEmitter<TaskImageResponse> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService, @Inject(BASE_URL) private baseUrl: string) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  downloadImage(task: Task): void {
    if (task.imageFile !== null) {
      this.taskService.downloadImage(task.id).subscribe((result) => {
        this.download.emit({image: result, task});
      });
    }
  }

  getPreviewImage(task: Task): string {
    if (task.imageFile !== null) {
      return `${this.baseUrl}/tasks/image/${task.id}`;
    }
  }
}
