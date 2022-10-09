import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] | null = null;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();

  public searchInput = new FormControl('');

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private router: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      const query = params['query'];

      if (query) {
        this.searchInput.setValue(query);
      }
    });

    this.searchInput.valueChanges.subscribe((searchValue) => {
      this.filterTasks(searchValue);
    });
  }

  public delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  public filterTasks(searchValue?: string): void {
    this.search.emit(searchValue);
  }
}
