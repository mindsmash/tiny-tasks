import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from "@angular/core";
import { LocalTaskService } from "../local-task.service";

import { Task } from "../task";
import { TaskService } from "../task.service";

/**
 * A list of tiny tasks.
 */
@Component({
  selector: "tiny-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() statusToggled: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject("TaskService") private taskService: LocalTaskService) {}

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  done(task: Task): void {
    this.taskService
      .toggleStatus(task.id)
      .subscribe(() => this.statusToggled.emit(task));
  }
}
