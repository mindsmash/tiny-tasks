import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { MatCardModule } from '@angular/material';
import { ListTasksComponent } from '../list-tasks/list-tasks.component';
import { TasksModule } from '../tasks.module';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [MatCardModule, TasksModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
