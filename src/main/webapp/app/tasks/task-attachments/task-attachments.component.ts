import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {FileAttachement} from 'app/tasks/fileAttachement';
import {Task} from 'app/tasks/task';
import {getClassNameForExtension} from 'font-awesome-filetypes';
import {TaskService} from 'app/tasks/task.service';

@Component({
  selector: 'tiny-task-attachments',
  templateUrl: './task-attachments.component.html',
  styleUrls: ['./task-attachments.component.scss']
})
export class TaskAttachmentsComponent {

  @Input() task: Task;

  @Output() fileAttached: EventEmitter<FileAttachement> = new EventEmitter();
  @Output() fileDetached: EventEmitter<FileAttachement> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {
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

      this.taskService.attachFile(task.id, formData).subscribe(f => {
        this.fileAttached.emit(f); // todo what to emit
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
      this.fileDetached.emit(file);
    });
  }

}
