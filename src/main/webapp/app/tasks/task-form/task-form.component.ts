import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A form to create tiny tasks.
 */
@Component({
  selector: 'tiny-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnDestroy {

  @Output() created: EventEmitter<Task> = new EventEmitter();

  private unsubscribe$ = new Subject<boolean>();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(): void {
    this.taskService.create(this.taskForm.value.name).pipe(
      takeUntil(this.unsubscribe$),
      take(1),
    ).subscribe((task) => {
      this.created.emit(task);
      this.taskForm.reset();
    });
  }
}
