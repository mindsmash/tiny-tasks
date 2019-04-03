import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';

import {AppComponent} from './app.component';
import {TaskService} from 'app/task.service';
import SpyObj = jasmine.SpyObj;

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let taskService: SpyObj<TaskService>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: TaskService,
        useValue: jasmine.createSpyObj('TaskService', ['getAll', 'add', 'remove', 'clear'])
      }],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule
      ],
    }).compileComponents();

    taskService = TestBed.get(TaskService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.tasks = ['Buy milk', 'Take out the trash'];
    taskService.getAll.and.returnValue([]);
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should add a task', () => {
    // when
    component.add('Go to the gym');

    // then
    expect(component.tasks).toContain('Go to the gym');
    expect(component.tasks.indexOf('Go to the gym')).toEqual(0);
  });

  it('should remove a task', () => {
    // given
    taskService.getAll.and.returnValue(['Take out the trash']);

    // when
    component.remove(0);

    // then
    expect(component.tasks).not.toContain('Take out the trash');
    expect(component.tasks.length).toEqual(0);
  });

  it('should clear all tasks', () => {
    // when
    component.clear();

    // then
    expect(component.tasks).toEqual([]);
  });
});
