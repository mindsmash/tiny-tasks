import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from '../task.service';

import { StatusFormComponent } from './status-form.component';

describe('StatusFormComponent', () => {
  let component: StatusFormComponent;
  let fixture: ComponentFixture<StatusFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [ StatusFormComponent ],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
