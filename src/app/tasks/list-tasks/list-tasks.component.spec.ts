import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTasksComponent } from './list-tasks.component';
import { TaskService } from '../task.service';
import { Task } from 'src/domain/Task';
import {
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatListModule,
  MatInputModule,
  MatBadgeModule
} from '@angular/material';

describe('ListTasksComponent', () => {
  let component: ListTasksComponent;
  let fixture: ComponentFixture<ListTasksComponent>;
  let taskService: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListTasksComponent],
      imports: [MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatListModule,
        MatInputModule,
        MatCardModule,
        MatBadgeModule]
    })
      .compileComponents();
    taskService = TestBed.get(TaskService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return tasks', () => {
    const task: Task = new Task();
    task.text = 'New Task';
    task.description = 'New Task Description';

    taskService.add(task);

    expect(component.tasks.length).toBeGreaterThan(0);

  });

  it('should return only open tasks', () => {
    const task: Task = new Task();
    task.text = 'New Task';
    task.description = 'New Task Description';

    taskService.add(task);
    taskService.all().subscribe(res => component.tasks = res);

    expect(component.openTasks.length).toBeGreaterThan(0);

  });


  it('should return only closed tasks', () => {
    const task: Task = new Task();
    task.text = 'New Task';
    task.description = 'New Task Description';

    taskService.add(task);
    taskService.close(task);

    taskService.all().subscribe(res => component.tasks = res);

    expect(component.closedTasks.length).toBeGreaterThan(0);

  });
});
