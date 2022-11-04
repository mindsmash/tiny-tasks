import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { IFilterData } from './shared/components/filter/utilities/filter.model';
import { ISort, SortDirection, TaskSortType } from './shared/models/sort.model';
import { TaskService } from './tasks/task.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockData: {
    taskService: jasmine.SpyObj<TaskService>,
    sortDefault: ISort,
    activatedRoute: ActivatedRoute,
  };

  beforeEach(waitForAsync(() => {
    mockData = {
      taskService: jasmine.createSpyObj('TaskService', ['getAll', 'getFiltered']),
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

  it('onFilterChanged should call getFiltered', () => {
    const tempSort: ISort = { sortBy: { label: 'label', value: 'value' }, sortDir: SortDirection.DESC };
    const tempFilter: IFilterData = { taskName: 'taskName' };
    component.sort = tempSort;
    component.onFilterChanged(tempFilter);
    expect(mockData.taskService.getFiltered).toHaveBeenCalledWith(tempFilter, tempSort);
  });

  it('onFilterChanged should reasign getFiltered', () => {
    mockData.taskService.getFiltered.and.returnValue(of([]));
    const tempSort: ISort = { sortBy: { label: 'label', value: 'value' }, sortDir: SortDirection.DESC };
    const tempFilter: IFilterData = { taskName: 'taskName' };
    component.tasks$ = undefined;
    component.sort = tempSort;
    component.onFilterChanged(tempFilter);
    expect(component.tasks$).toBeDefined
  });

  describe('with filterForm setted', () => {
    let loadTasksSpy: jasmine.Spy;

    beforeEach(() => {
      loadTasksSpy = spyOn(component, 'loadTasks');
      fixture.detectChanges();
    });

    describe('on loadTasks', () => {
      it('should call getFiltered', fakeAsync(() => {
        loadTasksSpy.and.callThrough();
        component.loadTasks();
        tick(1);
        expect(mockData.taskService.getFiltered).toHaveBeenCalled();
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
