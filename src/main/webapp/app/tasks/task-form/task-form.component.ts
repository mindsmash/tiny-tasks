import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Output,
  OnInit
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Task } from "../task";
import { TaskService } from "../task.service";
import { PersistanceService } from "app/shared/persistance.service";

/**
 * A form to create tiny tasks.
 */
@Component({
  selector: "tiny-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {
  private uid: string;

  @Output() created: EventEmitter<Task> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required)
  });

  constructor(
    @Inject("TaskService") private taskService: TaskService,
    private persister: PersistanceService
  ) {}

  onSubmit(): void {
    this.uid = this.persister.get("currentUser").id;
    this.taskService
      .create(this.taskForm.value.name, this.uid)
      .subscribe(task => {
        this.created.emit(task);
        this.taskForm.reset();
      });
  }
}
