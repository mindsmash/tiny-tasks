import { TaskService } from './../../task.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogData } from './../dialogdata';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { debug } from 'util';

@Component({
  selector: 'tiny-filedialog',
  templateUrl: './filedialog.component.html',
  styleUrls: ['./filedialog.component.scss']
})
export class FiledialogComponent implements OnInit {

  form: FormGroup;
  error: string;
  uploadResponse: {
    status: '',
    message: '',
    filePath: ''
  };

  constructor(public dialogRef: MatDialogRef<FiledialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject('TaskService') private taskSrv: TaskService,
    private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: ['']
    });
  }

  onFileChange(files: FileList) {
    if ( files.length > 0) {
      const file = files[0];
      this.form.get('file').setValue(file);
    }
  }

  onSubmit() {
    const data= this.form.get('file').value;
    this.taskSrv.addFile(this.data.task.id, data).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );
  }
}
