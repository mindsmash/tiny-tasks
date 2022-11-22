import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {of, Subject} from 'rxjs';

import {TasksComponent} from './tasks.component';
import {TaskService} from './shared/task.service';


describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let routerMock: jasmine.SpyObj<Router>;
  let queryParams$ = new Subject();

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', ['getTasksByName']);
    routerMock = jasmine.createSpyObj('router', ['navigate']);


    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      providers: [
        {provide: 'TaskService', useValue: taskService},
        {provide: ActivatedRoute, useValue: {queryParams: queryParams$}},
        {provide: Router, useValue: routerMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  describe('Loading tasks without initial search -', () => {
    beforeEach(() => {
      queryParams$.next({});
    })

    it('should set searchedTerm to an empty string', () => {
      expect(component.searchedTerm).toBe('');
    });

    it('should set searchMode to false', () => {
      expect(component.searchMode).toBe(false);
    });

    it('should call getTasksByName with an empty string', () => {
      expect(taskService.getTasksByName).toHaveBeenCalledWith('');
    });
  });

  describe('Loading tasks with initial search -', () => {
    beforeEach(() => {
      queryParams$.next({q: '12'});
    })

    it('should set searchedTerm to 12', () => {
      expect(component.searchedTerm).toBe('12');
    });

    it('should set searchMode to true', () => {
      expect(component.searchMode).toBe(true);
    });

    it('should call getTasksByName with 12', () => {
      expect(taskService.getTasksByName).toHaveBeenCalledWith('12');
    });
  });

  it('should reload the tasks on loadTasks', () => {
    // given
    const tasks$ = of([]);
    taskService.getTasksByName.and.returnValue(tasks$);

    // when
    component.loadTasks();

    // then
    expect(component.tasks$).toEqual(tasks$);
  });

  describe('loadFilteredTasks -', () => {
    it('should call router.navigate with the searchTerm', () => {
      component.loadFilteredTasks('a');
      expect(routerMock.navigate).toHaveBeenCalledWith([''], {queryParams: {q: 'a'}});
    });
  });

  describe('getButtonText -', () => {

    it('should return add text if searchMode is true', () => {
      component.searchMode = true;
      expect(component.getButtonText()).toBe('Add new tasks');
    });

    it('should return search text if searchMode is false', () => {
      component.searchMode = false;
      expect(component.getButtonText()).toBe('Search through tasks');
    });
  });

  describe('toggleMode -', () => {
    beforeEach(() => {
      component.searchMode = true;
      component.toggleMode();
    })

    it('should call router navigate', () => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['']);
    });

    it('should toggle searchMode', () => {
      expect(component.searchMode).toBe(false);
    });
  });

});
