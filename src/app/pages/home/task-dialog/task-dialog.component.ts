import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../../_model/task';
import {CategoryService} from '../../../_services/category.services';

@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  form: FormGroup;
  title: string;
  categories: any[];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) {title, category}: Task) {

    this.title = title;
    this.form = fb.group({
      title: [title, Validators.required],
      category: [category, Validators.required],
    });
  }

  ngOnInit() {
    this.categories = this.categoryService.getAll(null, null);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
