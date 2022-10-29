import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let mockData: {
    formBuilder: FormBuilder;
    activatedRoute: ActivatedRoute;
  };
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    mockData = {
      formBuilder: new FormBuilder(),
      activatedRoute: {
        snapshot: {
          queryParams: {}
        },
      } as ActivatedRoute,
    };
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: FormBuilder, useValue: mockData.formBuilder },
        { provide: ActivatedRoute, useValue: mockData.activatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should have setted the form', () => {
    fixture.detectChanges();
    expect(component.form).toBeDefined();
  });

  it('should have setted the form with default value', () => {
    fixture.detectChanges();
    expect(component.form!.value).toEqual({ taskName: '' });
  });

  describe('on resetFilter', () => {
    let formResetSpy: jasmine.Spy;
    let navigateSpy: jasmine.Spy;

    beforeEach(() => {
      fixture.detectChanges();
      component.form!.get('taskName')?.setValue('searchKey');
      formResetSpy = spyOn((component.form as FormGroup), 'reset').and.callThrough();
      navigateSpy = spyOn((component as any).router, 'navigate').and.callThrough();

      debugElement.query(By.css('button')).nativeElement.click();
    });
    afterEach(() => {
      component.form?.reset();
    });

    it('should call formReset', () => {
      expect(formResetSpy).toHaveBeenCalled();
    });

    it('should reset the queryParams', () => {
      expect(navigateSpy).toHaveBeenCalledWith([], { relativeTo: jasmine.any(Object), queryParams: { taskName: null } });
    });
  });

  it('should set form values from queryParams', fakeAsync(() => {
    mockData.activatedRoute.snapshot.queryParams = { taskName: 'fromParams' };
    component.ngOnInit();
    tick(1);
    expect(component.form?.value).toEqual({ taskName: 'fromParams' });
  }));

  it('should set form values from queryParams only for known filters', fakeAsync(() => {
    mockData.activatedRoute.snapshot.queryParams = { taskName: 'fromParams', newFilter: 'newValue' };
    component.ngOnInit();
    tick(1);
    expect(component.form?.value).toEqual({ taskName: 'fromParams' });
  }));

  it('should set queryParams on every form change', () => {
    const navigateSpy: jasmine.Spy = spyOn((component as any).router, 'navigate');
    fixture.detectChanges();
    component.form?.get('taskName')?.setValue('newValue');
    expect(navigateSpy).toHaveBeenCalledWith([], { relativeTo: jasmine.any(Object), queryParams: { taskName: 'newValue' } });
  });
});
