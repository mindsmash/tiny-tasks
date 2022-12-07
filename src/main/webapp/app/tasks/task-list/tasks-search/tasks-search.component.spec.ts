import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksSearchComponent } from './tasks-search.component';
import {TaskService} from "../../task.service";

describe('TasksSearchComponent', () => {
  let component: TasksSearchComponent;
  let fixture: ComponentFixture<TasksSearchComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  beforeEach(async () => {
    taskService = jasmine.createSpyObj('taskService', ['create']);
    await TestBed.configureTestingModule({
      declarations: [ TasksSearchComponent ],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
