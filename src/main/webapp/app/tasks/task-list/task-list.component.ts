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

  downloadFile(task: Task): void {
    if (task.file !== null) {
      this.taskService.downloadImage(task.id).subscribe((result) => {
        this.download.emit({ image: result, task });
      });
    }
  }

  getPreviewImage(task: Task): string {
    if (task.file !== null) {
      return `${this.baseUrl}/tasks/file/${task.id}`;
    }
  }

  /*
  * Not show preview for not image files
  */
  isImageFile(fileName: string) {
    const imagesExtensions = ['.png', '.gif', '.jpeg', '.jpg'];
    if (fileName === null) {
      return false;
    } else {
      const dotIndex = fileName.lastIndexOf('.');
      const ext = fileName.substring(dotIndex).toLocaleLowerCase();
      return imagesExtensions.indexOf(ext) > -1;
    }
  }
}
