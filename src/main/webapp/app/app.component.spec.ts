import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { ISort, SortDirection, TaskSortType } from './shared/models/sort.model';
import { TaskService } from './tasks/task.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockData: {
    taskService: jasmine.SpyObj<TaskService>,
    filterForm: FormGroup,
    sortDefault: ISort,
    activatedRoute: ActivatedRoute,
  };

  beforeEach(waitForAsync(() => {
    mockData = {
      taskService: jasmine.createSpyObj('TaskService', ['getAll', 'getFiltered']),
      filterForm: new FormGroup({ filterField: new FormControl('') }),
      sortDefault: { sortBy: { value: '', label: 'None' }, sortDir: SortDirection.ASC },
      activatedRoute: { snapshot: { queryParams: {} } } as ActivatedRoute,
    };
    mockData.taskService.getFiltered.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [
        ChangeDetectorRef,
        { provide: 'TaskService', useValue: mockData.taskService },
        { provide: ActivatedRoute, useValue: mockData.activatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should had initialized sortOptions', () => {
    fixture.detectChanges();
    expect(component.sortOptions).toEqual([
      { value: TaskSortType.NONE, label: 'None' },
      { value: TaskSortType.DUE_DATE, label: 'Task due date' },
      { value: TaskSortType.NAME, label: 'Task name' },
    ]);
  });

  describe('on destroy', () => {
    let nextSpy: jasmine.Spy;
    let completeSpy: jasmine.Spy;

    beforeEach(() => {
      nextSpy = spyOn((component as any).unsubscribe$, 'next');
      completeSpy = spyOn((component as any).unsubscribe$, 'complete');
      component.ngOnDestroy();
    });

    it('should call next on unsbuscribe$', () => {
      expect(nextSpy).toHaveBeenCalled();
    });

    it('should complete unsbuscribe$', () => {
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('on setFilterForm', () => {
    const form: FormGroup = new FormGroup({
      filterName: new FormControl('filterValue'),
    });
    let loadTasksSpy: jasmine.Spy;
    let updateValueAndValiditySpy: jasmine.Spy;

    beforeEach(() => {
      updateValueAndValiditySpy = spyOn(form, 'updateValueAndValidity').and.callThrough();
      loadTasksSpy = spyOn(component, 'loadTasks').and.callThrough();
      component.setFilterForm(form);
    });

    it('should set the filterForm to the received form', () => {
      expect((component as any).filterForm.value).toEqual(form.value);
    });

    it('should set tasks$', () => {
      expect(component.tasks$).toEqual(jasmine.any(Observable));
    });

    it('should call loadTasks', () => {
      expect(loadTasksSpy).toHaveBeenCalled();
    });

    it('should trigger form valueChanges on updateValueAndValidity', () => {
      component.tasks$?.subscribe();
      form.updateValueAndValidity();
      expect(mockData.taskService.getFiltered).toHaveBeenCalledWith({ filterName: 'filterValue' }, mockData.sortDefault);
    });
  });

  describe('with filterForm setted', () => {
    let updateValueAndValiditySpy: jasmine.Spy;
    let loadTasksSpy: jasmine.Spy;

    beforeEach(() => {
      updateValueAndValiditySpy = spyOn(mockData.filterForm, 'updateValueAndValidity').and.callThrough();
      loadTasksSpy = spyOn(component, 'loadTasks');
      fixture.detectChanges();
      component.setFilterForm(mockData.filterForm);
    });

    describe('on loadTasks', () => {
      it('should call form updateValueAndValidity', fakeAsync(() => {
        loadTasksSpy.and.callThrough();
        component.loadTasks();
        tick(1);
        expect(updateValueAndValiditySpy).toHaveBeenCalled();
      }));
    });

    describe('on onSorDirChanged', () => {
      it('should set the sortDir to desc if was setted to asc', () => {
        component.sort.sortDir = SortDirection.ASC;
        component.onSorDirChanged();
        expect(component.sort.sortDir).toEqual(SortDirection.DESC);
      });

      it('should set the sortDir to asc if was setted to desc', () => {
        component.sort.sortDir = SortDirection.DESC;
        component.onSorDirChanged();
        expect(component.sort.sortDir).toEqual(SortDirection.ASC);
      });

      it('should set load tasks on each sortDir changed', () => {
        component.onSorDirChanged();
        expect(loadTasksSpy).toHaveBeenCalled();
      });
    });

    describe('on onSortChanged', () => {
      let navigateSpy: jasmine.Spy;

      beforeEach(() => {
        component.sort = { sortBy: { value: TaskSortType.NAME, label: 'Task name' }, sortDir: SortDirection.ASC };
        navigateSpy = spyOn((component as any).router, 'navigate').and.callThrough()
      });

      it('should set the sortBy', () => {
        component.onSortChanged({ value: TaskSortType.DUE_DATE, label: 'Task due date' });
        expect(component.sort.sortBy).toEqual({ value: TaskSortType.DUE_DATE, label: 'Task due date' });
      });

      it('should set load tasks on each sortDir changed', () => {
        component.onSortChanged({ value: TaskSortType.DUE_DATE, label: 'Task due date' });
        expect(loadTasksSpy).toHaveBeenCalled();
      });

      it('should set query params on VALID sort', () => {
        component.onSortChanged({ value: TaskSortType.DUE_DATE, label: 'Task due date' });
        expect(navigateSpy).toHaveBeenCalledWith([], { relativeTo: jasmine.any(Object), queryParams: { sortBy: 'Task due date', sortDir: 'asc' } });
      });

      it('should NOT set query params on INVALID sort', () => {
        component.onSortChanged({ value: TaskSortType.NONE, label: 'None' });
        expect(navigateSpy).toHaveBeenCalledWith([], { relativeTo: jasmine.any(Object), queryParams: { sortBy: null, sortDir: null } });
      });
    });

  });
});
