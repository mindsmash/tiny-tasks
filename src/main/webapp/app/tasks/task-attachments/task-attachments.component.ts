import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {FileAttachment} from 'app/tasks/fileAttachment';
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

  @Output() fileAttached: EventEmitter<FileAttachment> = new EventEmitter();
  @Output() fileDetached: EventEmitter<FileAttachment> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {
  }

  getFileIcon(file: FileAttachment): string {
    const extension: string = file.name.split('.').pop();
    return getClassNameForExtension(extension);
  }

  onFileSelected($event, task: Task): void {
    const fileToBeUploaded: File = $event.target.files[0];
    this.taskService.attachFile(task.id, fileToBeUploaded).subscribe(file => {
      this.fileAttached.emit(file);
    });

  }

  downloadFile(task: Task, file: FileAttachment): void {
    this.taskService.getFile(task.id, file.id).subscribe(blob => {
      if (blob) {
        const a = document.createElement('a');
        console.log('blob:', blob);
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(objectUrl);
      } else {
        console.log('No file data available for file', file.name, 'attached to task with id', task.id);
      }
    });
  }

  deleteFile(task: Task, file: FileAttachment): void {
    this.taskService.deleteFile(task.id, file.id).subscribe(() => {
      this.fileDetached.emit(file);
    });
  }

}
