import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {getClassNameForExtension} from 'font-awesome-filetypes';

import {Task} from '../task';
import {TaskService} from '../task.service';
import {FileAttachement} from 'app/tasks/fileAttachement';
// import { saveAs } from 'file-saver';

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
  @Output() fileAttached: EventEmitter<FileAttachement> = new EventEmitter();
  @Output() fileDettached: EventEmitter<FileAttachement> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }


  getFileIcon(file: FileAttachement): string {
    const extension: string = file.name.split('.').pop();
    return getClassNameForExtension(extension);
  }


  onFileSelected($event, task: Task): void {
    const file: File = $event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append('file', file);

      this.taskService.attachFile(task.id, formData).subscribe(file => {
        console.log('File uploaded.');
        console.log(formData.get('file'));
        this.fileAttached.emit(file); // todo what to emit
      });

    }
  }

  downloadFile(task: Task, file: FileAttachement): void {
    this.taskService.getFile(task.id, file.id).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  deleteFile(task: Task, file: FileAttachement): void {
    this.taskService.deleteFile(task.id, file.id).subscribe(() => {
      this.fileDettached.emit(file);
    })
  }
}
