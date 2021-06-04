import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { Task } from './tasks/task';
import { TaskService } from './tasks/task.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
  tasks$: Observable<Task[]>;
  filteredTasks: Task[];

  constructor(
    @Inject('TaskService') private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getAll();
    this.filterTasks();
  }

  filterTasks() {
    if (this.tasks$) {
      combineLatest([
        this.tasks$,
        this.searchTerm$.asObservable()
      ]).subscribe(([tasks, searchTerm]) => {
        this.filteredTasks = this.applyFilter(tasks, searchTerm);
        this.cdr.markForCheck();
      });
    }
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
    this.filterTasks();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
    this.filterTasks();
  }

  applyFilter(tasks: Task[], searchTerm: string): Task[] {
    // simple filter implementation, supports only one logical operation at a time
    if (!searchTerm) {
      return tasks;
    } else {
      if (searchTerm.indexOf(' AND ') > -1) {
        const searchItems = searchTerm.split(' AND ');
        searchItems.forEach(searchItem => {
          tasks = tasks.filter(task => {
            return task.name.toLowerCase().indexOf(searchItem) > -1
          });
        });
        return tasks;
      } else if (searchTerm.indexOf(' OR ') > -1) {
        let filteredItems = new Set();
        const searchItems = searchTerm.split(' OR ');
        searchItems.forEach(searchItem => {
          tasks.forEach(task => {
            if (task.name.toLowerCase().indexOf(searchItem) > -1) {
              filteredItems.add(task);
            }
          })
        });
        return [...filteredItems] as Task[];
      } else {
        return tasks.filter(task => {
          return task.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        })
      }
    }
  }

  searchTermUpdated(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }
}
