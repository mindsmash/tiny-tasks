import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';

import {Task} from '../task';
import {TaskService} from '../task.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";

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

  @Input() tasks: Task[] | null = null;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() updated: EventEmitter<Task> = new EventEmitter();

  selectedTask: Task = new Task();

  form: FormGroup;

  constructor(@Inject('TaskService') private taskService: TaskService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      dueDate: ''
    });
  }

  delete(task: Task): void {
    this.taskService.delete(task.id!).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  updateDueDate() {
    if (this.form.valid && this.form.value.dueDate !== undefined && !this.isPastDate(this.form.value.dueDate)) {
      this.selectedTask.dueDate = this.form.value.dueDate;
      this.taskService.updateDueDate(this.selectedTask.id!, this.selectedTask.dueDate!).subscribe(() => {
        this.updated.emit(this.selectedTask);
        this.modalService.dismissAll();
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  openDueDatePopUp(task: Task, {content}: { content: any }) {
    this.selectedTask = task;
    this.form.patchValue({
      dueDate: this.stringToDate(this.selectedTask.dueDate!)
    });
    this.modalService.open(content, {size: 'md', backdrop: 'static', centered: true});
  }

  stringToDate(date: any) {
      if (date!! && date !== '') {
        const dateArray = date;
        const year = Number(dateArray[0]);
        const month = Number(dateArray[1]) < 10 ? '0' + dateArray[1] : dateArray[1];
        const day = Number(dateArray[2]) < 10 ? '0' + dateArray[2] : dateArray[2];
        return `${year}-${month}-${day}`;
      } else {
        return new Date().toISOString().split('T')[0];
      }
  }

  isPastDate(date: string): boolean {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const selectedDate = new Date(date);
    return selectedDate <= yesterday;
  }

  formatDate(date: any): string {
    if (date) {
      const formattedDate = new Date(date);
      return formattedDate.toLocaleDateString('en-GB');
    } else {
      return 'No Due Date Assigned';
    }
  }
}
