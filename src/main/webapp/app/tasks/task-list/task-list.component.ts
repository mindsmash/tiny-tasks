import { FormGroup, FormBuilder } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskListComponent implements OnInit {
  form: FormGroup;
  fileUpload: boolean;
  success: boolean;
  imgURL: string;
  tempTaskId: string;

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  private file: File;

  constructor(@Inject('TaskService') private taskService: TaskService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fileUpload = false;
    this.form = this.formBuilder.group({
      file: ['']
    });
    this.success = false;
    this.tempTaskId = '';
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  deleteFile(task: Task): void {
    task.attachment_data = null;
    task.attachment_name = null;
    task.attachment_type = null;
    this.taskService.deleteFile(task.id).subscribe(() => {
      console.log('Http Call');
    });
  }

  attach(task: Task): void {
    this.fileUpload = true;
    this.tempTaskId = task.id;
  }

  onFileChange(files: FileList) {
    if ( files.length > 0 ) {
      const file = files.item(0);
      this.form.get('file').setValue(file);
    }
  }

  onSubmit() {
    const task = this.tasks.find(i => i.id === this.tempTaskId );
    const file = this.form.get('file').value;
    this.taskService.addFile(task.id, file).subscribe(
      (res: any) => {
        console.log(res);
        this.fileUpload = false;
        this.success = true;
        if (res.attachment_data) {
          task.attachment_data = res.attachment_data;
          task.attachment_name = res.attachment_name;
          task.attachment_type = res.attachment_type;
          const blob = new Blob([res.attachment_data], {type: res.attachment_type});
          this.imgURL = URL.createObjectURL(blob);
        }
        this.tempTaskId = '';
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        alert('Error \n\n' + 'Wahrscheinlich ist die Datei zu groß?!\n\n' + err.message);
      }
    );
  }
  close() {
    this.success = false;
  }
}
